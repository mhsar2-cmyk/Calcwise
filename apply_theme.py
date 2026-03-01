import os
import re

files_to_process = [
    "about.html", "about-ar.html",
    "blog.html", "blog-ar.html",
    "privacy.html", "privacy-ar.html",
    "terms.html", "terms-ar.html"
]

light_theme_css = """
    /* Neumorphic Light Mode Redesign */
    [data-theme="light"] {
      --bg: #E0E5EC;
      --surface: #E0E5EC;
      --surface2: #E0E5EC;
      --border: transparent;
      --border2: transparent;
      --text: #274578;
      --text-muted: #718096;
      --muted: #A0AEC0;
      --muted2: #CBD5E0;
      --accent: #6C63FF;
      --accent-hover: #5A52D5;
      
      --neu-light: #ffffff;
      --neu-dark: #a3b1c6;
      --accent-shadow: 6px 6px 16px rgba(163, 177, 198, 0.4), -6px -6px 16px rgba(255, 255, 255, 0.8);
      --card-shadow: 9px 9px 16px rgba(163, 177, 198, 0.6), -9px -9px 16px rgba(255, 255, 255, 0.5);
      --card-hover-shadow: inset 6px 6px 10px rgba(163, 177, 198, 0.5), inset -6px -6px 10px rgba(255, 255, 255, 0.5);
      --neu-inset: inset 4px 4px 8px rgba(163, 177, 198, 0.5), inset -4px -4px 8px rgba(255, 255, 255, 0.6);
      --neu-pressed: inset 6px 6px 10px rgba(163, 177, 198, 0.6), inset -6px -6px 10px rgba(255, 255, 255, 0.8);
    }

    html[data-theme="light"] body {
      background: var(--bg) !important;
      color: var(--text-muted);
    }
    
    html[data-theme="light"] h1, html[data-theme="light"] h2, html[data-theme="light"] h3, html[data-theme="light"] h4, html[data-theme="light"] .logo {
      color: var(--text) !important;
      text-shadow: 2px 2px 4px rgba(163, 177, 198, 0.5), -2px -2px 4px rgba(255, 255, 255, 0.6) !important;
    }

    html[data-theme="light"] nav, html[data-theme="light"] header, html[data-theme="light"] footer, html[data-theme="light"] .stats-strip, html[data-theme="light"] .navbar {
      background: var(--surface) !important;
      border: none !important;
      box-shadow: 0 4px 10px rgba(163, 177, 198, 0.3) !important;
    }

    html[data-theme="light"] .col-visual, html[data-theme="light"] .value-card, html[data-theme="light"] .cat-card, html[data-theme="light"] .team-card, html[data-theme="light"] .contact-item, html[data-theme="light"] .article-card, html[data-theme="light"] .highlight-box, html[data-theme="light"] .green-box, html[data-theme="light"] .toc, html[data-theme="light"] .contact-card {
      background: var(--surface) !important;
      border: none !important;
      box-shadow: var(--card-shadow) !important;
    }

    html[data-theme="light"] .cat-card:hover, html[data-theme="light"] .contact-item:hover, html[data-theme="light"] .article-card:hover {
      box-shadow: var(--card-hover-shadow) !important;
      transform: translateY(-2px);
    }

    html[data-theme="light"] body::before, html[data-theme="light"] .about-hero::before, html[data-theme="light"] .page-hero::before {
      display: none !important;
    }
    
    html[data-theme="light"] .data-table th, html[data-theme="light"] .data-table td {
      border-color: rgba(163, 177, 198, 0.3) !important;
    }
    
    html[data-theme="light"] .nav-back, html[data-theme="light"] .nav-link, html[data-theme="light"] .article-card .tag {
      background: var(--surface) !important;
      border: none !important;
      box-shadow: var(--card-shadow);
    }
    html[data-theme="light"] .nav-back:hover, html[data-theme="light"] .nav-link:hover {
      box-shadow: var(--neu-pressed);
    }
"""

script_tag = """
  <!-- THEME SCRIPT -->
  <script>
    (function () {
      const saved = localStorage.getItem('cw-theme');
      if (saved === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
      }
    })();
  </script>
"""

for fname in files_to_process:
    if not os.path.exists(fname):
        continue
    with open(fname, 'r') as f:
        content = f.read()
    
    # 1. replace linear-gradient background on body
    # finding "background: linear-gradient(135deg, #07071a 0%, #0c0b2e 40%, #080818 70%, #07071a 100%);"
    # and replacing with "background: var(--bg); transition: background 0.3s ease, color 0.3s ease;"
    content = re.sub(r'background:\s*linear-gradient\([^)]+\);', 'background: var(--bg); transition: background 0.3s ease, color 0.3s ease;', content)
    
    # or for blog.html which has `background: var(--bg);` but no transition, just make sure we add transition
    if 'transition: background 0.3s ease, color 0.3s ease;' not in content:
        content = re.sub(r'(body \{[^}]*?)(\s*color: var\(--text\);)', r'\1\2\n            transition: background 0.3s ease, color 0.3s ease;', content)

    # 2. insert CSS before </style>
    if 'Neumorphic Light Mode Redesign' not in content:
        content = content.replace('</style>', light_theme_css + '\n</style>')
        
    # 3. insert JS before </head>
    if 'localStorage.getItem(\'cw-theme\')' not in content:
        content = content.replace('</head>', script_tag + '\n</head>')
        
    with open(fname, 'w') as f:
        f.write(content)
        
    print(f"Processed {fname}")

