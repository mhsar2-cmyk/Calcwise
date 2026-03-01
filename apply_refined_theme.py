import os
import re

files_to_process = [
    "index.html", "index-ar.html",
    "about.html", "about-ar.html",
    "blog.html", "blog-ar.html",
    "privacy.html", "privacy-ar.html",
    "terms.html", "terms-ar.html"
]

master_root_css = """:root {
      --bg: #07071a;
      --surface: rgba(255, 255, 255, 0.04);
      --surface2: rgba(255, 255, 255, 0.07);
      --border: rgba(255, 255, 255, 0.09);
      --border2: rgba(108, 99, 255, 0.45);
      --text: #e8e8f0;
      --muted: #7070a0;
      --muted2: #9090b8;
      --accent: #6c63ff;
      --accent2: #8b84ff;
      --accent3: #b3aeff;
      --green: #22d3a0;
      --orange: #ff8c42;
      --pink: #ff6b9d;
      --blue: #4da6ff;
      --yellow: #ffd166;
      --radius: 16px;
      --radius-sm: 10px;
      --shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
      --shadow-lg: 0 24px 80px rgba(0, 0, 0, 0.6);
      --glow: 0 0 60px rgba(108, 99, 255, 0.25);
      --glass: rgba(255, 255, 255, 0.04);
      --glass-border: rgba(255, 255, 255, 0.09);
      --glass-blur: blur(20px) saturate(160%);
    }"""

refined_theme_css = """    /* Neumorphic Light Mode Redesign */
    [data-theme="light"] {
      --bg: #EEF2FF;
      --surface: #EEF2FF;
      --surface2: #EEF2FF;
      --border: transparent;
      --border2: transparent;
      --text: #312E81;
      --text-muted: #4F46E5;
      --muted: #A5B4FC;
      --muted2: #C7D2FE;
      --accent: #EC4899;
      --accent-hover: #DB2777;
      
      --neu-light: #ffffff;
      --neu-dark: #C7D2FE;
      --accent-shadow: 6px 6px 12px rgba(199, 210, 254, 0.6), -6px -6px 12px rgba(255, 255, 255, 0.9);
      --card-shadow: 8px 8px 16px rgba(199, 210, 254, 0.65), -8px -8px 16px rgba(255, 255, 255, 0.9);
      --card-hover-shadow: inset 4px 4px 8px rgba(199, 210, 254, 0.5), inset -4px -4px 8px rgba(255, 255, 255, 0.9);
      --neu-inset: inset 5px 5px 10px rgba(199, 210, 254, 0.6), inset -5px -5px 10px rgba(255, 255, 255, 0.9);
      --neu-pressed: inset 7px 7px 14px rgba(199, 210, 254, 0.8), inset -7px -7px 14px rgba(255, 255, 255, 0.95);
      
      --success: #10B981;
      --warning: #F59E0B;
      --error: #EF4444;
      --info: #3B82F6;

      /* Neutralize dark-mode leaky variables but add colorful touches */
      --accent2: #8B5CF6;
      --accent3: #6366F1;
      --blue: #3B82F6;
      --pink: #EC4899;
      --green: #10B981;
      --glow: 0 0 20px rgba(236, 72, 153, 0.15);
      --card-glow: 0 0 30px rgba(99, 102, 241, 0.1);
    }

    html[data-theme="light"] body {
      background: var(--bg) !important;
      color: var(--text-muted);
      line-height: 1.6;
      font-weight: 400;
    }

    html[data-theme="light"] body::before,
    html[data-theme="light"] .hero-glow,
    html[data-theme="light"] .about-hero::before, 
    html[data-theme="light"] .page-hero::before,
    html[data-theme="light"] .hero::after,
    html[data-theme="light"] .calc-card::before {
      display: none !important;
      background: none !important;
    }

    html[data-theme="light"] .section-title,
    html[data-theme="light"] h1, html[data-theme="light"] h2, html[data-theme="light"] h3, html[data-theme="light"] h4, html[data-theme="light"] .logo {
      color: var(--text) !important;
      letter-spacing: -0.01em;
      font-weight: 600;
      text-shadow: 2px 2px 5px rgba(199, 210, 254, 0.6), -2px -2px 5px rgba(255, 255, 255, 0.9) !important;
    }

    html[data-theme="light"] .logo .logo-dot {
      color: var(--accent) !important;
    }

    html[data-theme="light"] nav, html[data-theme="light"] header, html[data-theme="light"] footer, html[data-theme="light"] .stats-strip, html[data-theme="light"] .navbar {
      background: var(--surface) !important;
      backdrop-filter: none !important;
      -webkit-backdrop-filter: none !important;
      border: none !important;
      box-shadow: 0 4px 10px rgba(199, 210, 254, 0.4) !important;
    }

    html[data-theme="light"] .nav-search {
      background: var(--surface) !important;
      border: none !important;
      box-shadow: var(--neu-inset) !important;
    }

    html[data-theme="light"] .nav-search input:focus {
      box-shadow: none !important;
    }

    html[data-theme="light"] .nav-cats button {
      color: var(--muted) !important;
    }

    html[data-theme="light"] .nav-cats button:hover {
      background: var(--surface) !important;
      box-shadow: var(--card-shadow) !important;
      color: var(--accent) !important;
      border-color: transparent !important;
    }

    html[data-theme="light"] .nav-cats button.active {
      background: var(--surface) !important;
      border-color: transparent !important;
      color: var(--accent) !important;
      box-shadow: var(--neu-pressed) !important;
    }

    html[data-theme="light"] .calc-card, html[data-theme="light"] .col-visual, html[data-theme="light"] .value-card, html[data-theme="light"] .cat-card, html[data-theme="light"] .team-card, html[data-theme="light"] .contact-item, html[data-theme="light"] .article-card, html[data-theme="light"] .highlight-box, html[data-theme="light"] .green-box, html[data-theme="light"] .toc, html[data-theme="light"] .contact-card {
      background: var(--surface) !important;
      border: none !important;
      box-shadow: var(--card-shadow) !important;
      border-radius: 20px;
    }

    html[data-theme="light"] .calc-card:hover, html[data-theme="light"] .cat-card:hover, html[data-theme="light"] .contact-item:hover, html[data-theme="light"] .article-card:hover {
      transform: translateY(-2px);
      box-shadow: var(--card-hover-shadow) !important;
      border-color: transparent !important;
    }

    html[data-theme="light"] .card-icon {
      background: var(--surface) !important;
      border: none !important;
      box-shadow: var(--card-shadow) !important;
      color: var(--accent) !important;
    }

    html[data-theme="light"] .calc-card:hover .card-icon {
      box-shadow: var(--neu-pressed) !important;
    }

    html[data-theme="light"] .modal-content, html[data-theme="light"] .modal {
      background: var(--surface) !important;
      border: none !important;
      box-shadow: 12px 12px 24px rgba(199, 210, 254, 0.7), -12px -12px 24px rgba(255, 255, 255, 0.9) !important;
      backdrop-filter: none !important;
      border-radius: 24px !important;
    }

    html[data-theme="light"] .calc-btn, html[data-theme="light"] .nav-back, html[data-theme="light"] .nav-link, html[data-theme="light"] .article-card .tag {
      background: var(--surface) !important;
      color: var(--accent) !important;
      border: none !important;
      border-radius: 12px;
      box-shadow: var(--card-shadow) !important;
      font-weight: 700 !important;
    }

    html[data-theme="light"] .calc-btn:hover, html[data-theme="light"] .nav-back:hover, html[data-theme="light"] .nav-link:hover {
      box-shadow: var(--neu-pressed) !important;
      transform: translateY(0) !important;
      background: var(--surface) !important;
    }

    html[data-theme="light"] input, html[data-theme="light"] select {
      background: var(--surface) !important;
      border: none !important;
      color: var(--text) !important;
      box-shadow: var(--neu-inset) !important;
    }

    html[data-theme="light"] input:focus, html[data-theme="light"] select:focus {
      box-shadow: var(--neu-pressed) !important;
      border: none !important;
    }

    html[data-theme="light"] .results {
      background: var(--surface) !important;
      border: none !important;
      box-shadow: var(--neu-inset) !important;
      border-radius: 20px !important;
    }

    html[data-theme="light"] footer {
      background: var(--surface) !important;
      border-top: none !important;
      box-shadow: inset 0 10px 10px -10px rgba(199, 210, 254, 0.6) !important;
    }
    
    html[data-theme="light"] .data-table th, html[data-theme="light"] .data-table td {
      border-color: rgba(199, 210, 254, 0.5) !important;
    }

    html[data-theme="light"] .fav-chip {
      background: var(--surface) !important;
      border: none !important;
      box-shadow: var(--card-shadow) !important;
    }

    html[data-theme="light"] .fav-chip:hover {
      box-shadow: var(--neu-pressed) !important;
      transform: translateY(0) !important;
    }"""

for fname in files_to_process:
    if not os.path.exists(fname):
        continue
    with open(fname, 'r') as f:
        content = f.read()
    
    # 0. Standardize the master :root (Dark mode base)
    content = re.sub(r':root\s*\{[^}]+\}', master_root_css, content, count=1)

    # 1. Update the CSS Theme
    start_str = "    /* Neumorphic Light Mode Redesign */"
    end_str_index = "    /* Theme toggle button */"
    end_str_index_ar = "    .theme-toggle {"
    end_str_other = "</style>"
    
    start_idx = content.find(start_str)
    
    if start_idx != -1:
        # Determine the end index based on whether it's an index file or auxiliary
        if fname == "index.html":
            end_idx = content.find(end_str_index, start_idx)
            if end_idx != -1:
                content = content[:start_idx] + refined_theme_css + "\n\n" + content[end_idx:]
            else:
                print(f"Warning: end string not found in {fname}")
        elif fname == "index-ar.html":
            end_idx = content.find(end_str_index_ar, start_idx)
            if end_idx != -1:
                content = content[:start_idx] + refined_theme_css + "\n\n" + content[end_idx:]
            else:
                print(f"Warning: end string not found in {fname}")
        else:
            end_idx = content.find(end_str_other, start_idx)
            if end_idx != -1:
                content = content[:start_idx] + refined_theme_css + "\n" + content[end_idx:]
            else:
                print(f"Warning: end string not found in {fname}")
    else:
        print(f"Could not find Neumorphic block in {fname}")

    # 2. Inject Theme Toggle Button if it doesn't exist
    button_html = """
  <!-- Theme Toggle -->
  <button class="theme-toggle" id="theme-toggle" onclick="toggleTheme()" title="Toggle light/dark mode">🌙</button>
"""
    if 'id="theme-toggle"' not in content:
        # Add after <nav> or <body>
        if "<nav" in content:
            content = re.sub(r'(<nav[^>]*>)', button_html + r'\1', content, count=1)
        elif "<body>" in content:
            content = content.replace("<body>", "<body>" + button_html)
    
    # 3. Inject Toggle Theme JS if it doesn't exist
    js_logic = """
    // ── LIGHT/DARK MODE TOGGLE ──
    window.toggleTheme = function () {
      const html = document.documentElement;
      const current = html.getAttribute('data-theme');
      const next = current === 'light' ? 'dark' : 'light';
      html.setAttribute('data-theme', next);
      localStorage.setItem('cw-theme', next);
      const btn = document.getElementById('theme-toggle');
      if (btn) btn.textContent = next === 'light' ? '☀️' : '🌙';
    };
    // Initialize toggle icon
    setTimeout(() => {
      const btn = document.getElementById('theme-toggle');
      if (btn) {
        const current = document.documentElement.getAttribute('data-theme');
        btn.textContent = current === 'light' ? '☀️' : '🌙';
      }
    }, 100);
"""
    if "window.toggleTheme = function" not in content:
        if "</body>" in content:
            content = content.replace("</body>", "<script>" + js_logic + "</script>\n</body>")

    # 4. Inject Theme Toggle CSS if missing (for non-index pages)
    css_logic = """
    /* Theme toggle button */
    .theme-toggle {
      position: fixed;
      bottom: 1.5rem;
      left: 1.5rem;
      z-index: 9999;
      width: 44px;
      height: 44px;
      border-radius: 50%;
      border: 1px solid var(--border);
      background: var(--surface);
      color: var(--text);
      font-size: 1.2rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s;
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
    }
    .theme-toggle:hover {
      transform: scale(1.1);
      border-color: var(--accent);
    }
"""
    if ".theme-toggle {" not in content:
        content = content.replace("</style>", css_logic + "</style>")

    with open(fname, 'w') as f:
        f.write(content)
    print(f"Refined {fname}")
