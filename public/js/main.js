let lang = localStorage.getItem('lingowise_lang') || 'ar';

let DEFAULT_COURSE_POOL = [
    {
        "id": "beg-1",
        "name": {
            "en": "Complete English Foundations",
            "ar": "أساسيات اللغة الإنجليزية الكاملة"
        },
        "level": {
            "en": "Beginner",
            "ar": "مبتدئ"
        },
        "category": {
            "en": "General",
            "ar": "عام"
        },
        "icon": "🌱",
        "color": "#00d2d3",
        "videoUrl": "https://www.youtube.com/embed/juKDRv6S32I",
        "lessons": [
            {
                "id": 1,
                "title": {
                    "en": "Alphabet & Phonics",
                    "ar": "الأبجدية والصوتيات"
                },
                "duration": "10:00",
                "vocab": [
                    {
                        "en": "Welcome",
                        "ar": "أهلاً"
                    },
                    {
                        "en": "Goodbye",
                        "ar": "مع السلامة"
                    },
                    {
                        "en": "Please",
                        "ar": "من فضلك"
                    },
                    {
                        "en": "Thank you",
                        "ar": "شكراً"
                    },
                    {
                        "en": "Excuse me",
                        "ar": "عذراً"
                    },
                    {
                        "en": "Morning",
                        "ar": "صباح"
                    },
                    {
                        "en": "Night",
                        "ar": "مساء"
                    },
                    {
                        "en": "Water",
                        "ar": "ماء"
                    },
                    {
                        "en": "Food",
                        "ar": "طعام"
                    },
                    {
                        "en": "Friend",
                        "ar": "صديق"
                    }
                ],
                "exercises": [
                    {
                        "question": {
                            "en": "What did you learn in lesson 1?",
                            "ar": "ماذا تعلمت في الدرس 1؟"
                        },
                        "options": {
                            "en": [
                                "A lot",
                                "Nothing"
                            ],
                            "ar": [
                                "الكثير",
                                "لا شيء"
                            ]
                        },
                        "answer": 0
                    },
                    {
                        "question": {
                            "en": "Which of the following is correct?",
                            "ar": "أي مما يلي صحيح؟"
                        },
                        "options": {
                            "en": [
                                "Option A",
                                "Option B",
                                "Option C"
                            ],
                            "ar": [
                                "الخيار أ",
                                "الخيار ب",
                                "الخيار ج"
                            ]
                        },
                        "answer": 1
                    }
                ]
            },
            {
                "id": 2,
                "title": {
                    "en": "Numbers & Counting",
                    "ar": "الأرقام والعد"
                },
                "duration": "12:00",
                "vocab": [
                    {
                        "en": "Word 1-2-1",
                        "ar": "كلمة 1-2-1"
                    },
                    {
                        "en": "Word 1-2-2",
                        "ar": "كلمة 1-2-2"
                    },
                    {
                        "en": "Word 1-2-3",
                        "ar": "كلمة 1-2-3"
                    },
                    {
                        "en": "Word 1-2-4",
                        "ar": "كلمة 1-2-4"
                    },
                    {
                        "en": "Word 1-2-5",
                        "ar": "كلمة 1-2-5"
                    },
                    {
                        "en": "Word 1-2-6",
                        "ar": "كلمة 1-2-6"
                    },
                    {
                        "en": "Word 1-2-7",
                        "ar": "كلمة 1-2-7"
                    },
                    {
                        "en": "Word 1-2-8",
                        "ar": "كلمة 1-2-8"
                    },
                    {
                        "en": "Word 1-2-9",
                        "ar": "كلمة 1-2-9"
                    },
                    {
                        "en": "Word 1-2-10",
                        "ar": "كلمة 1-2-10"
                    }
                ],
                "exercises": [
                    {
                        "question": {
                            "en": "What did you learn in lesson 2?",
                            "ar": "ماذا تعلمت في الدرس 2؟"
                        },
                        "options": {
                            "en": [
                                "A lot",
                                "Nothing"
                            ],
                            "ar": [
                                "الكثير",
                                "لا شيء"
                            ]
                        },
                        "answer": 0
                    },
                    {
                        "question": {
                            "en": "Which of the following is correct?",
                            "ar": "أي مما يلي صحيح؟"
                        },
                        "options": {
                            "en": [
                                "Option A",
                                "Option B",
                                "Option C"
                            ],
                            "ar": [
                                "الخيار أ",
                                "الخيار ب",
                                "الخيار ج"
                            ]
                        },
                        "answer": 1
                    }
                ]
            },
            {
                "id": 3,
                "title": {
                    "en": "Greetings & Introductions",
                    "ar": "التحيات والتعارف"
                },
                "duration": "14:00",
                "vocab": [
                    {
                        "en": "Word 1-3-1",
                        "ar": "كلمة 1-3-1"
                    },
                    {
                        "en": "Word 1-3-2",
                        "ar": "كلمة 1-3-2"
                    },
                    {
                        "en": "Word 1-3-3",
                        "ar": "كلمة 1-3-3"
                    },
                    {
                        "en": "Word 1-3-4",
                        "ar": "كلمة 1-3-4"
                    },
                    {
                        "en": "Word 1-3-5",
                        "ar": "كلمة 1-3-5"
                    },
                    {
                        "en": "Word 1-3-6",
                        "ar": "كلمة 1-3-6"
                    },
                    {
                        "en": "Word 1-3-7",
                        "ar": "كلمة 1-3-7"
                    },
                    {
                        "en": "Word 1-3-8",
                        "ar": "كلمة 1-3-8"
                    },
                    {
                        "en": "Word 1-3-9",
                        "ar": "كلمة 1-3-9"
                    },
                    {
                        "en": "Word 1-3-10",
                        "ar": "كلمة 1-3-10"
                    }
                ],
                "exercises": [
                    {
                        "question": {
                            "en": "What did you learn in lesson 3?",
                            "ar": "ماذا تعلمت في الدرس 3؟"
                        },
                        "options": {
                            "en": [
                                "A lot",
                                "Nothing"
                            ],
                            "ar": [
                                "الكثير",
                                "لا شيء"
                            ]
                        },
                        "answer": 0
                    },
                    {
                        "question": {
                            "en": "Which of the following is correct?",
                            "ar": "أي مما يلي صحيح؟"
                        },
                        "options": {
                            "en": [
                                "Option A",
                                "Option B",
                                "Option C"
                            ],
                            "ar": [
                                "الخيار أ",
                                "الخيار ب",
                                "الخيار ج"
                            ]
                        },
                        "answer": 1
                    }
                ]
            },
            {
                "id": 4,
                "title": {
                    "en": "Introduction to Tenses",
                    "ar": "مقدمة في الأزمنة"
                },
                "duration": "16:00",
                "vocab": [
                    {
                        "en": "Word 1-4-1",
                        "ar": "كلمة 1-4-1"
                    },
                    {
                        "en": "Word 1-4-2",
                        "ar": "كلمة 1-4-2"
                    },
                    {
                        "en": "Word 1-4-3",
                        "ar": "كلمة 1-4-3"
                    },
                    {
                        "en": "Word 1-4-4",
                        "ar": "كلمة 1-4-4"
                    },
                    {
                        "en": "Word 1-4-5",
                        "ar": "كلمة 1-4-5"
                    },
                    {
                        "en": "Word 1-4-6",
                        "ar": "كلمة 1-4-6"
                    },
                    {
                        "en": "Word 1-4-7",
                        "ar": "كلمة 1-4-7"
                    },
                    {
                        "en": "Word 1-4-8",
                        "ar": "كلمة 1-4-8"
                    },
                    {
                        "en": "Word 1-4-9",
                        "ar": "كلمة 1-4-9"
                    },
                    {
                        "en": "Word 1-4-10",
                        "ar": "كلمة 1-4-10"
                    }
                ],
                "exercises": [
                    {
                        "question": {
                            "en": "What did you learn in lesson 4?",
                            "ar": "ماذا تعلمت في الدرس 4؟"
                        },
                        "options": {
                            "en": [
                                "A lot",
                                "Nothing"
                            ],
                            "ar": [
                                "الكثير",
                                "لا شيء"
                            ]
                        },
                        "answer": 0
                    },
                    {
                        "question": {
                            "en": "Which of the following is correct?",
                            "ar": "أي مما يلي صحيح؟"
                        },
                        "options": {
                            "en": [
                                "Option A",
                                "Option B",
                                "Option C"
                            ],
                            "ar": [
                                "الخيار أ",
                                "الخيار ب",
                                "الخيار ج"
                            ]
                        },
                        "answer": 1
                    }
                ]
            },
            {
                "id": 5,
                "title": {
                    "en": "Present Simple vs Continuous",
                    "ar": "المضارع البسيط مقابل المستمر"
                },
                "duration": "18:00",
                "vocab": [
                    {
                        "en": "Word 1-5-1",
                        "ar": "كلمة 1-5-1"
                    },
                    {
                        "en": "Word 1-5-2",
                        "ar": "كلمة 1-5-2"
                    },
                    {
                        "en": "Word 1-5-3",
                        "ar": "كلمة 1-5-3"
                    },
                    {
                        "en": "Word 1-5-4",
                        "ar": "كلمة 1-5-4"
                    },
                    {
                        "en": "Word 1-5-5",
                        "ar": "كلمة 1-5-5"
                    },
                    {
                        "en": "Word 1-5-6",
                        "ar": "كلمة 1-5-6"
                    },
                    {
                        "en": "Word 1-5-7",
                        "ar": "كلمة 1-5-7"
                    },
                    {
                        "en": "Word 1-5-8",
                        "ar": "كلمة 1-5-8"
                    },
                    {
                        "en": "Word 1-5-9",
                        "ar": "كلمة 1-5-9"
                    },
                    {
                        "en": "Word 1-5-10",
                        "ar": "كلمة 1-5-10"
                    }
                ],
                "exercises": [
                    {
                        "question": {
                            "en": "What did you learn in lesson 5?",
                            "ar": "ماذا تعلمت في الدرس 5؟"
                        },
                        "options": {
                            "en": [
                                "A lot",
                                "Nothing"
                            ],
                            "ar": [
                                "الكثير",
                                "لا شيء"
                            ]
                        },
                        "answer": 0
                    },
                    {
                        "question": {
                            "en": "Which of the following is correct?",
                            "ar": "أي مما يلي صحيح؟"
                        },
                        "options": {
                            "en": [
                                "Option A",
                                "Option B",
                                "Option C"
                            ],
                            "ar": [
                                "الخيار أ",
                                "الخيار ب",
                                "الخيار ج"
                            ]
                        },
                        "answer": 1
                    }
                ]
            },
            {
                "id": 6,
                "title": {
                    "en": "Daily Life Vocabulary",
                    "ar": "مفردات الحياة اليومية"
                },
                "duration": "20:00",
                "vocab": [
                    {
                        "en": "Word 1-6-1",
                        "ar": "كلمة 1-6-1"
                    },
                    {
                        "en": "Word 1-6-2",
                        "ar": "كلمة 1-6-2"
                    },
                    {
                        "en": "Word 1-6-3",
                        "ar": "كلمة 1-6-3"
                    },
                    {
                        "en": "Word 1-6-4",
                        "ar": "كلمة 1-6-4"
                    },
                    {
                        "en": "Word 1-6-5",
                        "ar": "كلمة 1-6-5"
                    },
                    {
                        "en": "Word 1-6-6",
                        "ar": "كلمة 1-6-6"
                    },
                    {
                        "en": "Word 1-6-7",
                        "ar": "كلمة 1-6-7"
                    },
                    {
                        "en": "Word 1-6-8",
                        "ar": "كلمة 1-6-8"
                    },
                    {
                        "en": "Word 1-6-9",
                        "ar": "كلمة 1-6-9"
                    },
                    {
                        "en": "Word 1-6-10",
                        "ar": "كلمة 1-6-10"
                    }
                ],
                "exercises": [
                    {
                        "question": {
                            "en": "What did you learn in lesson 6?",
                            "ar": "ماذا تعلمت في الدرس 6؟"
                        },
                        "options": {
                            "en": [
                                "A lot",
                                "Nothing"
                            ],
                            "ar": [
                                "الكثير",
                                "لا شيء"
                            ]
                        },
                        "answer": 0
                    },
                    {
                        "question": {
                            "en": "Which of the following is correct?",
                            "ar": "أي مما يلي صحيح؟"
                        },
                        "options": {
                            "en": [
                                "Option A",
                                "Option B",
                                "Option C"
                            ],
                            "ar": [
                                "الخيار أ",
                                "الخيار ب",
                                "الخيار ج"
                            ]
                        },
                        "answer": 1
                    }
                ]
            }
        ]
    },
    {
        "id": "int-1",
        "name": {
            "en": "Mastering English Grammar",
            "ar": "إتقان قواعد اللغة الإنجليزية"
        },
        "level": {
            "en": "Intermediate",
            "ar": "متوسط"
        },
        "category": {
            "en": "Grammar",
            "ar": "قواعد"
        },
        "icon": "📝",
        "color": "#6c5ce7",
        "videoUrl": "https://www.youtube.com/embed/pSj7S9Wp17A",
        "lessons": [
            {
                "id": 1,
                "title": {
                    "en": "The Passive Voice",
                    "ar": "المبني للمجهول"
                },
                "duration": "10:00",
                "vocab": [
                    {
                        "en": "Word 2-1-1",
                        "ar": "كلمة 2-1-1"
                    },
                    {
                        "en": "Word 2-1-2",
                        "ar": "كلمة 2-1-2"
                    },
                    {
                        "en": "Word 2-1-3",
                        "ar": "كلمة 2-1-3"
                    },
                    {
                        "en": "Word 2-1-4",
                        "ar": "كلمة 2-1-4"
                    },
                    {
                        "en": "Word 2-1-5",
                        "ar": "كلمة 2-1-5"
                    },
                    {
                        "en": "Word 2-1-6",
                        "ar": "كلمة 2-1-6"
                    },
                    {
                        "en": "Word 2-1-7",
                        "ar": "كلمة 2-1-7"
                    },
                    {
                        "en": "Word 2-1-8",
                        "ar": "كلمة 2-1-8"
                    },
                    {
                        "en": "Word 2-1-9",
                        "ar": "كلمة 2-1-9"
                    },
                    {
                        "en": "Word 2-1-10",
                        "ar": "كلمة 2-1-10"
                    }
                ],
                "exercises": [
                    {
                        "question": {
                            "en": "What did you learn in lesson 1?",
                            "ar": "ماذا تعلمت في الدرس 1؟"
                        },
                        "options": {
                            "en": [
                                "A lot",
                                "Nothing"
                            ],
                            "ar": [
                                "الكثير",
                                "لا شيء"
                            ]
                        },
                        "answer": 0
                    },
                    {
                        "question": {
                            "en": "Which of the following is correct?",
                            "ar": "أي مما يلي صحيح؟"
                        },
                        "options": {
                            "en": [
                                "Option A",
                                "Option B",
                                "Option C"
                            ],
                            "ar": [
                                "الخيار أ",
                                "الخيار ب",
                                "الخيار ج"
                            ]
                        },
                        "answer": 1
                    }
                ]
            },
            {
                "id": 2,
                "title": {
                    "en": "Conditional Sentences",
                    "ar": "الجمل الشرطية"
                },
                "duration": "12:00",
                "vocab": [
                    {
                        "en": "Word 2-2-1",
                        "ar": "كلمة 2-2-1"
                    },
                    {
                        "en": "Word 2-2-2",
                        "ar": "كلمة 2-2-2"
                    },
                    {
                        "en": "Word 2-2-3",
                        "ar": "كلمة 2-2-3"
                    },
                    {
                        "en": "Word 2-2-4",
                        "ar": "كلمة 2-2-4"
                    },
                    {
                        "en": "Word 2-2-5",
                        "ar": "كلمة 2-2-5"
                    },
                    {
                        "en": "Word 2-2-6",
                        "ar": "كلمة 2-2-6"
                    },
                    {
                        "en": "Word 2-2-7",
                        "ar": "كلمة 2-2-7"
                    },
                    {
                        "en": "Word 2-2-8",
                        "ar": "كلمة 2-2-8"
                    },
                    {
                        "en": "Word 2-2-9",
                        "ar": "كلمة 2-2-9"
                    },
                    {
                        "en": "Word 2-2-10",
                        "ar": "كلمة 2-2-10"
                    }
                ],
                "exercises": [
                    {
                        "question": {
                            "en": "What did you learn in lesson 2?",
                            "ar": "ماذا تعلمت في الدرس 2؟"
                        },
                        "options": {
                            "en": [
                                "A lot",
                                "Nothing"
                            ],
                            "ar": [
                                "الكثير",
                                "لا شيء"
                            ]
                        },
                        "answer": 0
                    },
                    {
                        "question": {
                            "en": "Which of the following is correct?",
                            "ar": "أي مما يلي صحيح؟"
                        },
                        "options": {
                            "en": [
                                "Option A",
                                "Option B",
                                "Option C"
                            ],
                            "ar": [
                                "الخيار أ",
                                "الخيار ب",
                                "الخيار ج"
                            ]
                        },
                        "answer": 1
                    }
                ]
            },
            {
                "id": 3,
                "title": {
                    "en": "Relative Clauses",
                    "ar": "جمل الوصل"
                },
                "duration": "14:00",
                "vocab": [
                    {
                        "en": "Word 2-3-1",
                        "ar": "كلمة 2-3-1"
                    },
                    {
                        "en": "Word 2-3-2",
                        "ar": "كلمة 2-3-2"
                    },
                    {
                        "en": "Word 2-3-3",
                        "ar": "كلمة 2-3-3"
                    },
                    {
                        "en": "Word 2-3-4",
                        "ar": "كلمة 2-3-4"
                    },
                    {
                        "en": "Word 2-3-5",
                        "ar": "كلمة 2-3-5"
                    },
                    {
                        "en": "Word 2-3-6",
                        "ar": "كلمة 2-3-6"
                    },
                    {
                        "en": "Word 2-3-7",
                        "ar": "كلمة 2-3-7"
                    },
                    {
                        "en": "Word 2-3-8",
                        "ar": "كلمة 2-3-8"
                    },
                    {
                        "en": "Word 2-3-9",
                        "ar": "كلمة 2-3-9"
                    },
                    {
                        "en": "Word 2-3-10",
                        "ar": "كلمة 2-3-10"
                    }
                ],
                "exercises": [
                    {
                        "question": {
                            "en": "What did you learn in lesson 3?",
                            "ar": "ماذا تعلمت في الدرس 3؟"
                        },
                        "options": {
                            "en": [
                                "A lot",
                                "Nothing"
                            ],
                            "ar": [
                                "الكثير",
                                "لا شيء"
                            ]
                        },
                        "answer": 0
                    },
                    {
                        "question": {
                            "en": "Which of the following is correct?",
                            "ar": "أي مما يلي صحيح؟"
                        },
                        "options": {
                            "en": [
                                "Option A",
                                "Option B",
                                "Option C"
                            ],
                            "ar": [
                                "الخيار أ",
                                "الخيار ب",
                                "الخيار ج"
                            ]
                        },
                        "answer": 1
                    }
                ]
            },
            {
                "id": 4,
                "title": {
                    "en": "Reported Speech",
                    "ar": "الكلام المنقول"
                },
                "duration": "16:00",
                "vocab": [
                    {
                        "en": "Word 2-4-1",
                        "ar": "كلمة 2-4-1"
                    },
                    {
                        "en": "Word 2-4-2",
                        "ar": "كلمة 2-4-2"
                    },
                    {
                        "en": "Word 2-4-3",
                        "ar": "كلمة 2-4-3"
                    },
                    {
                        "en": "Word 2-4-4",
                        "ar": "كلمة 2-4-4"
                    },
                    {
                        "en": "Word 2-4-5",
                        "ar": "كلمة 2-4-5"
                    },
                    {
                        "en": "Word 2-4-6",
                        "ar": "كلمة 2-4-6"
                    },
                    {
                        "en": "Word 2-4-7",
                        "ar": "كلمة 2-4-7"
                    },
                    {
                        "en": "Word 2-4-8",
                        "ar": "كلمة 2-4-8"
                    },
                    {
                        "en": "Word 2-4-9",
                        "ar": "كلمة 2-4-9"
                    },
                    {
                        "en": "Word 2-4-10",
                        "ar": "كلمة 2-4-10"
                    }
                ],
                "exercises": [
                    {
                        "question": {
                            "en": "What did you learn in lesson 4?",
                            "ar": "ماذا تعلمت في الدرس 4؟"
                        },
                        "options": {
                            "en": [
                                "A lot",
                                "Nothing"
                            ],
                            "ar": [
                                "الكثير",
                                "لا شيء"
                            ]
                        },
                        "answer": 0
                    },
                    {
                        "question": {
                            "en": "Which of the following is correct?",
                            "ar": "أي مما يلي صحيح؟"
                        },
                        "options": {
                            "en": [
                                "Option A",
                                "Option B",
                                "Option C"
                            ],
                            "ar": [
                                "الخيار أ",
                                "الخيار ب",
                                "الخيار ج"
                            ]
                        },
                        "answer": 1
                    }
                ]
            },
            {
                "id": 5,
                "title": {
                    "en": "Gerunds and Infinitives",
                    "ar": "المصادر وأسماء الفاعل"
                },
                "duration": "18:00",
                "vocab": [
                    {
                        "en": "Word 2-5-1",
                        "ar": "كلمة 2-5-1"
                    },
                    {
                        "en": "Word 2-5-2",
                        "ar": "كلمة 2-5-2"
                    },
                    {
                        "en": "Word 2-5-3",
                        "ar": "كلمة 2-5-3"
                    },
                    {
                        "en": "Word 2-5-4",
                        "ar": "كلمة 2-5-4"
                    },
                    {
                        "en": "Word 2-5-5",
                        "ar": "كلمة 2-5-5"
                    },
                    {
                        "en": "Word 2-5-6",
                        "ar": "كلمة 2-5-6"
                    },
                    {
                        "en": "Word 2-5-7",
                        "ar": "كلمة 2-5-7"
                    },
                    {
                        "en": "Word 2-5-8",
                        "ar": "كلمة 2-5-8"
                    },
                    {
                        "en": "Word 2-5-9",
                        "ar": "كلمة 2-5-9"
                    },
                    {
                        "en": "Word 2-5-10",
                        "ar": "كلمة 2-5-10"
                    }
                ],
                "exercises": [
                    {
                        "question": {
                            "en": "What did you learn in lesson 5?",
                            "ar": "ماذا تعلمت في الدرس 5؟"
                        },
                        "options": {
                            "en": [
                                "A lot",
                                "Nothing"
                            ],
                            "ar": [
                                "الكثير",
                                "لا شيء"
                            ]
                        },
                        "answer": 0
                    },
                    {
                        "question": {
                            "en": "Which of the following is correct?",
                            "ar": "أي مما يلي صحيح؟"
                        },
                        "options": {
                            "en": [
                                "Option A",
                                "Option B",
                                "Option C"
                            ],
                            "ar": [
                                "الخيار أ",
                                "الخيار ب",
                                "الخيار ج"
                            ]
                        },
                        "answer": 1
                    }
                ]
            }
        ]
    },
    {
        "id": "adv-1",
        "name": {
            "en": "Advanced Conversation & Fluency",
            "ar": "المحادثة والطلاقة المتقدمة"
        },
        "level": {
            "en": "Advanced",
            "ar": "متقدم"
        },
        "category": {
            "en": "Speaking",
            "ar": "تحدث"
        },
        "icon": "🎙️",
        "color": "#ff9f43",
        "videoUrl": "https://www.youtube.com/embed/6_fJ_Wv8n9U",
        "lessons": [
            {
                "id": 1,
                "title": {
                    "en": "Native-like Pronunciation",
                    "ar": "نطق مثل المتحدثين الأصليين"
                },
                "duration": "10:00",
                "vocab": [
                    {
                        "en": "Word 3-1-1",
                        "ar": "كلمة 3-1-1"
                    },
                    {
                        "en": "Word 3-1-2",
                        "ar": "كلمة 3-1-2"
                    },
                    {
                        "en": "Word 3-1-3",
                        "ar": "كلمة 3-1-3"
                    },
                    {
                        "en": "Word 3-1-4",
                        "ar": "كلمة 3-1-4"
                    },
                    {
                        "en": "Word 3-1-5",
                        "ar": "كلمة 3-1-5"
                    },
                    {
                        "en": "Word 3-1-6",
                        "ar": "كلمة 3-1-6"
                    },
                    {
                        "en": "Word 3-1-7",
                        "ar": "كلمة 3-1-7"
                    },
                    {
                        "en": "Word 3-1-8",
                        "ar": "كلمة 3-1-8"
                    },
                    {
                        "en": "Word 3-1-9",
                        "ar": "كلمة 3-1-9"
                    },
                    {
                        "en": "Word 3-1-10",
                        "ar": "كلمة 3-1-10"
                    }
                ],
                "exercises": [
                    {
                        "question": {
                            "en": "What did you learn in lesson 1?",
                            "ar": "ماذا تعلمت في الدرس 1؟"
                        },
                        "options": {
                            "en": [
                                "A lot",
                                "Nothing"
                            ],
                            "ar": [
                                "الكثير",
                                "لا شيء"
                            ]
                        },
                        "answer": 0
                    },
                    {
                        "question": {
                            "en": "Which of the following is correct?",
                            "ar": "أي مما يلي صحيح؟"
                        },
                        "options": {
                            "en": [
                                "Option A",
                                "Option B",
                                "Option C"
                            ],
                            "ar": [
                                "الخيار أ",
                                "الخيار ب",
                                "الخيار ج"
                            ]
                        },
                        "answer": 1
                    }
                ]
            },
            {
                "id": 2,
                "title": {
                    "en": "Slang & Idioms",
                    "ar": "العامية والاصطلاحات"
                },
                "duration": "12:00",
                "vocab": [
                    {
                        "en": "Word 3-2-1",
                        "ar": "كلمة 3-2-1"
                    },
                    {
                        "en": "Word 3-2-2",
                        "ar": "كلمة 3-2-2"
                    },
                    {
                        "en": "Word 3-2-3",
                        "ar": "كلمة 3-2-3"
                    },
                    {
                        "en": "Word 3-2-4",
                        "ar": "كلمة 3-2-4"
                    },
                    {
                        "en": "Word 3-2-5",
                        "ar": "كلمة 3-2-5"
                    },
                    {
                        "en": "Word 3-2-6",
                        "ar": "كلمة 3-2-6"
                    },
                    {
                        "en": "Word 3-2-7",
                        "ar": "كلمة 3-2-7"
                    },
                    {
                        "en": "Word 3-2-8",
                        "ar": "كلمة 3-2-8"
                    },
                    {
                        "en": "Word 3-2-9",
                        "ar": "كلمة 3-2-9"
                    },
                    {
                        "en": "Word 3-2-10",
                        "ar": "كلمة 3-2-10"
                    }
                ],
                "exercises": [
                    {
                        "question": {
                            "en": "What did you learn in lesson 2?",
                            "ar": "ماذا تعلمت في الدرس 2؟"
                        },
                        "options": {
                            "en": [
                                "A lot",
                                "Nothing"
                            ],
                            "ar": [
                                "الكثير",
                                "لا شيء"
                            ]
                        },
                        "answer": 0
                    },
                    {
                        "question": {
                            "en": "Which of the following is correct?",
                            "ar": "أي مما يلي صحيح؟"
                        },
                        "options": {
                            "en": [
                                "Option A",
                                "Option B",
                                "Option C"
                            ],
                            "ar": [
                                "الخيار أ",
                                "الخيار ب",
                                "الخيار ج"
                            ]
                        },
                        "answer": 1
                    }
                ]
            },
            {
                "id": 3,
                "title": {
                    "en": "Public Speaking in English",
                    "ar": "التحدث أمام الجمهور بالإنجليزية"
                },
                "duration": "14:00",
                "vocab": [
                    {
                        "en": "Word 3-3-1",
                        "ar": "كلمة 3-3-1"
                    },
                    {
                        "en": "Word 3-3-2",
                        "ar": "كلمة 3-3-2"
                    },
                    {
                        "en": "Word 3-3-3",
                        "ar": "كلمة 3-3-3"
                    },
                    {
                        "en": "Word 3-3-4",
                        "ar": "كلمة 3-3-4"
                    },
                    {
                        "en": "Word 3-3-5",
                        "ar": "كلمة 3-3-5"
                    },
                    {
                        "en": "Word 3-3-6",
                        "ar": "كلمة 3-3-6"
                    },
                    {
                        "en": "Word 3-3-7",
                        "ar": "كلمة 3-3-7"
                    },
                    {
                        "en": "Word 3-3-8",
                        "ar": "كلمة 3-3-8"
                    },
                    {
                        "en": "Word 3-3-9",
                        "ar": "كلمة 3-3-9"
                    },
                    {
                        "en": "Word 3-3-10",
                        "ar": "كلمة 3-3-10"
                    }
                ],
                "exercises": [
                    {
                        "question": {
                            "en": "What did you learn in lesson 3?",
                            "ar": "ماذا تعلمت في الدرس 3؟"
                        },
                        "options": {
                            "en": [
                                "A lot",
                                "Nothing"
                            ],
                            "ar": [
                                "الكثير",
                                "لا شيء"
                            ]
                        },
                        "answer": 0
                    },
                    {
                        "question": {
                            "en": "Which of the following is correct?",
                            "ar": "أي مما يلي صحيح؟"
                        },
                        "options": {
                            "en": [
                                "Option A",
                                "Option B",
                                "Option C"
                            ],
                            "ar": [
                                "الخيار أ",
                                "الخيار ب",
                                "الخيار ج"
                            ]
                        },
                        "answer": 1
                    }
                ]
            },
            {
                "id": 4,
                "title": {
                    "en": "Complex Arguments",
                    "ar": "الحجج المعقدة"
                },
                "duration": "16:00",
                "vocab": [
                    {
                        "en": "Word 3-4-1",
                        "ar": "كلمة 3-4-1"
                    },
                    {
                        "en": "Word 3-4-2",
                        "ar": "كلمة 3-4-2"
                    },
                    {
                        "en": "Word 3-4-3",
                        "ar": "كلمة 3-4-3"
                    },
                    {
                        "en": "Word 3-4-4",
                        "ar": "كلمة 3-4-4"
                    },
                    {
                        "en": "Word 3-4-5",
                        "ar": "كلمة 3-4-5"
                    },
                    {
                        "en": "Word 3-4-6",
                        "ar": "كلمة 3-4-6"
                    },
                    {
                        "en": "Word 3-4-7",
                        "ar": "كلمة 3-4-7"
                    },
                    {
                        "en": "Word 3-4-8",
                        "ar": "كلمة 3-4-8"
                    },
                    {
                        "en": "Word 3-4-9",
                        "ar": "كلمة 3-4-9"
                    },
                    {
                        "en": "Word 3-4-10",
                        "ar": "كلمة 3-4-10"
                    }
                ],
                "exercises": [
                    {
                        "question": {
                            "en": "What did you learn in lesson 4?",
                            "ar": "ماذا تعلمت في الدرس 4؟"
                        },
                        "options": {
                            "en": [
                                "A lot",
                                "Nothing"
                            ],
                            "ar": [
                                "الكثير",
                                "لا شيء"
                            ]
                        },
                        "answer": 0
                    },
                    {
                        "question": {
                            "en": "Which of the following is correct?",
                            "ar": "أي مما يلي صحيح؟"
                        },
                        "options": {
                            "en": [
                                "Option A",
                                "Option B",
                                "Option C"
                            ],
                            "ar": [
                                "الخيار أ",
                                "الخيار ب",
                                "الخيار ج"
                            ]
                        },
                        "answer": 1
                    }
                ]
            },
            {
                "id": 5,
                "title": {
                    "en": "Debate Techniques",
                    "ar": "تقنيات المناظرة"
                },
                "duration": "18:00",
                "vocab": [
                    {
                        "en": "Word 3-5-1",
                        "ar": "كلمة 3-5-1"
                    },
                    {
                        "en": "Word 3-5-2",
                        "ar": "كلمة 3-5-2"
                    },
                    {
                        "en": "Word 3-5-3",
                        "ar": "كلمة 3-5-3"
                    },
                    {
                        "en": "Word 3-5-4",
                        "ar": "كلمة 3-5-4"
                    },
                    {
                        "en": "Word 3-5-5",
                        "ar": "كلمة 3-5-5"
                    },
                    {
                        "en": "Word 3-5-6",
                        "ar": "كلمة 3-5-6"
                    },
                    {
                        "en": "Word 3-5-7",
                        "ar": "كلمة 3-5-7"
                    },
                    {
                        "en": "Word 3-5-8",
                        "ar": "كلمة 3-5-8"
                    },
                    {
                        "en": "Word 3-5-9",
                        "ar": "كلمة 3-5-9"
                    },
                    {
                        "en": "Word 3-5-10",
                        "ar": "كلمة 3-5-10"
                    }
                ],
                "exercises": [
                    {
                        "question": {
                            "en": "What did you learn in lesson 5?",
                            "ar": "ماذا تعلمت في الدرس 5؟"
                        },
                        "options": {
                            "en": [
                                "A lot",
                                "Nothing"
                            ],
                            "ar": [
                                "الكثير",
                                "لا شيء"
                            ]
                        },
                        "answer": 0
                    },
                    {
                        "question": {
                            "en": "Which of the following is correct?",
                            "ar": "أي مما يلي صحيح؟"
                        },
                        "options": {
                            "en": [
                                "Option A",
                                "Option B",
                                "Option C"
                            ],
                            "ar": [
                                "الخيار أ",
                                "الخيار ب",
                                "الخيار ج"
                            ]
                        },
                        "answer": 1
                    }
                ]
            }
        ]
    },
    {
        "id": "bus-1",
        "name": {
            "en": "English for Business Professionals",
            "ar": "الإنجليزية للمحترفين في الأعمال"
        },
        "level": {
            "en": "Business",
            "ar": "أعمال"
        },
        "category": {
            "en": "Workplace",
            "ar": "مكان العمل"
        },
        "icon": "💼",
        "color": "#2e86de",
        "videoUrl": "https://www.youtube.com/embed/nU0lS9T7mE0",
        "lessons": [
            {
                "id": 1,
                "title": {
                    "en": "Business Email Writing",
                    "ar": "كتابة رسائل البريد الإلكتروني للأعمال"
                },
                "duration": "10:00",
                "vocab": [
                    {
                        "en": "Word 4-1-1",
                        "ar": "كلمة 4-1-1"
                    },
                    {
                        "en": "Word 4-1-2",
                        "ar": "كلمة 4-1-2"
                    },
                    {
                        "en": "Word 4-1-3",
                        "ar": "كلمة 4-1-3"
                    },
                    {
                        "en": "Word 4-1-4",
                        "ar": "كلمة 4-1-4"
                    },
                    {
                        "en": "Word 4-1-5",
                        "ar": "كلمة 4-1-5"
                    },
                    {
                        "en": "Word 4-1-6",
                        "ar": "كلمة 4-1-6"
                    },
                    {
                        "en": "Word 4-1-7",
                        "ar": "كلمة 4-1-7"
                    },
                    {
                        "en": "Word 4-1-8",
                        "ar": "كلمة 4-1-8"
                    },
                    {
                        "en": "Word 4-1-9",
                        "ar": "كلمة 4-1-9"
                    },
                    {
                        "en": "Word 4-1-10",
                        "ar": "كلمة 4-1-10"
                    }
                ],
                "exercises": [
                    {
                        "question": {
                            "en": "What did you learn in lesson 1?",
                            "ar": "ماذا تعلمت في الدرس 1؟"
                        },
                        "options": {
                            "en": [
                                "A lot",
                                "Nothing"
                            ],
                            "ar": [
                                "الكثير",
                                "لا شيء"
                            ]
                        },
                        "answer": 0
                    },
                    {
                        "question": {
                            "en": "Which of the following is correct?",
                            "ar": "أي مما يلي صحيح؟"
                        },
                        "options": {
                            "en": [
                                "Option A",
                                "Option B",
                                "Option C"
                            ],
                            "ar": [
                                "الخيار أ",
                                "الخيار ب",
                                "الخيار ج"
                            ]
                        },
                        "answer": 1
                    }
                ]
            },
            {
                "id": 2,
                "title": {
                    "en": "Negotiation Phrases",
                    "ar": "عبارات التفاوض"
                },
                "duration": "12:00",
                "vocab": [
                    {
                        "en": "Word 4-2-1",
                        "ar": "كلمة 4-2-1"
                    },
                    {
                        "en": "Word 4-2-2",
                        "ar": "كلمة 4-2-2"
                    },
                    {
                        "en": "Word 4-2-3",
                        "ar": "كلمة 4-2-3"
                    },
                    {
                        "en": "Word 4-2-4",
                        "ar": "كلمة 4-2-4"
                    },
                    {
                        "en": "Word 4-2-5",
                        "ar": "كلمة 4-2-5"
                    },
                    {
                        "en": "Word 4-2-6",
                        "ar": "كلمة 4-2-6"
                    },
                    {
                        "en": "Word 4-2-7",
                        "ar": "كلمة 4-2-7"
                    },
                    {
                        "en": "Word 4-2-8",
                        "ar": "كلمة 4-2-8"
                    },
                    {
                        "en": "Word 4-2-9",
                        "ar": "كلمة 4-2-9"
                    },
                    {
                        "en": "Word 4-2-10",
                        "ar": "كلمة 4-2-10"
                    }
                ],
                "exercises": [
                    {
                        "question": {
                            "en": "What did you learn in lesson 2?",
                            "ar": "ماذا تعلمت في الدرس 2؟"
                        },
                        "options": {
                            "en": [
                                "A lot",
                                "Nothing"
                            ],
                            "ar": [
                                "الكثير",
                                "لا شيء"
                            ]
                        },
                        "answer": 0
                    },
                    {
                        "question": {
                            "en": "Which of the following is correct?",
                            "ar": "أي مما يلي صحيح؟"
                        },
                        "options": {
                            "en": [
                                "Option A",
                                "Option B",
                                "Option C"
                            ],
                            "ar": [
                                "الخيار أ",
                                "الخيار ب",
                                "الخيار ج"
                            ]
                        },
                        "answer": 1
                    }
                ]
            },
            {
                "id": 3,
                "title": {
                    "en": "Meeting Management",
                    "ar": "إدارة الاجتماعات"
                },
                "duration": "14:00",
                "vocab": [
                    {
                        "en": "Word 4-3-1",
                        "ar": "كلمة 4-3-1"
                    },
                    {
                        "en": "Word 4-3-2",
                        "ar": "كلمة 4-3-2"
                    },
                    {
                        "en": "Word 4-3-3",
                        "ar": "كلمة 4-3-3"
                    },
                    {
                        "en": "Word 4-3-4",
                        "ar": "كلمة 4-3-4"
                    },
                    {
                        "en": "Word 4-3-5",
                        "ar": "كلمة 4-3-5"
                    },
                    {
                        "en": "Word 4-3-6",
                        "ar": "كلمة 4-3-6"
                    },
                    {
                        "en": "Word 4-3-7",
                        "ar": "كلمة 4-3-7"
                    },
                    {
                        "en": "Word 4-3-8",
                        "ar": "كلمة 4-3-8"
                    },
                    {
                        "en": "Word 4-3-9",
                        "ar": "كلمة 4-3-9"
                    },
                    {
                        "en": "Word 4-3-10",
                        "ar": "كلمة 4-3-10"
                    }
                ],
                "exercises": [
                    {
                        "question": {
                            "en": "What did you learn in lesson 3?",
                            "ar": "ماذا تعلمت في الدرس 3؟"
                        },
                        "options": {
                            "en": [
                                "A lot",
                                "Nothing"
                            ],
                            "ar": [
                                "الكثير",
                                "لا شيء"
                            ]
                        },
                        "answer": 0
                    },
                    {
                        "question": {
                            "en": "Which of the following is correct?",
                            "ar": "أي مما يلي صحيح؟"
                        },
                        "options": {
                            "en": [
                                "Option A",
                                "Option B",
                                "Option C"
                            ],
                            "ar": [
                                "الخيار أ",
                                "الخيار ب",
                                "الخيار ج"
                            ]
                        },
                        "answer": 1
                    }
                ]
            },
            {
                "id": 4,
                "title": {
                    "en": "Presentation Skills",
                    "ar": "مهارات العرض"
                },
                "duration": "16:00",
                "vocab": [
                    {
                        "en": "Word 4-4-1",
                        "ar": "كلمة 4-4-1"
                    },
                    {
                        "en": "Word 4-4-2",
                        "ar": "كلمة 4-4-2"
                    },
                    {
                        "en": "Word 4-4-3",
                        "ar": "كلمة 4-4-3"
                    },
                    {
                        "en": "Word 4-4-4",
                        "ar": "كلمة 4-4-4"
                    },
                    {
                        "en": "Word 4-4-5",
                        "ar": "كلمة 4-4-5"
                    },
                    {
                        "en": "Word 4-4-6",
                        "ar": "كلمة 4-4-6"
                    },
                    {
                        "en": "Word 4-4-7",
                        "ar": "كلمة 4-4-7"
                    },
                    {
                        "en": "Word 4-4-8",
                        "ar": "كلمة 4-4-8"
                    },
                    {
                        "en": "Word 4-4-9",
                        "ar": "كلمة 4-4-9"
                    },
                    {
                        "en": "Word 4-4-10",
                        "ar": "كلمة 4-4-10"
                    }
                ],
                "exercises": [
                    {
                        "question": {
                            "en": "What did you learn in lesson 4?",
                            "ar": "ماذا تعلمت في الدرس 4؟"
                        },
                        "options": {
                            "en": [
                                "A lot",
                                "Nothing"
                            ],
                            "ar": [
                                "الكثير",
                                "لا شيء"
                            ]
                        },
                        "answer": 0
                    },
                    {
                        "question": {
                            "en": "Which of the following is correct?",
                            "ar": "أي مما يلي صحيح؟"
                        },
                        "options": {
                            "en": [
                                "Option A",
                                "Option B",
                                "Option C"
                            ],
                            "ar": [
                                "الخيار أ",
                                "الخيار ب",
                                "الخيار ج"
                            ]
                        },
                        "answer": 1
                    }
                ]
            },
            {
                "id": 5,
                "title": {
                    "en": "Networking & Small Talk",
                    "ar": "التشبيك وأحاديث التعارف"
                },
                "duration": "18:00",
                "vocab": [
                    {
                        "en": "Word 4-5-1",
                        "ar": "كلمة 4-5-1"
                    },
                    {
                        "en": "Word 4-5-2",
                        "ar": "كلمة 4-5-2"
                    },
                    {
                        "en": "Word 4-5-3",
                        "ar": "كلمة 4-5-3"
                    },
                    {
                        "en": "Word 4-5-4",
                        "ar": "كلمة 4-5-4"
                    },
                    {
                        "en": "Word 4-5-5",
                        "ar": "كلمة 4-5-5"
                    },
                    {
                        "en": "Word 4-5-6",
                        "ar": "كلمة 4-5-6"
                    },
                    {
                        "en": "Word 4-5-7",
                        "ar": "كلمة 4-5-7"
                    },
                    {
                        "en": "Word 4-5-8",
                        "ar": "كلمة 4-5-8"
                    },
                    {
                        "en": "Word 4-5-9",
                        "ar": "كلمة 4-5-9"
                    },
                    {
                        "en": "Word 4-5-10",
                        "ar": "كلمة 4-5-10"
                    }
                ],
                "exercises": [
                    {
                        "question": {
                            "en": "What did you learn in lesson 5?",
                            "ar": "ماذا تعلمت في الدرس 5؟"
                        },
                        "options": {
                            "en": [
                                "A lot",
                                "Nothing"
                            ],
                            "ar": [
                                "الكثير",
                                "لا شيء"
                            ]
                        },
                        "answer": 0
                    },
                    {
                        "question": {
                            "en": "Which of the following is correct?",
                            "ar": "أي مما يلي صحيح؟"
                        },
                        "options": {
                            "en": [
                                "Option A",
                                "Option B",
                                "Option C"
                            ],
                            "ar": [
                                "الخيار أ",
                                "الخيار ب",
                                "الخيار ج"
                            ]
                        },
                        "answer": 1
                    }
                ]
            }
        ]
    },
    {
        "id": "ielt-1",
        "name": {
            "en": "IELTS Success Masterclass",
            "ar": "ماستر كلاس النجاح في الآيلتس"
        },
        "level": {
            "en": "Advanced",
            "ar": "متقدم"
        },
        "category": {
            "en": "Exams",
            "ar": "امتحانات"
        },
        "icon": "🎓",
        "color": "#ee5253",
        "videoUrl": "https://www.youtube.com/embed/juKDRv6S32I",
        "lessons": [
            {
                "id": 1,
                "title": {
                    "en": "IELTS Speaking Intro",
                    "ar": "مقدمة تحدث الآيلتس"
                },
                "duration": "10:00",
                "vocab": [
                    {
                        "en": "Word 5-1-1",
                        "ar": "كلمة 5-1-1"
                    },
                    {
                        "en": "Word 5-1-2",
                        "ar": "كلمة 5-1-2"
                    },
                    {
                        "en": "Word 5-1-3",
                        "ar": "كلمة 5-1-3"
                    },
                    {
                        "en": "Word 5-1-4",
                        "ar": "كلمة 5-1-4"
                    },
                    {
                        "en": "Word 5-1-5",
                        "ar": "كلمة 5-1-5"
                    },
                    {
                        "en": "Word 5-1-6",
                        "ar": "كلمة 5-1-6"
                    },
                    {
                        "en": "Word 5-1-7",
                        "ar": "كلمة 5-1-7"
                    },
                    {
                        "en": "Word 5-1-8",
                        "ar": "كلمة 5-1-8"
                    },
                    {
                        "en": "Word 5-1-9",
                        "ar": "كلمة 5-1-9"
                    },
                    {
                        "en": "Word 5-1-10",
                        "ar": "كلمة 5-1-10"
                    }
                ],
                "exercises": [
                    {
                        "question": {
                            "en": "What did you learn in lesson 1?",
                            "ar": "ماذا تعلمت في الدرس 1؟"
                        },
                        "options": {
                            "en": [
                                "A lot",
                                "Nothing"
                            ],
                            "ar": [
                                "الكثير",
                                "لا شيء"
                            ]
                        },
                        "answer": 0
                    },
                    {
                        "question": {
                            "en": "Which of the following is correct?",
                            "ar": "أي مما يلي صحيح؟"
                        },
                        "options": {
                            "en": [
                                "Option A",
                                "Option B",
                                "Option C"
                            ],
                            "ar": [
                                "الخيار أ",
                                "الخيار ب",
                                "الخيار ج"
                            ]
                        },
                        "answer": 1
                    }
                ]
            },
            {
                "id": 2,
                "title": {
                    "en": "Speaking Part 2 Strategies",
                    "ar": "استراتيجيات التحدث الجزء الثاني"
                },
                "duration": "12:00",
                "vocab": [
                    {
                        "en": "Word 5-2-1",
                        "ar": "كلمة 5-2-1"
                    },
                    {
                        "en": "Word 5-2-2",
                        "ar": "كلمة 5-2-2"
                    },
                    {
                        "en": "Word 5-2-3",
                        "ar": "كلمة 5-2-3"
                    },
                    {
                        "en": "Word 5-2-4",
                        "ar": "كلمة 5-2-4"
                    },
                    {
                        "en": "Word 5-2-5",
                        "ar": "كلمة 5-2-5"
                    },
                    {
                        "en": "Word 5-2-6",
                        "ar": "كلمة 5-2-6"
                    },
                    {
                        "en": "Word 5-2-7",
                        "ar": "كلمة 5-2-7"
                    },
                    {
                        "en": "Word 5-2-8",
                        "ar": "كلمة 5-2-8"
                    },
                    {
                        "en": "Word 5-2-9",
                        "ar": "كلمة 5-2-9"
                    },
                    {
                        "en": "Word 5-2-10",
                        "ar": "كلمة 5-2-10"
                    }
                ],
                "exercises": [
                    {
                        "question": {
                            "en": "What did you learn in lesson 2?",
                            "ar": "ماذا تعلمت في الدرس 2؟"
                        },
                        "options": {
                            "en": [
                                "A lot",
                                "Nothing"
                            ],
                            "ar": [
                                "الكثير",
                                "لا شيء"
                            ]
                        },
                        "answer": 0
                    },
                    {
                        "question": {
                            "en": "Which of the following is correct?",
                            "ar": "أي مما يلي صحيح؟"
                        },
                        "options": {
                            "en": [
                                "Option A",
                                "Option B",
                                "Option C"
                            ],
                            "ar": [
                                "الخيار أ",
                                "الخيار ب",
                                "الخيار ج"
                            ]
                        },
                        "answer": 1
                    }
                ]
            },
            {
                "id": 3,
                "title": {
                    "en": "Writing Task 1 Academic",
                    "ar": "مهمة الكتابة الأولى أكاديمي"
                },
                "duration": "14:00",
                "vocab": [
                    {
                        "en": "Word 5-3-1",
                        "ar": "كلمة 5-3-1"
                    },
                    {
                        "en": "Word 5-3-2",
                        "ar": "كلمة 5-3-2"
                    },
                    {
                        "en": "Word 5-3-3",
                        "ar": "كلمة 5-3-3"
                    },
                    {
                        "en": "Word 5-3-4",
                        "ar": "كلمة 5-3-4"
                    },
                    {
                        "en": "Word 5-3-5",
                        "ar": "كلمة 5-3-5"
                    },
                    {
                        "en": "Word 5-3-6",
                        "ar": "كلمة 5-3-6"
                    },
                    {
                        "en": "Word 5-3-7",
                        "ar": "كلمة 5-3-7"
                    },
                    {
                        "en": "Word 5-3-8",
                        "ar": "كلمة 5-3-8"
                    },
                    {
                        "en": "Word 5-3-9",
                        "ar": "كلمة 5-3-9"
                    },
                    {
                        "en": "Word 5-3-10",
                        "ar": "كلمة 5-3-10"
                    }
                ],
                "exercises": [
                    {
                        "question": {
                            "en": "What did you learn in lesson 3?",
                            "ar": "ماذا تعلمت في الدرس 3؟"
                        },
                        "options": {
                            "en": [
                                "A lot",
                                "Nothing"
                            ],
                            "ar": [
                                "الكثير",
                                "لا شيء"
                            ]
                        },
                        "answer": 0
                    },
                    {
                        "question": {
                            "en": "Which of the following is correct?",
                            "ar": "أي مما يلي صحيح؟"
                        },
                        "options": {
                            "en": [
                                "Option A",
                                "Option B",
                                "Option C"
                            ],
                            "ar": [
                                "الخيار أ",
                                "الخيار ب",
                                "الخيار ج"
                            ]
                        },
                        "answer": 1
                    }
                ]
            },
            {
                "id": 4,
                "title": {
                    "en": "Writing Task 2 Strategies",
                    "ar": "استراتيجيات مهمة الكتابة 2"
                },
                "duration": "16:00",
                "vocab": [
                    {
                        "en": "Word 5-4-1",
                        "ar": "كلمة 5-4-1"
                    },
                    {
                        "en": "Word 5-4-2",
                        "ar": "كلمة 5-4-2"
                    },
                    {
                        "en": "Word 5-4-3",
                        "ar": "كلمة 5-4-3"
                    },
                    {
                        "en": "Word 5-4-4",
                        "ar": "كلمة 5-4-4"
                    },
                    {
                        "en": "Word 5-4-5",
                        "ar": "كلمة 5-4-5"
                    },
                    {
                        "en": "Word 5-4-6",
                        "ar": "كلمة 5-4-6"
                    },
                    {
                        "en": "Word 5-4-7",
                        "ar": "كلمة 5-4-7"
                    },
                    {
                        "en": "Word 5-4-8",
                        "ar": "كلمة 5-4-8"
                    },
                    {
                        "en": "Word 5-4-9",
                        "ar": "كلمة 5-4-9"
                    },
                    {
                        "en": "Word 5-4-10",
                        "ar": "كلمة 5-4-10"
                    }
                ],
                "exercises": [
                    {
                        "question": {
                            "en": "What did you learn in lesson 4?",
                            "ar": "ماذا تعلمت في الدرس 4؟"
                        },
                        "options": {
                            "en": [
                                "A lot",
                                "Nothing"
                            ],
                            "ar": [
                                "الكثير",
                                "لا شيء"
                            ]
                        },
                        "answer": 0
                    },
                    {
                        "question": {
                            "en": "Which of the following is correct?",
                            "ar": "أي مما يلي صحيح؟"
                        },
                        "options": {
                            "en": [
                                "Option A",
                                "Option B",
                                "Option C"
                            ],
                            "ar": [
                                "الخيار أ",
                                "الخيار ب",
                                "الخيار ج"
                            ]
                        },
                        "answer": 1
                    }
                ]
            },
            {
                "id": 5,
                "title": {
                    "en": "Listening Best Practices",
                    "ar": "أفضل ممارسات الاستماع"
                },
                "duration": "18:00",
                "vocab": [
                    {
                        "en": "Word 5-5-1",
                        "ar": "كلمة 5-5-1"
                    },
                    {
                        "en": "Word 5-5-2",
                        "ar": "كلمة 5-5-2"
                    },
                    {
                        "en": "Word 5-5-3",
                        "ar": "كلمة 5-5-3"
                    },
                    {
                        "en": "Word 5-5-4",
                        "ar": "كلمة 5-5-4"
                    },
                    {
                        "en": "Word 5-5-5",
                        "ar": "كلمة 5-5-5"
                    },
                    {
                        "en": "Word 5-5-6",
                        "ar": "كلمة 5-5-6"
                    },
                    {
                        "en": "Word 5-5-7",
                        "ar": "كلمة 5-5-7"
                    },
                    {
                        "en": "Word 5-5-8",
                        "ar": "كلمة 5-5-8"
                    },
                    {
                        "en": "Word 5-5-9",
                        "ar": "كلمة 5-5-9"
                    },
                    {
                        "en": "Word 5-5-10",
                        "ar": "كلمة 5-5-10"
                    }
                ],
                "exercises": [
                    {
                        "question": {
                            "en": "What did you learn in lesson 5?",
                            "ar": "ماذا تعلمت في الدرس 5؟"
                        },
                        "options": {
                            "en": [
                                "A lot",
                                "Nothing"
                            ],
                            "ar": [
                                "الكثير",
                                "لا شيء"
                            ]
                        },
                        "answer": 0
                    },
                    {
                        "question": {
                            "en": "Which of the following is correct?",
                            "ar": "أي مما يلي صحيح؟"
                        },
                        "options": {
                            "en": [
                                "Option A",
                                "Option B",
                                "Option C"
                            ],
                            "ar": [
                                "الخيار أ",
                                "الخيار ب",
                                "الخيار ج"
                            ]
                        },
                        "answer": 1
                    }
                ]
            },
            {
                "id": 6,
                "title": {
                    "en": "Reading Comprehension",
                    "ar": "فهم المقروء"
                },
                "duration": "20:00",
                "vocab": [
                    {
                        "en": "Word 5-6-1",
                        "ar": "كلمة 5-6-1"
                    },
                    {
                        "en": "Word 5-6-2",
                        "ar": "كلمة 5-6-2"
                    },
                    {
                        "en": "Word 5-6-3",
                        "ar": "كلمة 5-6-3"
                    },
                    {
                        "en": "Word 5-6-4",
                        "ar": "كلمة 5-6-4"
                    },
                    {
                        "en": "Word 5-6-5",
                        "ar": "كلمة 5-6-5"
                    },
                    {
                        "en": "Word 5-6-6",
                        "ar": "كلمة 5-6-6"
                    },
                    {
                        "en": "Word 5-6-7",
                        "ar": "كلمة 5-6-7"
                    },
                    {
                        "en": "Word 5-6-8",
                        "ar": "كلمة 5-6-8"
                    },
                    {
                        "en": "Word 5-6-9",
                        "ar": "كلمة 5-6-9"
                    },
                    {
                        "en": "Word 5-6-10",
                        "ar": "كلمة 5-6-10"
                    }
                ],
                "exercises": [
                    {
                        "question": {
                            "en": "What did you learn in lesson 6?",
                            "ar": "ماذا تعلمت في الدرس 6؟"
                        },
                        "options": {
                            "en": [
                                "A lot",
                                "Nothing"
                            ],
                            "ar": [
                                "الكثير",
                                "لا شيء"
                            ]
                        },
                        "answer": 0
                    },
                    {
                        "question": {
                            "en": "Which of the following is correct?",
                            "ar": "أي مما يلي صحيح؟"
                        },
                        "options": {
                            "en": [
                                "Option A",
                                "Option B",
                                "Option C"
                            ],
                            "ar": [
                                "الخيار أ",
                                "الخيار ب",
                                "الخيار ج"
                            ]
                        },
                        "answer": 1
                    }
                ]
            }
        ]
    },
    {
        "id": "acad-1",
        "name": {
            "en": "Academic Writing Excellence",
            "ar": "التميز في الكتابة الأكاديمية"
        },
        "level": {
            "en": "Advanced",
            "ar": "متقدم"
        },
        "category": {
            "en": "Writing",
            "ar": "كتابة"
        },
        "icon": "✍️",
        "color": "#54a0ff",
        "videoUrl": "https://www.youtube.com/embed/pSj7S9Wp17A",
        "lessons": [
            {
                "id": 1,
                "title": {
                    "en": "Academic Essay Structure",
                    "ar": "هيكل المقال الأكاديمي"
                },
                "duration": "10:00",
                "vocab": [
                    {
                        "en": "Word 6-1-1",
                        "ar": "كلمة 6-1-1"
                    },
                    {
                        "en": "Word 6-1-2",
                        "ar": "كلمة 6-1-2"
                    },
                    {
                        "en": "Word 6-1-3",
                        "ar": "كلمة 6-1-3"
                    },
                    {
                        "en": "Word 6-1-4",
                        "ar": "كلمة 6-1-4"
                    },
                    {
                        "en": "Word 6-1-5",
                        "ar": "كلمة 6-1-5"
                    },
                    {
                        "en": "Word 6-1-6",
                        "ar": "كلمة 6-1-6"
                    },
                    {
                        "en": "Word 6-1-7",
                        "ar": "كلمة 6-1-7"
                    },
                    {
                        "en": "Word 6-1-8",
                        "ar": "كلمة 6-1-8"
                    },
                    {
                        "en": "Word 6-1-9",
                        "ar": "كلمة 6-1-9"
                    },
                    {
                        "en": "Word 6-1-10",
                        "ar": "كلمة 6-1-10"
                    }
                ],
                "exercises": [
                    {
                        "question": {
                            "en": "What did you learn in lesson 1?",
                            "ar": "ماذا تعلمت في الدرس 1؟"
                        },
                        "options": {
                            "en": [
                                "A lot",
                                "Nothing"
                            ],
                            "ar": [
                                "الكثير",
                                "لا شيء"
                            ]
                        },
                        "answer": 0
                    },
                    {
                        "question": {
                            "en": "Which of the following is correct?",
                            "ar": "أي مما يلي صحيح؟"
                        },
                        "options": {
                            "en": [
                                "Option A",
                                "Option B",
                                "Option C"
                            ],
                            "ar": [
                                "الخيار أ",
                                "الخيار ب",
                                "الخيار ج"
                            ]
                        },
                        "answer": 1
                    }
                ]
            },
            {
                "id": 2,
                "title": {
                    "en": "Citations and Referencing",
                    "ar": "الاقتباسات والمراجع"
                },
                "duration": "12:00",
                "vocab": [
                    {
                        "en": "Word 6-2-1",
                        "ar": "كلمة 6-2-1"
                    },
                    {
                        "en": "Word 6-2-2",
                        "ar": "كلمة 6-2-2"
                    },
                    {
                        "en": "Word 6-2-3",
                        "ar": "كلمة 6-2-3"
                    },
                    {
                        "en": "Word 6-2-4",
                        "ar": "كلمة 6-2-4"
                    },
                    {
                        "en": "Word 6-2-5",
                        "ar": "كلمة 6-2-5"
                    },
                    {
                        "en": "Word 6-2-6",
                        "ar": "كلمة 6-2-6"
                    },
                    {
                        "en": "Word 6-2-7",
                        "ar": "كلمة 6-2-7"
                    },
                    {
                        "en": "Word 6-2-8",
                        "ar": "كلمة 6-2-8"
                    },
                    {
                        "en": "Word 6-2-9",
                        "ar": "كلمة 6-2-9"
                    },
                    {
                        "en": "Word 6-2-10",
                        "ar": "كلمة 6-2-10"
                    }
                ],
                "exercises": [
                    {
                        "question": {
                            "en": "What did you learn in lesson 2?",
                            "ar": "ماذا تعلمت في الدرس 2؟"
                        },
                        "options": {
                            "en": [
                                "A lot",
                                "Nothing"
                            ],
                            "ar": [
                                "الكثير",
                                "لا شيء"
                            ]
                        },
                        "answer": 0
                    },
                    {
                        "question": {
                            "en": "Which of the following is correct?",
                            "ar": "أي مما يلي صحيح؟"
                        },
                        "options": {
                            "en": [
                                "Option A",
                                "Option B",
                                "Option C"
                            ],
                            "ar": [
                                "الخيار أ",
                                "الخيار ب",
                                "الخيار ج"
                            ]
                        },
                        "answer": 1
                    }
                ]
            },
            {
                "id": 3,
                "title": {
                    "en": "Paraphrasing and Summarizing",
                    "ar": "إعادة الصياغة والتلخيص"
                },
                "duration": "14:00",
                "vocab": [
                    {
                        "en": "Word 6-3-1",
                        "ar": "كلمة 6-3-1"
                    },
                    {
                        "en": "Word 6-3-2",
                        "ar": "كلمة 6-3-2"
                    },
                    {
                        "en": "Word 6-3-3",
                        "ar": "كلمة 6-3-3"
                    },
                    {
                        "en": "Word 6-3-4",
                        "ar": "كلمة 6-3-4"
                    },
                    {
                        "en": "Word 6-3-5",
                        "ar": "كلمة 6-3-5"
                    },
                    {
                        "en": "Word 6-3-6",
                        "ar": "كلمة 6-3-6"
                    },
                    {
                        "en": "Word 6-3-7",
                        "ar": "كلمة 6-3-7"
                    },
                    {
                        "en": "Word 6-3-8",
                        "ar": "كلمة 6-3-8"
                    },
                    {
                        "en": "Word 6-3-9",
                        "ar": "كلمة 6-3-9"
                    },
                    {
                        "en": "Word 6-3-10",
                        "ar": "كلمة 6-3-10"
                    }
                ],
                "exercises": [
                    {
                        "question": {
                            "en": "What did you learn in lesson 3?",
                            "ar": "ماذا تعلمت في الدرس 3؟"
                        },
                        "options": {
                            "en": [
                                "A lot",
                                "Nothing"
                            ],
                            "ar": [
                                "الكثير",
                                "لا شيء"
                            ]
                        },
                        "answer": 0
                    },
                    {
                        "question": {
                            "en": "Which of the following is correct?",
                            "ar": "أي مما يلي صحيح؟"
                        },
                        "options": {
                            "en": [
                                "Option A",
                                "Option B",
                                "Option C"
                            ],
                            "ar": [
                                "الخيار أ",
                                "الخيار ب",
                                "الخيار ج"
                            ]
                        },
                        "answer": 1
                    }
                ]
            },
            {
                "id": 4,
                "title": {
                    "en": "Abstract Writing",
                    "ar": "كتابة الملخص"
                },
                "duration": "16:00",
                "vocab": [
                    {
                        "en": "Word 6-4-1",
                        "ar": "كلمة 6-4-1"
                    },
                    {
                        "en": "Word 6-4-2",
                        "ar": "كلمة 6-4-2"
                    },
                    {
                        "en": "Word 6-4-3",
                        "ar": "كلمة 6-4-3"
                    },
                    {
                        "en": "Word 6-4-4",
                        "ar": "كلمة 6-4-4"
                    },
                    {
                        "en": "Word 6-4-5",
                        "ar": "كلمة 6-4-5"
                    },
                    {
                        "en": "Word 6-4-6",
                        "ar": "كلمة 6-4-6"
                    },
                    {
                        "en": "Word 6-4-7",
                        "ar": "كلمة 6-4-7"
                    },
                    {
                        "en": "Word 6-4-8",
                        "ar": "كلمة 6-4-8"
                    },
                    {
                        "en": "Word 6-4-9",
                        "ar": "كلمة 6-4-9"
                    },
                    {
                        "en": "Word 6-4-10",
                        "ar": "كلمة 6-4-10"
                    }
                ],
                "exercises": [
                    {
                        "question": {
                            "en": "What did you learn in lesson 4?",
                            "ar": "ماذا تعلمت في الدرس 4؟"
                        },
                        "options": {
                            "en": [
                                "A lot",
                                "Nothing"
                            ],
                            "ar": [
                                "الكثير",
                                "لا شيء"
                            ]
                        },
                        "answer": 0
                    },
                    {
                        "question": {
                            "en": "Which of the following is correct?",
                            "ar": "أي مما يلي صحيح؟"
                        },
                        "options": {
                            "en": [
                                "Option A",
                                "Option B",
                                "Option C"
                            ],
                            "ar": [
                                "الخيار أ",
                                "الخيار ب",
                                "الخيار ج"
                            ]
                        },
                        "answer": 1
                    }
                ]
            },
            {
                "id": 5,
                "title": {
                    "en": "Research Publishing",
                    "ar": "نشر الأبحاث"
                },
                "duration": "18:00",
                "vocab": [
                    {
                        "en": "Word 6-5-1",
                        "ar": "كلمة 6-5-1"
                    },
                    {
                        "en": "Word 6-5-2",
                        "ar": "كلمة 6-5-2"
                    },
                    {
                        "en": "Word 6-5-3",
                        "ar": "كلمة 6-5-3"
                    },
                    {
                        "en": "Word 6-5-4",
                        "ar": "كلمة 6-5-4"
                    },
                    {
                        "en": "Word 6-5-5",
                        "ar": "كلمة 6-5-5"
                    },
                    {
                        "en": "Word 6-5-6",
                        "ar": "كلمة 6-5-6"
                    },
                    {
                        "en": "Word 6-5-7",
                        "ar": "كلمة 6-5-7"
                    },
                    {
                        "en": "Word 6-5-8",
                        "ar": "كلمة 6-5-8"
                    },
                    {
                        "en": "Word 6-5-9",
                        "ar": "كلمة 6-5-9"
                    },
                    {
                        "en": "Word 6-5-10",
                        "ar": "كلمة 6-5-10"
                    }
                ],
                "exercises": [
                    {
                        "question": {
                            "en": "What did you learn in lesson 5?",
                            "ar": "ماذا تعلمت في الدرس 5؟"
                        },
                        "options": {
                            "en": [
                                "A lot",
                                "Nothing"
                            ],
                            "ar": [
                                "الكثير",
                                "لا شيء"
                            ]
                        },
                        "answer": 0
                    },
                    {
                        "question": {
                            "en": "Which of the following is correct?",
                            "ar": "أي مما يلي صحيح؟"
                        },
                        "options": {
                            "en": [
                                "Option A",
                                "Option B",
                                "Option C"
                            ],
                            "ar": [
                                "الخيار أ",
                                "الخيار ب",
                                "الخيار ج"
                            ]
                        },
                        "answer": 1
                    }
                ]
            }
        ]
    }
];

let COURSE_POOL = JSON.parse(localStorage.getItem('admin_courses')) || DEFAULT_COURSE_POOL;

async function syncGlobalCourses() {
    try {
        const res = await fetch('/api/courses');
        const data = await res.json();
        if (data.success && data.courses && data.courses.length > 0) {
            COURSE_POOL = data.courses.map(c => ({
                ...c,
                id: c.id,
                videoUrl: c.video_url,
                lessons: (c.lessons || []).map(l => ({
                    ...l,
                    videoUrl: l.video_url
                }))
            }));
            return true;
        }
    } catch (e) { console.warn("Live courses unavailable"); }
    return false;
}


// ===== CORE INITIALIZATION =====
document.addEventListener('DOMContentLoaded', async () => {
    initTheme();
    initLanguage();
    initNavbar();
    initScrollReveal();
    initParticles();

    // Fetch from Supabase before rendering
    await syncGlobalCourses();
    
    // Page-specific initializers
    if (document.getElementById('activeCoursesContainer')) initDashboard();
    if (document.getElementById('coursesGrid')) initCourses();
    if (document.getElementById('vocabularyGrid')) initVocabularyPage();
    if (document.getElementById('myCoursesGrid')) initMyCoursesPage();
    
    initAIAssistant();
    checkAuth();
    initSessionClock();
    updateLastUpdated();


    // Global Modal Click Background Close
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            closeModal(e.target.id);
        }
    });

    // Learning Time Increment
    setInterval(() => {
        let totalMin = parseFloat(localStorage.getItem('lingowise_total_min') || "0");
        totalMin += 1;
        localStorage.setItem('lingowise_total_min', totalMin);
        
        // Track Today's Minutes
        const today = new Date().toISOString().split('T')[0];
        const savedDate = localStorage.getItem('lingowise_today_date');
        let todayMin = parseFloat(localStorage.getItem('lingowise_today_min') || "0");
        
        if (savedDate !== today) {
            todayMin = 1;
            localStorage.setItem('lingowise_today_date', today);
        } else {
            todayMin += 1;
        }
        localStorage.setItem('lingowise_today_min', todayMin);

        const timeEl = document.getElementById('learningTime');
        const hrsUnit = translations['unit-hrs'] ? translations['unit-hrs'][lang] : 'hrs';
        if (timeEl) timeEl.innerText = (totalMin / 60).toFixed(1) + " " + hrsUnit;
        
        // Update subtext if possible
        const subEl = document.querySelector('[data-i18n="dash-stat-time-sub"]');
        if (subEl) {
            const displayMin = todayMin < 60 ? `${todayMin}m` : `${(todayMin/60).toFixed(1)}h`;
            subEl.innerText = `↑ ${displayMin} ${translations['dash-stat-time-sub'][lang]}`;
        }
    }, 60000);


});

// ===== CORE UTILITIES =====
function initTheme() {
    const saved = localStorage.getItem('lingowise_theme') || 'dark';
    applyTheme(saved);
}

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('lingowise_theme', theme);
    document.querySelectorAll('.theme-toggle i, .floating-toggles .theme-icon').forEach(icon => {
        // Simplified theme icon handling
    });
}
function toggleTheme(theme) { applyTheme(theme); }

function initLanguage() {
    const saved = localStorage.getItem('lingowise_lang') || 'ar';
    applyLanguage(saved);
}

function applyLanguage(newLang) {
    lang = newLang;
    localStorage.setItem('lingowise_lang', lang);
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', lang);

    document.querySelectorAll('.lang-toggle .toggle-option').forEach(opt => {
        opt.classList.toggle('active', opt.dataset.value === lang);
    });

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[key] && translations[key][lang]) {
            if (translations[key][lang].includes('<')) el.innerHTML = translations[key][lang];
            else el.textContent = translations[key][lang];
        }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (translations[key] && translations[key][lang]) el.placeholder = translations[key][lang];
    });

    document.querySelectorAll('[data-i18n-title]').forEach(el => {
        const key = el.getAttribute('data-i18n-title');
        if (translations[key] && translations[key][lang]) el.title = translations[key][lang];
    });

    if (typeof updateAIAssistant === 'function') updateAIAssistant();
}
function toggleLanguage(l) { applyLanguage(l); }

function handleSignup(e) {
    e.preventDefault();
    const first = document.getElementById('signup-first').value;
    const last = document.getElementById('signup-last').value;
    const email = document.getElementById('signup-email').value;
    const pass = document.getElementById('signup-password').value;
    const confirm = document.getElementById('signup-confirm').value;

    if (pass !== confirm) {
        showToast('error', translations['auth-error-match'][lang]);
        return;
    }

    // Simulate account creation
    const user = { firstName: first, lastName: last, email: email };
    localStorage.setItem('lingowise_user', JSON.stringify(user));
    localStorage.setItem('lingowise_logged_in', 'true');
    localStorage.setItem('lingowise_token', 'simulated-jwt-token');

    showToast('success', translations['auth-success-signup'][lang]);
    setTimeout(() => window.location.href = 'dashboard.html', 1500);
}

function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const pass = document.getElementById('login-password').value;

    // Simulate login logic - just accept any valid looking email for demo
    if (email && pass.length >= 8) {
        const existingUser = JSON.parse(localStorage.getItem('lingowise_user') || '{}');
        const user = { 
            firstName: existingUser.firstName || 'Learner', 
            lastName: existingUser.lastName || '', 
            email: email 
        };
        
        localStorage.setItem('lingowise_user', JSON.stringify(user));
        localStorage.setItem('lingowise_logged_in', 'true');
        localStorage.setItem('lingowise_token', 'simulated-jwt-token');
        
        showToast('success', translations['auth-success-login'][lang]);
        setTimeout(() => window.location.href = 'dashboard.html', 1500);
    } else {
        showToast('error', translations['auth-error-invalid'][lang]);
    }
}

function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
}

function toggleMobileMenu() {
    const navLinks = document.getElementById('navLinks');
    if (navLinks) navLinks.classList.toggle('mobile-open');
}

function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    reveals.forEach(el => observer.observe(el));
}

function initParticles() {
    const container = document.getElementById('heroParticles');
    if (!container) return;
    container.innerHTML = '';
    for (let i = 0; i < 30; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.left = Math.random() * 100 + '%';
        p.style.animationDuration = (6 + Math.random() * 6) + 's';
        container.appendChild(p);
    }
}

function showToast(type, message) {
    let container = document.getElementById('toastContainer');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        container.id = 'toastContainer';
        document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    const icons = { success: '✅', error: '❌', warning: '⚠️' };
    toast.innerHTML = `<span>${icons[type] || '📢'}</span> ${message}`;
    container.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

function openModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.classList.add('active');
}

function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.classList.remove('active');
        if (id === 'videoPlayerModal') {
            const iframe = modal.querySelector('iframe');
            if (iframe) iframe.src = '';
        }
    }
}

function checkAuth() {
    const isLoggedIn = localStorage.getItem('lingowise_logged_in') === 'true';
    const href = window.location.href;
    const isPrivatePage = href.includes('dashboard.html') || 
                          href.includes('my-courses.html') || 
                          href.includes('vocabulary.html') || 
                          href.includes('speaking-lab.html');

    
    if (isPrivatePage && !isLoggedIn) {

        window.location.replace('login.html');
        return;
    }
    updateAuthUI();
}


function handleLogout() {
    localStorage.removeItem('lingowise_logged_in');
    localStorage.removeItem('lingowise_token');
    localStorage.removeItem('lingowise_user');
    window.location.href = 'index.html';
}

function updateAuthUI() {
    const authContainer = document.getElementById('auth-container');
    const isLoggedIn = localStorage.getItem('lingowise_logged_in') === 'true';
    const user = JSON.parse(localStorage.getItem('lingowise_user') || '{}');
    const lang = localStorage.getItem('lingowise_lang') || 'en';

    if (authContainer) {
        if (isLoggedIn && user.firstName) {
            authContainer.innerHTML = `
                <div style="display:flex; align-items:center; gap:12px;">
                    <a href="dashboard.html" style="font-weight:600; font-size:0.9rem; color:var(--primary-light); text-decoration:none;">${translations['nav-welcome'][lang]}, ${user.firstName}</a>
                    <button class="btn btn-ghost btn-sm" onclick="handleLogout()">${translations['nav-logout'][lang]}</button>
                </div>
            `;
        } else {
            authContainer.innerHTML = `
                <a href="login.html" class="btn btn-ghost btn-sm" data-i18n="nav-login">${translations['nav-login'][lang]}</a>
                <a href="signup.html" class="btn btn-primary btn-sm" data-i18n="nav-get-started">${translations['nav-get-started'][lang]}</a>
            `;
        }
    }
}

function initSessionClock() {
    const clock = document.getElementById('sessionClock');
    if (!clock) return;
    let sec = 0;
    setInterval(() => {
        sec++;
        const h = Math.floor(sec / 3600);
        const m = Math.floor((sec % 3600) / 60);
        const s = sec % 60;
        clock.innerText = `${h.toString().padStart(2,'0')}:${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
    }, 1000);
}

function updateLastUpdated() {
    const el = document.getElementById('lastUpdated');
    if (el) el.textContent = new Date().toLocaleString();
}

// ===== TRANSLATIONS =====
const translations = {
    'nav-home': { en: 'Home', ar: 'الرئيسية' },
    'nav-courses': { en: 'Courses', ar: 'الدورات' },
    'nav-blog': { en: 'Blog', ar: 'المدونة' },
    'nav-community': { en: 'Community', ar: 'المجتمع' },
    'nav-login': { en: 'Log In', ar: 'تسجيل الدخول' },
    'nav-get-started': { en: 'Get Started', ar: 'ابدأ الآن' },
    'nav-signup': { en: 'Sign Up', ar: 'إنشاء حساب' },
    'nav-logout': { en: 'Logout', ar: 'تسجيل الخروج' },
    'nav-welcome': { en: 'Welcome', ar: 'مرحباً' },
    'sidebar-dashboard': { en: 'Dashboard', ar: 'لوحة التحكم' },
    'sidebar-courses': { en: 'My Courses', ar: 'دوراتي' },
    'sidebar-vocabulary': { en: 'Vocabulary Bank', ar: 'بنك المفردات' },
    'sidebar-speaking': { en: 'AI Speaking Lab', ar: 'مختبر التحدث' },
    'sidebar-grammar': { en: 'Grammar Guide', ar: 'دليل القواعد' },
    
    'hero-badge': { en: 'New: AI Conversation Practice Now Live!', ar: 'جديد: ممارسة المحادثة متاحة الآن!' },
    'hero-title-1': { en: 'Unlock Your Potential', ar: 'أطلق العنان لإمكانياتك' },
    'hero-title-2': { en: 'English', ar: 'اللغة الإنجليزية' },
    'hero-title-3': { en: 'Mastery Awaits', ar: 'في انتظارك' },
    'hero-desc': { en: 'Master English with interactive courses, real-time progress tracking, and personalized learning paths.', ar: 'أتقن الإنجليزية من خلال دورات تفاعلية وتتبع التقدم في الوقت الفعلي ومسارات تعلم مخصصة.' },
    'hero-cta-1': { en: 'Start Learning for Free →', ar: 'ابدأ التعلم مجاناً ←' },
    'hero-cta-2': { en: 'View Courses', ar: 'عرض الدورات' },
    
    'levels-title-1': { en: 'Choose Your', ar: 'اختر' },
    'levels-title-2': { en: 'Learning Level', ar: 'مستوى التعلم' },
    'levels-desc': { en: 'From beginner to professional, we have a path for every learner.', ar: 'من المبتدئ إلى المحترف، لدينا مسار لكل متعلم.' },
    
    'dash-hi': { en: 'Hi', ar: 'مرحباً' },
    'dash-welcome': { en: 'Good morning,', ar: 'صباح الخير،' },

    'dash-learning-time': { en: 'Learning Time ⏱️', ar: 'وقت التعلم ⏱️' },
    'dash-courses-done': { en: 'Courses Completed 🏆', ar: 'الدورات المكتملة 🏆' },
    'dash-vocab-mastery': { en: 'Vocab Mastery 🔤', ar: 'إتقان المفردات 🔤' },
    'dash-speaking-score': { en: 'Speaking Score 🎙️', ar: 'درجة التحدث 🎙️' },



    'dash-active-courses': { en: 'Current Courses', ar: 'الدورات الحالية' },
    'dash-daily-goals': { en: 'Daily Learning Goals', ar: 'أهداف التعلم اليومية' },
    'dash-recent-vocab': { en: 'Recently Learned Words', ar: 'كلمات تعلمتها مؤخراً' },
    
    'course-enroll': { en: 'Start Lesson', ar: 'ابدأ الدرس' },
    'course-details': { en: 'Course Details', ar: 'تفاصيل الدورة' },
    'course-lessons': { en: 'Lessons', ar: 'الدروس' },
    'course-resume': { en: 'Resume Course', ar: 'متابعة الدورة' },
    'course-watch-again': { en: 'Watch Again', ar: 'شاهد مجدداً' },
    'course-status-in-progress': { en: 'In Progress', ar: 'قيد التنفيذ' },
    'course-status-completed': { en: 'Completed', ar: 'مكتمل' },
    
    'vocab-add-btn': { en: '+ Add Word', ar: '+ إضافة كلمة' },
    'vocab-empty': { en: 'Your vocabulary bank is empty.', ar: 'بنك المفردات الخاص بك فارغ.' },
    'vocab-search-ph': { en: 'Search words...', ar: 'ابحث عن كلمات...' },
    
    'ai-name': { en: 'LingoWise AI', ar: 'مساعد لينغو وايز' },
    'ai-status': { en: '● Online · Language Tutor', ar: '● متصل · معلم لغة' },
    'ai-greeting': { en: "👋 Hi! I'm your AI Tutor. Ask me about grammar, words, or practice!", ar: '👋 مرحباً! أنا معلمك الذكي. اسألني عن القواعد أو الكلمات أو مارس اللغة!' },
    'ai-placeholder': { en: 'Ask anything...', ar: 'اسأل أي شيء...' },
    'ai-quick-grammar': { en: '📝 Grammar', ar: '📝 القواعد' },
    'ai-quick-tip': { en: '💡 Study Tip', ar: '💡 نصيحة' },
    'ai-quick-speak': { en: '🎙️ Speak', ar: '🎙️ تحدث' },

    'speaking-listening': { en: 'Listening...', ar: 'جاري الاستماع...' },
    'speaking-analyzing': { en: 'Analyzing...', ar: 'جاري التحليل...' },
    'speaking-complete': { en: 'Analysis Complete!', ar: 'اكتمل التحليل!' },
    'speaking-ready': { en: 'Ready to practice? Click the button.', ar: 'جاهز للممارسة؟ اضغط على الزر.' },
    'speaking-transcript-hint': { en: 'Your speech will appear here...', ar: 'سيظهر كلامك هنا...' },
    'speaking-hold': { en: 'Hold button to speak', ar: 'استمر في الضغط للتحدث' },
    'speaking-live-feedback': { en: 'Live Feedback', ar: 'تقييم فوري' },
    // Home Page Additions
    'level-beginner-title': { en: 'Beginner (A1-A2)', ar: 'مستوى مبتدئ (A1-A2)' },
    'level-beginner-desc': { en: 'Build a strong foundation with essential vocabulary and basic grammar.', ar: 'ابنِ أساساً قوياً مع المفردات الأساسية والقواعد البسيطة.' },
    'level-intermediate-title': { en: 'Intermediate (B1-B2)', ar: 'مستوى متوسط (B1-B2)' },
    'level-intermediate-desc': { en: 'Expand your fluency and engage in sophisticated discussions.', ar: 'وسع طلاقتك وشارك في نقاشات أكثر تعقيداً.' },
    'level-advanced-title': { en: 'Advanced (C1-C2)', ar: 'مستوى متقدم (C1-C2)' },
    'level-advanced-desc': { en: 'Refine your nuances and master academic English.', ar: 'أتقن الفروق الدقيقة واللغة الأكاديمية.' },
    'level-business-title': { en: 'Business English', ar: 'الإنجليزية للأعمال' },
    'level-business-desc': { en: 'Professional communication and technical terminology for your career.', ar: 'التواصل المهني والمصطلحات التقنية لمسارك الوظيفي.' },
    'footer-tagline': { en: 'Your all-in-one English language learning platform.', ar: 'منصتك الشاملة لتعلم اللغة الإنجليزية.' },
    'footer-copyright': { en: '© 2026 LingoWise. All rights reserved.', ar: '© 2026 لينغو وايز. جميع الحقوق محفوظة.' },
    'footer-learning': { en: 'Learning Hub', ar: 'مركز التعلم' },
    'footer-resources': { en: 'Resources', ar: 'المصادر' },
    'footer-legal': { en: 'Legal', ar: 'قانوني' },
    'footer-privacy': { en: 'Privacy Policy', ar: 'سياسة الخصوصية' },
    'footer-terms': { en: 'Terms of Service', ar: 'شروط الخدمة' },
    'footer-contact': { en: 'Contact Us', ar: 'تواصل معنا' },
    'footer-blog': { en: 'Blog', ar: 'المدونة' },
    'footer-about': { en: 'About Us', ar: 'من نحن' },
    'stats-title-1': { en: 'Achieve', ar: 'حقق' },
    'stats-title-2': { en: 'Global Excellence', ar: 'التميز العالمي' },

    'stats-desc': { en: 'Empowering learners from every corner of the world.', ar: 'تمكين المتعلمين من كل ركن في العالم.' },
    'features-title-1': { en: 'Why Choose', ar: 'لماذا تختار' },
    'features-title-2': { en: 'LingoWise', ar: 'لينغو وايز' },
    'features-desc': { en: 'Innovative tools designed to make language learning effective and fun', ar: 'أدوات مبتكرة مصممة لجعل تعلم اللغة فعالاً وممتعاً' },

    'tools-section-title-1': { en: 'Powerful', ar: 'أدوات' },
    'tools-section-title-2': { en: 'Learning Tools', ar: 'تعلم قوية' },
    'tools-section-desc': { en: 'Free tools to help you master vocabulary, grammar, and speaking skills', ar: 'أدوات مجانية لمساعدتك على إتقان المفردات والقواعد ومهارات التحدث' },
    'feature-1-title': { en: 'AI Speaking Lab ⚡', ar: 'مختبر التحدث الذكي ⚡' },
    'feature-1-desc': { en: 'Practice real conversations with our AI tutor and get instant feedback on pronunciation.', ar: 'مارس محادثات حقيقية مع مدرسنا الذكي واحصل على تعليقات فورية على نطقك.' },
    'feature-2-title': { en: 'Progress Trackers 🎓', ar: 'تتبع التقدم 🎓' },
    'feature-2-desc': { en: 'Visualize your growth with detailed analytics for vocabulary, grammar, and fluency.', ar: 'تصور نموك مع تحليلات مفصلة للمفردات والقواعد والطلاقة.' },
    'feature-3-title': { en: 'Active Recall ✨', ar: 'الاسترجاع النشط ✨' },
    'feature-3-desc': { en: 'Spaced repetition system (SRS) for long-term vocabulary retention and mastery.', ar: 'نظام التكرار المتباعد (SRS) لترسيخ المفردات وإتقانها على المدى الطويل.' },
    'feature-5-title': { en: 'Certified Courses 🔐', ar: 'دورات معتمدة 🔐' },
    'feature-5-desc': { en: 'Pathways aligned with CEFR standards (A1 to C2) to help you achieve your goals.', ar: 'مسارات متوافقة مع معايير CEFR (A1 إلى C2) لمساعدتك في تحقيق أهدافك.' },
    'feature-6-title': { en: 'Multi-Device Learning 🌍', ar: 'تعلم عبر أجهزة متعددة 🌍' },
    'feature-6-desc': { en: 'Learn on the go. Sync your progress across desktop, tablet, and mobile devices.', ar: 'تعلم في أي مكان. زامن تقدمك عبر الكمبيوتر والجهاز اللوحي والهاتف.' },

    
    // Blog Page
    'blog-section-title-1': { en: 'Latest from the', ar: 'أحدث المقالات في' },
    'blog-section-title-2': { en: 'Learning Blog', ar: 'مدونة التعلم' },
    'blog-section-desc': { en: 'Language tips, study strategies, and expert advice', ar: 'نصائح لغوية، استراتيجيات دراسية، ونصائح من الخبراء' },
    'blog-hero-title': { en: 'Learning Blog', ar: 'مدونة التعلم' },
    'blog-hero-sub': { en: 'Expert language tips, study strategies, and guides.', ar: 'نصائح لغوية من الخبراء، استراتيجيات دراسية، وأدلة.' },
    'filter-all': { en: 'All', ar: 'الكل' },
    'filter-grammar': { en: 'Grammar', ar: 'القواعد' },
    'filter-education': { en: 'Study Tips', ar: 'نصائح دراسية' },
    'filter-tools': { en: 'Learning Tools', ar: 'أدوات التعلم' },
    'blog-read-5m': { en: '5 min read', ar: 'قراءة ٥ دقائق' },
    'blog-read-6m': { en: '6 min read', ar: 'قراءة ٦ دقائق' },
    'blog-read-7m': { en: '7 min read', ar: 'قراءة ٧ دقائق' },

    'blog-newsletter-title-1': { en: 'Stay', ar: 'ابقَ' },
    'blog-newsletter-title-2': { en: 'Informed', ar: 'على اطلاع' },
    'blog-newsletter-desc': { en: 'Get weekly language learning tips delivered to your inbox.', ar: 'احصل على نصائح تعلم اللغة أسبوعياً في بريدك الوارد.' },
    'blog-subscribe': { en: 'Subscribe', ar: 'اشترك الآن' },
    
    // Blog Cards
    'blog-card-1-title': { en: 'Top 10 Phrasal Verbs for Business', ar: 'أهم 10 أفعال مركبة للأعمال' },
    'blog-card-1-desc': { en: 'Master common expressions in professional settings.', ar: 'أتقن التعبيرات الشائعة في الأماكن المهنية.' },
    'blog-card-2-title': { en: 'IELTS Preparation Guide 2026', ar: 'دليل التحضير لـ IELTS 2026' },
    'blog-card-2-desc': { en: 'Expert strategies for a higher score on your first try.', ar: 'استراتيجيات الخبراء للحصول على درجة أعلى من المحاولة الأولى.' },
    'blog-card-3-title': { en: 'Mastering Pronunciation', ar: 'إتقان النطق' },
    'blog-card-3-desc': { en: 'Techniques used by native speakers for clear speech.', ar: 'تقنيات يستخدمها المتحدثون الأصليون للتحدث بوضوح.' },
    'blog-card-8-title': { en: 'Mastering English Fluency: Tips for Busy Professionals 🚀', ar: 'إتقان الطلاقة الإنجليزية: نصائح للمحترفين المشغولين 🚀' },
    'blog-card-8-desc': { en: 'How to integrate language learning into your daily routine effectively. 📈', ar: 'كيفية دمج تعلم اللغة في روتينك اليومي بفعالية. 📈' },
    'blog-card-9-title': { en: 'Common Grammar Pitfalls and How to Avoid Them', ar: 'أخطاء القواعد الشائعة وكيفية تجنبها' },
    'blog-card-9-desc': { en: 'Mastering complex tenses and nuances of modern English communication.', ar: 'إتقان الأزمنة المعقدة والفروق الدقيقة في التواصل بالإنجليزية الحديثة.' },
    'blog-card-10-title': { en: 'The Power of Spaced Repetition for Vocabulary Mastery 🔱', ar: 'قوة التكرار المتباعد لإتقان المفردات 🔱' },
    'blog-card-10-desc': { en: 'Why consistency matters more than intensity and how LingoWise can help.', ar: 'لماذا تهم الاستمرارية أكثر من الكثافة وكيف يمكن للينغو وايز المساعدة.' },

    'blog-view-all': { en: 'View All Articles →', ar: 'عرض جميع المقالات ←' },
    'blog-date-1': { en: 'Mar 8, 2026', ar: '٨ مارس ٢٠٢٦' },
    'blog-date-2': { en: 'Mar 6, 2026', ar: '٦ مارس ٢٠٢٦' },
    'blog-date-6': { en: 'Mar 4, 2026', ar: '٤ مارس ٢٠٢٦' },
    'blog-date-8': { en: 'Feb 25, 2026', ar: '٢٥ فبراير ٢٠٢٦' },
    'blog-date-9': { en: 'Feb 22, 2026', ar: '٢٢ فبراير ٢٠٢٦' },
    'blog-date-10': { en: 'Feb 20, 2026', ar: '٢٠ فبراير ٢٠٢٦' },

    'auth-email': { en: 'Email Address', ar: 'البريد الإلكتروني' },
    'auth-welcome': { en: 'Welcome Back', ar: 'مرحباً بعودتك' },
    'auth-login-desc': { en: 'Access your learning progress.', ar: 'الوصول إلى تقدمك في التعلم.' },
    'auth-or-signup': { en: 'or sign up with email', ar: 'أو سجل عبر البريد الإلكتروني' },
    'auth-or-email': { en: 'or continue with email', ar: 'أو استمر عبر البريد الإلكتروني' },
    'auth-first-name': { en: 'First Name', ar: 'الاسم الأول' },
    'auth-last-name': { en: 'Last Name', ar: 'الاسم الأخير' },
    'auth-first-ph': { en: 'John', ar: 'فلان' },
    'auth-last-ph': { en: 'Doe', ar: 'الفلاني' },
    'auth-email-ph': { en: 'you@example.com', ar: 'you@example.com' },
    'auth-password': { en: 'Password', ar: 'كلمة المرور' },
    'auth-confirm': { en: 'Confirm Password', ar: 'تأكيد كلمة المرور' },
    'auth-password-ph': { en: 'Min. 8 characters', ar: '٨ أحرف على الأقل' },
    'auth-password-ph-login': { en: '••••••••', ar: '••••••••' },
    'auth-confirm-ph': { en: 'Re-enter password', ar: 'أعد إدخال كلمة المرور' },
    'auth-remember': { en: 'Remember me for 30 days', ar: 'تذكرني لمدة ٣٠ يوم' },
    'auth-forgot': { en: 'Forgot password?', ar: 'نسيت كلمة المرور؟' },
    'auth-terms': { en: 'I agree to the', ar: 'أوافق على' },
    'auth-tos': { en: 'Terms of Service', ar: 'شروط الخدمة' },
    'auth-privacy': { en: 'Privacy Policy', ar: 'سياسة الخصوصية' },
    'auth-create-title': { en: 'Create Your Account ✨', ar: 'أنشئ حسابك ✨' },
    'auth-create-desc': { en: 'Start your learning journey today — 100% free. 🚀', ar: 'ابدأ رحلة تعلمك اليوم - مجاناً ١٠٠٪. 🚀' },
    'auth-create-btn': { en: 'Create Free Account', ar: 'إنشاء حساب مجاني' },
    'auth-login-btn': { en: 'Log In', ar: 'تسجيل الدخول' },
    'auth-has-account': { en: 'Already have an account?', ar: 'لديك حساب بالفعل؟' },
    'auth-login-link': { en: 'Log in', ar: 'تسجيل الدخول' },
    'auth-no-account': { en: "Don't have an account?", ar: 'ليس لديك حساب؟' },
    'auth-signup-link': { en: 'Sign up free', ar: 'سجل مجاناً' },
    'auth-social-google': { en: 'Google', ar: 'جوجل' },
    'auth-social-apple': { en: 'Apple', ar: 'آبل' },
    'auth-social-twitter': { en: 'Twitter', ar: 'تويتر' },
    'auth-logo-text': { en: 'LingoWise', ar: 'لينغو وايز' },

    // About Page
    'about-title': { en: 'Empowering Your Language Future', ar: 'تمكين مستقبلك اللغوي' },
    'about-subtitle': { en: 'Professional tools, 100% free.', ar: 'أدوات احترافية، مجانية ١٠٠٪.' },
    'about-mission-title': { en: 'Our Mission', ar: 'مهمتنا' },
    'value-transparency-title': { en: 'Accessibility', ar: 'سهولة الوصول' },
    'value-speed-title': { en: 'Innovation', ar: 'الابتكار' },
    'value-reliability-title': { en: 'Accessibility', ar: 'سهولة الوصول' },
    'footer-learning': { en: 'Learning Hub', ar: 'مركز التعلم' },




    // Contact & Misc
    'contact-title': { en: 'Get in Touch', ar: 'تواصل معنا' },
    'contact-subtitle': { en: "Have questions? We're here to help you on your learning journey.", ar: 'لديك أسئلة؟ نحن هنا لمساعدتك في رحلة تعلمك.' },
    'contact-send': { en: 'Send Message', ar: 'إرسال الرسالة' },
    'contact-name': { en: 'Your Name', ar: 'اسمك' },
    'contact-msg': { en: 'Your Message', ar: 'رسالتك' },
    'dash-logout': { en: 'Log Out', ar: 'تسجيل الخروج' },

    
    // Contact Details
    'contact-office': { en: 'Our Office', ar: 'مكتبنا' },
    'contact-riyadh': { en: 'Riyadh, Saudi Arabia', ar: 'الرياض، المملكة العربية السعودية' },
    'contact-email-us': { en: 'Email Us', ar: 'راسلنا' },
    'contact-follow-us': { en: 'Follow Us', ar: 'تابعنا' },
    'contact-full-name': { en: 'Full Name', ar: 'الاسم الكامل' },
    'contact-subject': { en: 'Subject', ar: 'الموضوع' },
    'contact-msg-label': { en: 'Message', ar: 'الرسالة' },
    'contact-success': { en: 'Message sent! We will get back to you soon.', ar: 'تم إرسال الرسالة! سنقوم بالرد عليك قريباً.' },
    'contact-name-ph': { en: 'John Doe', ar: 'فلان الفلاني' },
    'contact-email-ph': { en: 'your@email.com', ar: 'بريدك@الإلكتروني.com' },
    'contact-inquiry-gen': { en: 'General Inquiry', ar: 'استفسار عام' },
    'contact-inquiry-tech': { en: 'Technical Support', ar: 'دعم فني' },
    'contact-inquiry-feedback': { en: 'Course Feedback', ar: 'ملاحظات حول الدورات' },
    
    // Settings
    'settings-title': { en: 'Settings', ar: 'الإعدادات' },
    'settings-profile': { en: 'Profile', ar: 'الملف الشخصي' },
    'settings-preferences': { en: 'Preferences', ar: 'التفضيلات' },
    'settings-data': { en: 'My Learning Data', ar: 'بياناتي التعليمية' },
    'settings-learning-progress': { en: 'Learning Progress', ar: 'تقدم التعلم' },
    'settings-comp-lessons': { en: 'Completed Lessons', ar: 'الدروس المكتملة' },
    'settings-words-saved': { en: 'Words Saved', ar: 'الكلمات المحفوظة' },
    'settings-export-btn': { en: 'Download Progress (JSON)', ar: 'تحميل التقدم (JSON)' },
    'settings-danger-zone': { en: 'Danger Zone', ar: 'منطقة الخطر' },
    'settings-reset-title': { en: 'Reset All Progress', ar: 'إعادة ضبط كل التقدم' },
    'settings-reset-desc': { en: 'Clear your learning hours, course history, and vocab bank. This cannot be undone.', ar: 'مسح ساعات التعلم، سجل الدورات، وبنك المفردات. لا يمكن التراجع عن هذا الإجراء.' },
    'settings-reset-btn': { en: 'Reset Tracker', ar: 'إعادة ضبط المتتبع' },
    'settings-update-success': { en: 'Settings updated successfully!', ar: 'تم تحديث الإعدادات بنجاح!' },

    'vocab-rank-1': { en: 'Explorer 🌱', ar: 'مستكشف 🌱' },
    'vocab-rank-2': { en: 'Novice 🔎', ar: 'مبتدئ 🔎' },
    'vocab-rank-3': { en: 'Learner 📚', ar: 'متعلم 📚' },
    'vocab-rank-4': { en: 'Expert 🎓', ar: 'خبير 🎓' },
    'vocab-rank-5': { en: 'Master 🏆', ar: 'بروفيسور 🏆' },
    'vocab-level-up': { en: 'Level Up! New Rank:', ar: 'ارتفع مستواك! الرتبة الجديدة:' },
    'vocab-xp-short': { en: 'XP', ar: 'نقطة' },


    'contact-inquiry-partner': { en: 'Partnership', ar: 'شراكة' },
    
    // Common Headings
    'nav-home': { en: 'Home', ar: 'الرئيسية' },
    'nav-courses': { en: 'Courses', ar: 'الدورات' },
    'nav-blog': { en: 'Blog', ar: 'المدونة' },
    
    // Grammar

    'grammar-hero-title': { en: 'Grammar', ar: 'دليل' },
    'grammar-hero-title-2': { en: 'Guide', ar: 'القواعد' },
    'grammar-hero-sub': { en: 'Essential grammar rules explained simply.', ar: 'قواعد اللغة الأساسية مشروحة ببساطة.' },
    'grammar-topic-tenses': { en: 'Verb Tenses', ar: 'أزمنة الأفعال' },
    'grammar-topic-tenses-desc': { en: 'Master Past, Present, and Future forms.', ar: 'أتقن صيغ الماضي والمضارع والمستقبل.' },
    'grammar-topic-parts': { en: 'Parts of Speech', ar: 'أقسام الكلام' },
    'grammar-topic-parts-desc': { en: 'Nouns, verbs, adjectives, and more.', ar: 'الأسماء والأفعال والصفات والمزيد.' },
    'grammar-topic-sentence': { en: 'Sentence Structure', ar: 'بناء الجملة' },
    'grammar-topic-sentence-desc': { en: 'Clauses, phrases, and complex types.', ar: 'الجمل والعبارات والأنواع المعقدة.' },
    'grammar-topic-punctuation': { en: 'Punctuation', ar: 'علامات الترقيم' },
    'grammar-topic-punctuation-desc': { en: 'Commas, semicolons, and rules.', ar: 'الفاصلة والفاصلة المنقوطة والقواعد.' },
    'grammar-view-guide': { en: 'View Guide', ar: 'عرض الدليل' },
    'filter-business': { en: 'Business', ar: 'الأعمال' },
    'filter-beginner': { en: 'Beginner', ar: 'مبتدئ' },
    'filter-intermediate': { en: 'Intermediate', ar: 'متوسط' },
    'filter-advanced': { en: 'Advanced', ar: 'متقدم' },
    'courses-hero-title': { en: 'Our English', ar: 'دوراتنا في' },
    'courses-hero-title-2': { en: 'Courses', ar: 'اللغة الإنجليزية' },
    'courses-hero-sub': { en: 'Comprehensive learning paths designed to take you from beginner to native-like fluency.', ar: 'مسارات تعلم شاملة مصممة لتنقلك من المستوى المبتدئ إلى الطلاقة.' },
    'cta-title-1': { en: 'Ready to Master', ar: 'جاهز لإتقان' },
    'cta-title-2': { en: 'English', ar: 'الإنجليزية؟' },
    'cta-desc': { en: 'Join thousands of learners achieving fluency with LingoWise. Your global career starts here.', ar: 'انضم إلى آلاف المتعلمين الذين يحققون الطلاقة مع لينغو وايز. مسيرتك العالمية تبدأ من هنا.' },
    'cta-btn-1': { en: 'Start Learning for Free →', ar: 'ابدأ التعلم مجاناً ←' },
    'cta-btn-2': { en: 'Log In', ar: 'تسجيل الدخول' },
    'stat-learners': { en: 'Active Learners', ar: 'متعلم نشط' },
    'stat-countries': { en: 'Countries Represented', ar: 'دولة ممثلة' },
    'stat-satisfaction': { en: 'Success Rate', ar: 'معدل النجاح' },
    'stat-learners-val': { en: '50k+', ar: '٥٠ ألف+' },
    'stat-countries-val': { en: '150+', ar: '١٥٠+' },
    'stat-satisfaction-val': { en: '98%', ar: '٩٨٪' },
    'feature-1-title': { en: 'AI Speaking Lab ⚡', ar: 'مختبر التحدث الذكي ⚡' },
    'feature-1-desc': { en: 'Practice real conversations with our AI tutor and get instant feedback on pronunciation.', ar: 'مارس محادثات حقيقية مع مدرسنا الذكي واحصل على تعليقات فورية على نطقك.' },
    'feature-2-title': { en: 'Progress Trackers 🎓', ar: 'تتبع التقدم 🎓' },
    'feature-2-desc': { en: 'Visualize your growth with detailed analytics for vocabulary, grammar, and fluency.', ar: 'تصور نموك مع تحليلات مفصلة للمفردات والقواعد والطلاقة.' },
    'dash-learner-default': { en: 'Learner', ar: 'متعلم' },
    'sidebar-overview': { en: 'Learning Hub', ar: 'مركز التعلم' },
    'sidebar-resources': { en: 'Resources', ar: 'المصادر' },
    'sidebar-settings': { en: 'Settings', ar: 'الإعدادات' },
    'sidebar-logout': { en: 'Log Out', ar: 'تسجيل الخروج' },
    'dash-streak-title': { en: 'Current Streak 🔥', ar: 'النشاط الحالي 🔥' },
    'dash-streak-sub': { en: 'Keep it up! Reach 7 for a bonus.', ar: 'استمر! صل إلى 7 أيام للحصول على مكافأة.' },
    'dash-welcome-sub': { en: 'Track your progress and continue your journey.', ar: 'تتبع تقدمك وواصل رحلتك.' },
    'dash-browse-courses': { en: 'Browse Courses', ar: 'تصفح الدورات' },
    'dash-stat-time-sub': { en: 'learned today', ar: 'تعلمتها اليوم' },

    'dash-stat-courses-sub': { en: 'Keep it up!', ar: 'استمر في التقدم!' },

    'dash-stat-vocab-sub': { en: 'new words today', ar: 'كلمة جديدة اليوم' },

    'dash-stat-speak-sub': { en: 'Practice in the Lab', ar: 'تدرب في المختبر' },

    'dash-view-all': { en: 'View All', ar: 'عرض الكل' },
    'dash-vocab-add': { en: '+ Add Word', ar: '+ إضافة كلمة' },
    'modal-add-word-title': { en: 'Add New Word', ar: 'إضافة كلمة جديدة' },
    'label-word': { en: 'Word / Phrase', ar: 'الكلمة / العبارة' },
    'label-translation': { en: 'Translation', ar: 'الترجمة' },

    'btn-save-word': { en: 'Save to Bank', ar: 'حفظ في البنك' },
    'footer-account': { en: 'Account', ar: 'الحساب' },
    'auth-error-match': { en: 'Passwords do not match!', ar: 'كلمات المرور غير متطابقة!' },
    'auth-success-signup': { en: 'Account created! Redirecting...', ar: 'تم إنشاء الحساب! جاري التحويل...' },
    'auth-success-login': { en: 'Welcome back! Redirecting...', ar: 'مرحباً بعودتك! جاري التحويل...' },
    'auth-error-invalid': { en: 'Invalid email or password.', ar: 'البريد الإلكتروني أو كلمة المرور غير صحيحة.' },
    'my-courses-title': { en: 'My', ar: 'تعلمي' },
    'settings-title': { en: 'Settings — LingoWise', ar: 'الإعدادات — لينغو وايز' },
    'settings-profile': { en: 'Profile', ar: 'الملف الشخصي' },
    'settings-preferences': { en: 'Preferences', ar: 'التفضيلات' },
    'settings-notifications': { en: 'Notifications', ar: 'الإشعارات' },
    'settings-data': { en: 'My Learning Data', ar: 'بيانات التعلم الخاصة بي' },
    'settings-security': { en: 'Security', ar: 'الأمان' },
    'settings-profile-title': { en: 'Profile Information', ar: 'معلومات الملف الشخصي' },
    'settings-change-avatar': { en: 'Change Avatar', ar: 'تغيير الصورة' },
    'settings-first-name': { en: 'First Name', ar: 'الاسم الأول' },
    'settings-last-name': { en: 'Last Name', ar: 'الاسم الأخير' },
    'settings-eng-level': { en: 'English Level', ar: 'مستوى الإنجليزية' },
    'settings-save-btn': { en: 'Save Changes', ar: 'حفظ التغييرات' },
    'settings-lang-display': { en: 'Language & Display', ar: 'اللغة والعرض' },
    'settings-interface-lang': { en: 'Interface Language', ar: 'لغة الواجهة' },
    'settings-target-lang': { en: 'Target Language', ar: 'اللغة المستهدفة' },
    'settings-learning-progress': { en: 'Learning Progress', ar: 'تقدم التعلم' },
    'settings-comp-lessons': { en: 'Completed Lessons', ar: 'الدروس المكتملة' },
    'settings-words-saved': { en: 'Words Saved', ar: 'الكلمات المحفوظة' },
    'settings-export-btn': { en: 'Download Progress (JSON)', ar: 'تحميل التقدم (JSON)' },
    'settings-update-success': { en: 'Profile updated!', ar: 'تم تحديث الملف الشخصي!' },
    'settings-export-success': { en: 'Progress data exported!', ar: 'تم تصدير بيانات التقدم!' },
    'my-courses-title-2': { en: 'Learning', ar: 'الخاص' },
    'my-courses-page-title': { en: 'My Learning — LingoWise', ar: 'تعلمي — لينغو وايز' },
    'my-courses-sub': { en: 'Pick up where you left off and keep track of your achievements.', ar: 'تابع من حيث توقفت وتتبع إنجازاتك.' },
    'speaking-hero-sub': { en: 'Improve your fluency and pronunciation with real-time AI feedback.', ar: 'حسن طلاقتك ونطقك من خلال تقنيات الذكاء الاصطناعي في الوقت الفعلي.' },
    'speaking-topics': { en: 'Practice Topics', ar: 'مواضيع الممارسة' },
    'topic-1-title': { en: 'Job Interview Preparation', ar: 'التحضير لمقابلة العمل' },
    'topic-1-desc': { en: 'Practice answering common career questions.', ar: 'تدرب على الإجابة على الأسئلة الوظيفية الشائعة.' },
    'topic-2-title': { en: 'Ordering Food at a Restaurant', ar: 'طلب الطعام في المطعم' },
    'topic-2-desc': { en: 'Master social interactions in dining.', ar: 'أتقن التفاعلات الاجتماعية عند تناول الطعام.' },
    'topic-3-title': { en: 'Travel & Directions', ar: 'السفر والاتجاهات' },
    'topic-3-desc': { en: 'Essential phrases for your next trip.', ar: 'عبارات أساسية لرحلتك القادمة.' },
    'topic-4-title': { en: 'Daily Conversation', ar: 'المحادثات اليومية' },
    'topic-4-desc': { en: 'Casual talk with friends and colleagues.', ar: 'حديث غير رسمي مع الأصدقاء والزملاء.' },
    'speaking-pronunciation': { en: 'Pronunciation', ar: 'النطق' },
    'speaking-grammar-acc': { en: 'Grammar Accuracy', ar: 'دقة القواعد' },
    'speaking-initial-tip': { en: 'Select a topic and start speaking to get personalized tips!', ar: 'اختر موضوعاً وابدأ التحدث للحصول على نصائح مخصصة!' },
    'speaking-word-suggestion': { en: 'Word Suggestion', ar: 'اقتراح كلمة' },
    'speaking-add-to-bank': { en: '+ Add to Bank', ar: '+ إضافة للبنك' },
    'unit-hrs': { en: 'hrs', ar: 'ساعة' },
    'grammar-hero-title': { en: 'Grammar', ar: 'دليل' },
    'grammar-hero-title-2': { en: 'Guide', ar: 'القواعد' },
    'grammar-hero-sub': { en: 'Essential grammar rules explained simply with interactive examples.', ar: 'قواعد اللغة الأساسية مشروحة ببساطة مع أمثلة تفاعلية.' },
    'grammar-search-ph': { en: 'Search grammar topics...', ar: 'ابحث عن مواضيع القواعد...' },
    'grammar-cat-fundamentals': { en: 'Fundamentals', ar: 'الأساسيات' },
    'grammar-cat-blocks': { en: 'Building Blocks', ar: 'لبنات البناء' },
    'grammar-cat-structure': { en: 'Structure', ar: 'الهيكل' },
    'grammar-cat-clarity': { en: 'Writing Clarity', ar: 'وضوح الكتابة' },
    'grammar-cat-advanced': { en: 'Advanced', ar: 'مستوى متقدم' },
    'grammar-topic-conditionals': { en: 'Conditionals', ar: 'الجمل الشرطية' },
    'grammar-topic-conditionals-desc': { en: 'Learn how to express hypothetical situations and "if" clauses.', ar: 'تعلم كيفية التعبير عن المواقف الافتراضية وجمل "if".' },
    'grammar-topic-passive': { en: 'Passive Voice', ar: 'المبني للمجهول' },
    'grammar-topic-passive-desc': { en: 'When and how to use the passive voice for formal and business writing.', ar: 'متى وكيف تستخدم المبني للمجهول في الكتابة الرسمية والأعمال.' },
    'grammar-help-title': { en: 'Need more help?', ar: 'هل تحتاج للمساعدة؟' },
    'grammar-help-desc': { en: 'Our AI Assistant is ready to explain any grammar rule in detail.', ar: 'مساعدنا الذكي مستعد لشرح أي قاعدة نحوية بالتفصيل.' },
    'grammar-ask-ai': { en: 'Ask AI Tutor 🤖', ar: 'اسأل المعلم الذكي 🤖' },
    'vocab-hero-title': { en: 'Vocabulary Bank', ar: 'بنك المفردات' },
    'vocab-hero-sub': { en: 'Master words scheduled for review today.', ar: 'أتقن الكلمات المقررة للمراجعة اليوم.' },
    'vocab-review-btn': { en: 'Start Review Session 🔥', ar: 'ابدأ جلسة المراجعة 🔥' },

    'dash-goal-vocab': { en: 'New Vocabulary', ar: 'مفردات جديدة' },
    'dash-goal-speak': { en: 'Speaking Practice', ar: 'ممارسة التحدث' },
    'dash-goal-done': { en: 'Completed for today!', ar: 'اكتمل لهذا اليوم!' },
    'dash-goal-rem': { en: 'minutes remaining', ar: 'دقيقة متبقية' },
};

// ===== DASHBOARD LOGIC =====
function getProgress() {
    return JSON.parse(localStorage.getItem('lingowise_progress') || '{"courses":{}}');
}

function saveProgress(data) {
    localStorage.setItem('lingowise_progress', JSON.stringify(data));
    updateDashboardStats();
}

function markLessonCompleted(courseId, lessonIndex) {
    const progress = getProgress();
    if (!progress.courses[courseId]) {
        progress.courses[courseId] = { completedLessons: [], lastAccessed: new Date().toISOString() };
    }
    if (!progress.courses[courseId].completedLessons.includes(lessonIndex)) {
        progress.courses[courseId].completedLessons.push(lessonIndex);
        progress.courses[courseId].lastAccessed = new Date().toISOString();
        saveProgress(progress);
        
        // Add a bonus to learning time (lesson duration)
        const course = COURSE_POOL.find(c => c.id === courseId);
        const lesson = course?.lessons[lessonIndex];
        if (lesson && lesson.duration) {
            const parts = lesson.duration.split(':');
            if (parts.length === 2) {
                const mins = parseInt(parts[0]) || 0;
                let totalMin = parseFloat(localStorage.getItem('lingowise_total_min') || "0");
                totalMin += mins;
                localStorage.setItem('lingowise_total_min', totalMin);
            }
        }

        // Record progress for Daily Goals (lessons count)
        recordGoalProgress('speaking', 1); // Using speaking slot for general lesson progress
    }
}


function initDashboard() {
    const user = JSON.parse(localStorage.getItem('lingowise_user') || '{}');
    const hiEl = document.getElementById('dashboardUser');
    const nameEl = document.getElementById('userName');
    const defaultName = translations['dash-learner-default']?.[lang] || (lang === 'ar' ? 'أيها الطالب' : 'Student');
    
    if (hiEl) hiEl.innerText = `${translations['dash-hi'][lang]}, ${user.firstName || defaultName} 👋`;
    if (nameEl) nameEl.innerText = user.firstName || defaultName;
    
    updateDashboardStats();
    updateActiveCourses();
    updateVocabUIStrip();
    initDailyGoals();
}

function updateDashboardStats() {
    const progress = getProgress();
    
    // Vocab XP & Level System
    const xp = parseInt(localStorage.getItem('lingowise_vocab_xp') || "0");
    const levelInfo = getVocabLevel(xp);
    if (document.getElementById('vocabMastery')) {
        document.getElementById('vocabMastery').innerText = levelInfo.title;
        
        // Dynamic "Words Added Today"
        const vocab = getVocab();
        const todayStr = new Date().toISOString().split('T')[0];
        const addedToday = vocab.filter(v => v.date === todayStr).length;
        const subEl = document.querySelector('[data-i18n="dash-stat-vocab-sub"]');
        if (subEl) {
            subEl.innerText = `↑ ${addedToday} ${translations['dash-stat-vocab-sub'][lang]}`;
        }
    }


    
    const totalMin = parseFloat(localStorage.getItem('lingowise_total_min') || "0");
    const hrsUnit = translations['unit-hrs'][lang];
    if (document.getElementById('learningTime')) document.getElementById('learningTime').innerText = `${(totalMin / 60).toFixed(1)} ${hrsUnit}`;
    
    // Sub-text for time (Today's time)
    const todayMin = parseFloat(localStorage.getItem('lingowise_today_min') || "0");
    const timeSubEl = document.querySelector('[data-i18n="dash-stat-time-sub"]');
    if (timeSubEl) {
        const displayMin = todayMin < 60 ? `${todayMin}m` : `${(todayMin/60).toFixed(1)}h`;
        timeSubEl.innerText = `↑ ${displayMin} ${translations['dash-stat-time-sub'][lang]}`;
    }

    
    const streak = localStorage.getItem('lingowise_streak') || '0';
    const streakEl = document.querySelector('[data-i18n="dash-streak-days"]');
    if (streakEl) streakEl.innerText = lang === 'ar' ? `${streak} أيام` : `${streak} Days`;

    // Count Finished Courses
    let finishedCourses = 0;
    Object.keys(progress.courses).forEach(cid => {
        const course = COURSE_POOL.find(c => c.id === cid);
        if (course && course.lessons && progress.courses[cid].completedLessons.length >= course.lessons.length) {
            finishedCourses++;
        }
    });

    const finishedEl = document.getElementById('coursesDone');
    if (finishedEl) finishedEl.innerText = finishedCourses;

    // Speaking Score (from AI Lab)
    const avgScore = localStorage.getItem('lingowise_avg_speaking') || '0';
    if (document.getElementById('speakingScore')) {
        document.getElementById('speakingScore').innerText = avgScore + "%";
        const subEl = document.querySelector('[data-i18n="dash-stat-speak-sub"]');
        if (subEl) {
            if (avgScore === '0') {
                subEl.innerText = translations['dash-stat-speak-sub'][lang];
            } else {
                subEl.innerText = lang === 'ar' ? 'بناءً على آخر تقييم' : 'Based on latest assessment';
            }
        }
    }
}






function updateActiveCourses() {
    const container = document.getElementById('activeCoursesContainer');
    if (!container) return;
    
    const progress = getProgress();
    const courseIds = Object.keys(progress.courses);
    
    if (courseIds.length === 0) {
        container.innerHTML = `<p style="text-align:center; padding:20px; color:var(--text-muted); font-size:0.9rem;">${lang === 'ar' ? 'لم تلتحق بأي دورات بعد.' : 'No courses joined yet.'}</p>`;
        return;
    }

    // Map IDs to course objects with current progress %
    const active = courseIds.map(id => {
        const c = COURSE_POOL.find(item => item.id === id);
        if (!c) return null;
        const completed = progress.courses[id].completedLessons.length;
        const total = c.lessons.length || 1;
        const percent = Math.round((completed / total) * 100);
        return { ...c, progress: percent };
    }).filter(c => c !== null).sort((a, b) => new Date(progress.courses[b.id].lastAccessed) - new Date(progress.courses[a.id].lastAccessed));

    container.innerHTML = active.map(c => `
        <div class="course-progress-item" onclick="playLesson('${c.id}')" style="cursor:pointer;">
            <div style="display:flex; justify-content:space-between; margin-bottom:5px;">
                <span style="font-weight:600; font-size:0.9rem;">${c.name[lang]}</span>
                <span style="color:${c.color}; font-weight:700; font-size:0.85rem;">${c.progress}%</span>
            </div>
            <div style="height:8px; background:var(--bg-secondary); border-radius:4px; overflow:hidden;">
                <div style="width:${c.progress}%; height:100%; background:${c.color}"></div>
            </div>
        </div>
    `).join('');
}


// ===== DAILY GOALS LOGIC =====
function getDailyGoalsDate() {
    const d = new Date();
    return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

function initDailyGoals() {
    const today = getDailyGoalsDate();
    const savedDate = localStorage.getItem('lingowise_goals_date');
    let goals = JSON.parse(localStorage.getItem('lingowise_goals') || '{"vocab":{"current":0,"target":10},"speaking":{"current":0,"target":15}}');
    
    if (savedDate !== today || !goals.vocab) {
        // Reset goals for the new day
        goals = {
            vocab: { current: 0, target: 10 },
            speaking: { current: 0, target: 5 } // Goal: 5 lessons per day
        };
        localStorage.setItem('lingowise_goals', JSON.stringify(goals));
        localStorage.setItem('lingowise_goals_date', today);
    }
    
    renderDailyGoals(goals);
}


function recordGoalProgress(type, amount) {
    const today = getDailyGoalsDate();
    const savedDate = localStorage.getItem('lingowise_goals_date');
    let goals = JSON.parse(localStorage.getItem('lingowise_goals') || '{"vocab":{"current":0,"target":10},"speaking":{"current":0,"target":15}}');
    
    // Ensure goals are strictly for today
    if (savedDate !== today) {
        goals = { vocab: { current: 0, target: 10 }, speaking: { current: 0, target: 15 } };
        localStorage.setItem('lingowise_goals_date', today);
    }
    
    if (goals[type]) {
        goals[type].current += amount;
        if (goals[type].current > goals[type].target) {
            goals[type].current = goals[type].target;
        }
        localStorage.setItem('lingowise_goals', JSON.stringify(goals));
        
        // Unobtrusive sync if on dashboard
        if (document.getElementById('dailyGoalsContainer')) {
            renderDailyGoals(goals);
        }
    }
}

function renderDailyGoals(goals) {
    const container = document.getElementById('dailyGoalsContainer');
    if (!container) return;
    
    const isVocabDone = goals.vocab.current >= goals.vocab.target;
    const isSpeakingDone = goals.speaking.current >= goals.speaking.target;
    
    const vocabIcon = isVocabDone ? '✓' : `${goals.vocab.current}`;
    const speakingIcon = isSpeakingDone ? '✓' : `${goals.speaking.current}m`;
    
    container.innerHTML = `
        <div class="daily-goal-item">
            <div class="goal-check ${isVocabDone ? 'done' : ''}">${vocabIcon}</div>
            <div style="flex:1;">
                <div style="font-weight:600; font-size:0.9rem;"><span data-i18n="dash-goal-vocab">${translations['dash-goal-vocab']?.[lang] || 'New Vocabulary'}</span> (${goals.vocab.current}/${goals.vocab.target})</div>
                <div style="font-size:0.75rem; color:var(--text-muted);">
                    ${isVocabDone ? (translations['dash-goal-done']?.[lang] || 'Completed for today!') : `${goals.vocab.target - goals.vocab.current} words remaining`}
                </div>
            </div>
            ${!isVocabDone ? `<a href="vocabulary.html" class="btn btn-primary btn-sm" style="padding:0.25rem 0.5rem;font-size:0.75rem;">Learn</a>` : ''}
        </div>
        <div class="daily-goal-item">
            <div class="goal-check ${isSpeakingDone ? 'done' : ''}" style="border-color:${isSpeakingDone?'var(--success)':'var(--primary)'}; color:${isSpeakingDone?'white':'var(--primary)'}; background:${isSpeakingDone?'var(--success)':'transparent'};">${speakingIcon}</div>
            <div style="flex:1;">
                <div style="font-weight:600; font-size:0.9rem;"><span data-i18n="dash-goal-speak">${translations['dash-goal-speak']?.[lang] || 'Speaking Practice'}</span> (${goals.speaking.current}/${goals.speaking.target} min)</div>
                <div style="font-size:0.75rem; color:var(--text-muted);">
                    ${isSpeakingDone ? (translations['dash-goal-done']?.[lang] || 'Completed for today!') : `${goals.speaking.target - goals.speaking.current} ${translations['dash-goal-rem']?.[lang] || 'minutes remaining'}`}
                </div>
            </div>
             ${!isSpeakingDone ? `<a href="speaking-lab.html" class="btn btn-primary btn-sm" style="padding:0.25rem 0.5rem;font-size:0.75rem;">Practice</a>` : ''}
        </div>
    `;
}

// ===== COURSES LOGIC =====
function initCourses() {
    const params = new URLSearchParams(window.location.search);
    const filter = params.get('level') || 'all';
    renderCoursesGrid(filter);
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.level === filter);
        btn.onclick = () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderCoursesGrid(btn.dataset.level);
        };
    });
}

function renderCoursesGrid(level) {
    const container = document.getElementById('coursesGrid');
    if (!container) return;
    const filtered = level === 'all' ? COURSE_POOL : COURSE_POOL.filter(c => c.level.en.toLowerCase() === level.toLowerCase());
    container.innerHTML = filtered.map(c => {
        let levelColor = '#6c5ce7'; // Default
        const lvl = c.level.en.toLowerCase();
        if (lvl.includes('beginner')) levelColor = '#00d2d3'; // Teal
        else if (lvl.includes('intermediate')) levelColor = '#6c5ce7'; // Purple
        else if (lvl.includes('advanced')) levelColor = '#ff9f43'; // Orange
        else if (lvl.includes('business')) levelColor = '#2e86de'; // Blue

        return `
            <div class="card course-card reveal active">
                <div class="course-icon" style="background:${levelColor}20; color:${levelColor}">${c.icon}</div>
                <div class="course-tag" style="background:${levelColor}15; color:${levelColor}">${c.level[lang]}</div>
                <h3>${c.name[lang]}</h3>
                <div class="course-meta">📚 ${c.lessons.length} ${lang === 'ar' ? 'دروس' : 'Lessons'} • ⏱️ 12h</div>
                <button class="btn btn-primary btn-sm w-full mt-2" onclick="playLesson('${c.id}')">${translations['course-enroll'][lang]}</button>
            </div>
        `;
    }).join('');

}

function playLesson(id) {
    const isLoggedIn = localStorage.getItem('lingowise_logged_in') === 'true';
    if (!isLoggedIn) {
        window.location.href = 'login.html';
        return;
    }
    const c = COURSE_POOL.find(item => item.id === id);

    if (!c) return;
    if (!document.getElementById('videoPlayerModal')) injectVideoModal();
    document.getElementById('playerCourseTitle').innerText = c.name[lang];
    
    const list = document.getElementById('playerLessonList');
    list.innerHTML = c.lessons.map((l, i) => `
        <div class="lesson-item ${i === 0 ? 'active' : ''}" onclick="changeLesson('${c.id}', ${i}, this)">
            <div class="lesson-num">${i + 1}</div>
            <div class="lesson-info">
                <div class="lesson-title">${l.title[lang]}</div>
                <div class="lesson-duration">⏱️ ${l.duration}</div>
            </div>
        </div>
    `).join('');
    
    changeLesson(c.id, 0, null);
    openModal('videoPlayerModal');
}

function changeLesson(courseId, lessonIndex, el) {
    const c = COURSE_POOL.find(item => item.id === courseId);
    if (!c) return;
    const lesson = c.lessons[lessonIndex];
    
    // Auto-Enroll / Mark session start
    const progress = getProgress();
    if (!progress.courses[courseId]) {
        progress.courses[courseId] = { completedLessons: [], lastAccessed: new Date().toISOString() };
        saveProgress(progress);
    } else {
        progress.courses[courseId].lastAccessed = new Date().toISOString();
        saveProgress(progress);
    }

    document.getElementById('lessonIframe').src = lesson.videoUrl || c.videoUrl;

    
    if (el) {
        document.querySelectorAll('.lesson-item').forEach(item => item.classList.remove('active'));
        el.classList.add('active');
    } else {
        const items = document.querySelectorAll('.lesson-item');
        if (items.length > 0) items[0].classList.add('active');
    }
    
    // Render content
    let vocabHTML = '';
    if (lesson.vocab && lesson.vocab.length) {
        vocabHTML = `
            <div style="margin-top:20px; text-align: ${lang === 'ar' ? 'right' : 'left'}">
                <h4 style="font-size:1.1rem; color:var(--primary);">${lang === 'ar' ? 'كلمات الدرس (10 كلمات)' : 'Lesson Vocabulary (10 words)'}</h4>
                <div class="grid grid-2" style="gap:10px; margin-top:10px;">
                    ${lesson.vocab.map(v => `
                        <div class="card p-2" style="background:var(--bg-secondary); padding:var(--space-sm); border-radius:var(--radius-md); display:flex; justify-content:space-between; align-items:center;">
                            <strong style="color:var(--text-main);">${v.en}</strong> 
                            <span style="color:var(--text-muted);font-size:0.9rem;">${v.ar}</span>
                        </div>
                    `).join('')}
                </div>
                <button class="btn btn-outline btn-sm mt-3" onclick="addAllVocabToBank('${courseId}', ${lessonIndex})" style="width:100%; justify-content:center;">
                    ${lang === 'ar' ? '+ أضف جميع الكلمات إلى بنك المفردات الخاص بي' : '+ Add all words to my bank'}
                </button>
            </div>
        `;
    }
    
    let exerciseHTML = '';
    if (lesson.exercises && lesson.exercises.length) {
        exerciseHTML = `
            <div style="margin-top:40px; text-align: ${lang === 'ar' ? 'right' : 'left'}">
                <h4 style="font-size:1.1rem; color:var(--primary); margin-bottom:15px;">${lang === 'ar' ? 'تدريبات الدرس' : 'Lesson Exercises'}</h4>
                <div id="lessonExercises" style="display:flex; flex-direction:column; gap:15px;">
                    ${lesson.exercises.map((ex, i) => `
                        <div class="card exercise-card" id="ex-card-${i}" style="background:var(--bg-secondary); padding:var(--space-md); border-radius:var(--radius-md); border: 2px solid transparent; transition: all 0.3s ease;">
                            <p style="font-weight:600; margin-bottom:10px; color:var(--text-primary);">Q${i+1}: ${ex.question[lang]}</p>
                            <div style="display:flex; flex-direction:column; gap:8px;">
                                ${ex.options[lang].map((opt, optIdx) => `
                                    <label class="ex-option-label" style="display:flex; align-items:center; gap:12px; cursor:pointer; font-size:0.95rem; color:var(--text-secondary); padding: 10px; border-radius: 8px; transition: background 0.2s, color 0.2s; border: 1px solid var(--border-subtle);">
                                        <input type="radio" name="ex_${i}" value="${optIdx}" style="accent-color: var(--primary); transform: scale(1.1);">
                                        ${opt}
                                    </label>
                                `).join('')}
                            </div>
                            <div class="ex-result-indicator mt-2" style="font-weight:700; font-size:0.9rem; display:none; padding: 5px 10px; border-radius: 4px; display: inline-block; margin-top: 15px;"></div>
                        </div>
                    `).join('')}
                </div>

                
                <div id="exercisesSummary" class="card mt-4" style="display:none; text-align:center; background:var(--primary-light); padding:var(--space-lg); border:1px solid var(--primary);">
                    <h3 id="summaryTitle" style="margin-bottom:10px;"></h3>
                    <p id="summaryText" style="color:var(--text-main); font-size:1.1rem;"></p>
                </div>

                <button class="btn btn-primary mt-4" onclick="checkAllExercises('${courseId}', ${lessonIndex})" style="width:100%; justify-content:center; height: 50px; font-size: 1.1rem;">
                    ${lang === 'ar' ? 'التحقق من جميع الإجابات' : 'Check All Answers'}
                </button>
            </div>
        `;
    }

    
    let aiQuizHTML = `
        <div id="aiQuizSection" style="margin-top:40px; text-align: ${lang === 'ar' ? 'right' : 'left'}">
            <h4 style="font-size:1.1rem; color:var(--accent-gold); margin-bottom:15px; display:flex; align-items:center; gap:8px;">✨ ${lang === 'ar' ? 'اختبار الذكاء الاصطناعي الديناميكي' : 'AI Dynamic Quiz'}</h4>
            <p style="font-size:0.9rem; color:var(--text-secondary); margin-bottom:15px;">
                ${lang === 'ar' ? 'دع الذكاء الاصطناعي ينشئ لك اختباراً مخصصاً بناءً على هذا الدرس!' : 'Let AI generate a custom quiz for you based on this lesson!'}
            </p>
            <div id="aiQuizContainer"></div>
            <button id="generateQuizBtn" class="btn btn-gold w-full" onclick="generateAIQuiz('${c.name.en}', '${lesson.title.en}')" style="justify-content:center;">
                ${lang === 'ar' ? 'توليد اختبار ذكي' : 'Generate Smart Quiz'}
            </button>
        </div>
    `;

    const detailsContainer = document.getElementById('lessonContentDetails');
    if(detailsContainer) {
        detailsContainer.innerHTML = exerciseHTML + vocabHTML + aiQuizHTML;
    }
}

async function generateAIQuiz(topic, lessonTitle) {
    const container = document.getElementById('aiQuizContainer');
    const btn = document.getElementById('generateQuizBtn');
    if (!container || !btn) return;

    btn.disabled = true;
    btn.innerHTML = lang === 'ar' ? 'جاري التوليد... ⏳' : 'Generating... ⏳';
    container.innerHTML = `<div class="typing-indicator" style="margin:20px 0;"><span></span><span></span><span></span></div>`;

    try {
        const response = await fetch('/api/ai/quiz', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ topic, content: lessonTitle })
        });
        const data = await response.json();
        if (data.success) {
            renderAIQuiz(data.quiz);
            btn.style.display = 'none';
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        console.error('Quiz Error:', error);
        if (error.message && error.message.toLowerCase().includes('quota')) {
            container.innerHTML = `<p style="color:var(--warning)">${lang === 'ar' ? 'عذراً، انتهت حصة الذكاء الاصطناعي المجانية.' : 'Sorry, AI quota exhausted.'}</p>`;
        } else {
            container.innerHTML = `<p style="color:var(--danger)">${lang === 'ar' ? 'فشل توليد الاختبار. يرجى التأكد من مفتاح API.' : 'Failed to generate quiz. Please check your API key.'}</p>`;
        }
        btn.disabled = false;
        btn.innerHTML = lang === 'ar' ? 'حاول مرة أخرى' : 'Try Again';
    }
}

function renderAIQuiz(quiz) {
    const container = document.getElementById('aiQuizContainer');
    container.innerHTML = quiz.map((q, i) => `
        <div class="card p-3 mb-3 ai-quiz-card" id="ai-q-card-${i}" style="background:rgba(108, 92, 231, 0.05); border:1px solid var(--primary-light);">
            <p style="font-weight:600; margin-bottom:10px;">Q${i+1}: ${q.question[lang]}</p>
            <div style="display:flex; flex-direction:column; gap:8px;">
                ${q.options[lang].map((opt, optIdx) => `
                    <label style="display:flex; align-items:center; gap:10px; cursor:pointer; padding:8px; border-radius:6px; border:1px solid var(--border-subtle); transition: all 0.2s;">
                        <input type="radio" name="ai_ex_${i}" value="${optIdx}" onchange="checkAIAnswer(${i}, ${q.answer}, ${optIdx})">
                        <span style="font-size:0.9rem;">${opt}</span>
                    </label>
                `).join('')}
            </div>
            <div class="ai-res-${i}" style="margin-top:10px; font-weight:700; font-size:0.85rem; display:none;"></div>
        </div>
    `).join('');
}

function checkAIAnswer(qIdx, correctIdx, userIdx) {
    const res = document.querySelector(`.ai-res-${qIdx}`);
    const card = document.getElementById(`ai-q-card-${qIdx}`);
    if (!res || !card) return;
    
    res.style.display = 'block';
    if (correctIdx === parseInt(userIdx)) {
        res.innerHTML = lang === 'ar' ? '✅ إجابة صحيحة!' : '✅ Correct!';
        res.style.color = 'var(--success)';
        card.style.borderColor = 'var(--success)';
        card.style.background = 'rgba(46, 213, 115, 0.05)';
    } else {
        res.innerHTML = lang === 'ar' ? '❌ حاول مرة أخرى' : '❌ Incorrect, try again';
        res.style.color = 'var(--danger)';
        card.style.borderColor = 'var(--danger)';
        card.style.background = 'rgba(255, 71, 87, 0.05)';
    }
}

function checkAllExercises(courseId, lessonIndex) {
    const c = COURSE_POOL.find(item => item.id === courseId);
    const lesson = c.lessons[lessonIndex];
    if(!lesson || !lesson.exercises) return;

    let correctCount = 0;
    const total = lesson.exercises.length;
    let allAnswered = true;

    lesson.exercises.forEach((ex, i) => {
        const selected = document.querySelector(`input[name="ex_${i}"]:checked`);
        const card = document.getElementById(`ex-card-${i}`);
        const indicator = card.querySelector('.ex-result-indicator');
        
        indicator.style.display = 'block';
        
        if (!selected) {
            allAnswered = false;
            indicator.style.display = 'block';
            indicator.innerText = lang === 'ar' ? '⚠️ لم يتم اختيار إجابة' : '⚠️ No answer selected';
            indicator.style.color = 'var(--text-secondary)';
            indicator.style.background = 'rgba(255,255,255,0.05)';
            card.style.borderColor = 'var(--border-subtle)';
        } else if (parseInt(selected.value) === ex.answer) {
            correctCount++;
            indicator.style.display = 'block';
            indicator.innerText = lang === 'ar' ? '✅ إجابة صحيحة!' : '✅ Correct!';
            indicator.style.color = 'var(--success)';
            indicator.style.background = 'rgba(46, 213, 115, 0.1)';
            card.style.borderColor = 'var(--success)';
            card.style.background = 'rgba(46, 213, 115, 0.05)';
        } else {
            indicator.style.display = 'block';
            indicator.innerText = lang === 'ar' ? '❌ إجابة خاطئة' : '❌ Incorrect';
            indicator.style.color = 'var(--danger)';
            indicator.style.background = 'rgba(255, 71, 87, 0.1)';
            card.style.borderColor = 'var(--danger)';
            card.style.background = 'rgba(255, 71, 87, 0.05)';
        }
    });

    // Show summmary
    const summary = document.getElementById('exercisesSummary');
    const title = document.getElementById('summaryTitle');
    const text = document.getElementById('summaryText');
    
    summary.style.display = 'block';
    
    const percentage = Math.round((correctCount / total) * 100);
    
    if (lang === 'ar') {
        title.innerText = percentage === 100 ? '🎉 عمل رائع!' : '📊 نتائجك النهائيّة';
        text.innerHTML = `لقد أجبت بشكل صحيح على <strong>${correctCount}</strong> من أصل <strong>${total}</strong> تدريبات (${percentage}%)`;
    } else {
        title.innerText = percentage === 100 ? '🎉 Great Job!' : '📊 Final Results';
        text.innerHTML = `You got <strong>${correctCount}</strong> out of <strong>${total}</strong> correct (${percentage}%)`;
    }


    summary.scrollIntoView({ behavior: 'smooth', block: 'center' });

    if (percentage === 100) {
        summary.style.background = 'rgba(46, 213, 115, 0.1)';
        summary.style.borderColor = 'var(--success)';
        
        // Mark lesson as complete if they get 100%
        markLessonCompleted(courseId, lessonIndex);
        showToast('success', lang === 'ar' ? 'تم إكمال الدرس بنجاح!' : 'Lesson completed successfully!');
    } else {
        summary.style.background = 'rgba(255, 159, 67, 0.1)';
        summary.style.borderColor = 'var(--warning)';
    }
}



function addAllVocabToBank(courseId, lessonIndex) {
    const c = COURSE_POOL.find(item => item.id === courseId);
    const lesson = c.lessons[lessonIndex];
    if(!lesson || !lesson.vocab) return;
    
    const myVocab = getVocab();
    let added = 0;
    lesson.vocab.forEach(v => {
        if(!myVocab.find(existing => existing.word.toLowerCase() === v.en.toLowerCase())) {
            myVocab.unshift({ 
                id: Date.now().toString() + Math.random(), 
                word: v.en, 
                translation: v.ar, 
                category: c.level.en, 
                date: new Date().toISOString().split('T')[0] 
            });
            added++;
        }
    });
    
    if(added > 0) {
        saveVocab(myVocab);
        if (typeof recordGoalProgress === 'function') recordGoalProgress('vocab', added);
        showToast('success', lang === 'ar' ? `تمت إضافة ${added} كلمات إلى بنك المفردات!` : `Added ${added} words to your bank!`);
        // if we are on dashboard or vocabulary page, ensure it updates
        if (typeof renderVocabGrid === 'function' && document.getElementById('vocabularyGrid')) renderVocabGrid();
        if (typeof updateVocabUIStrip === 'function') updateVocabUIStrip();
    } else {
        showToast('info', lang === 'ar' ? 'الكلمات موجودة مسبقاً.' : 'Words already in your bank.');
    }
}

function injectVideoModal() {
    const html = `
        <div id="videoPlayerModal" class="modal-overlay">
            <div class="modal video-player-content" style="max-width:1100px; padding:0; overflow:hidden;">
                <div class="player-grid">
                    <!-- Main Left Column -->
                    <div class="player-main" style="overflow-y:auto; max-height:85vh; padding-bottom:50px;">
                        <div class="player-header">
                            <h3 id="playerCourseTitle" style="margin:0; font-size:1.1rem; flex:1;">Course</h3>
                            <button class="close-modal" onclick="closeModal('videoPlayerModal')" style="font-size:1.2rem; opacity:0.6; cursor:pointer; border:none; background:none; color:white;">✕</button>
                        </div>
                        <div class="video-container">
                            <iframe id="lessonIframe" src="" allowfullscreen frameborder="0"></iframe>
                        </div>
                        <div id="lessonContentDetails" style="padding:var(--space-xl);">
                             <!-- Dynamic Exercises and Vocab -->
                        </div>
                    </div>
                    
                    <!-- Sidebar Right Column -->
                    <div class="player-sidebar" style="overflow-y:auto; max-height:85vh;">
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:var(--space-md);">
                            <h4 style="font-size:0.85rem; opacity:0.7; margin:0;">${lang === 'ar' ? 'دروس الدورة' : 'COURSE LESSONS'}</h4>
                        </div>
                        <div id="playerLessonList" class="lesson-list"></div>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', html);
}

// ===== VOCABULARY LOGIC =====
function getVocab() {
    return JSON.parse(localStorage.getItem('lingowise_vocab')) || [];
}

function saveVocab(v) { localStorage.setItem('lingowise_vocab', JSON.stringify(v)); }

function initVocabularyPage() { renderVocabGrid(); }

function renderVocabGrid(filterTerm = '') {
    const grid = document.getElementById('vocabularyGrid');
    if (!grid) return;
    const items = getVocab().filter(v => {
        return v.word.toLowerCase().includes(filterTerm.toLowerCase()) || v.translation.toLowerCase().includes(filterTerm.toLowerCase());
    });

    
    if (items.length === 0) {
        grid.innerHTML = `<div class="text-center p-3" style="grid-column:1/-1;">${translations['vocab-empty'][lang]}</div>`;
        return;
    }
    
    grid.innerHTML = items.map(v => {
        return `
            <div class="card vocab-card reveal active">
                <button class="delete-btn" onclick="deleteWord('${v.id}')">✕</button>
                <div class="vocab-word">${v.word}</div>
                <div class="vocab-translation">${v.translation}</div>
                <div class="vocab-footer" style="justify-content: flex-end;">
                    <span class="vocab-date">${v.date}</span>
                </div>
            </div>
        `;
    }).join('');

}

function handleVocabSearch(q) { 
    renderVocabGrid(q); 
}


function addVocabulary(e) {
    if(e) e.preventDefault();
    const word = document.getElementById('vocab-word').value;
    const trans = document.getElementById('vocab-translation').value;
    if(!word || !trans) return;
    const vocab = getVocab();
    vocab.unshift({ id: Date.now().toString(), word, translation: trans, date: new Date().toISOString().split('T')[0] });

    saveVocab(vocab);
    
    // Record Daily Goal Progress
    recordGoalProgress('vocab', 1);

    // Grant XP (5 per word)
    addVocabXP(5);

    showToast('success', lang === 'ar' ? 'تمت إضافة الكلمة! (+5 نقاط)' : 'Word added! (+5 XP)');
    closeModal('addWordModal');

    if (document.getElementById('vocabularyGrid')) renderVocabGrid();
    updateVocabUIStrip();
}

function deleteWord(id) {
    let vocab = getVocab();
    vocab = vocab.filter(v => v.id !== id);
    saveVocab(vocab);
    renderVocabGrid();
    updateVocabUIStrip();
}

function updateVocabUIStrip() {
    const container = document.getElementById('recentVocabContainer');
    if (!container) return;
    const vocab = getVocab().slice(0, 4);
    if (vocab.length === 0) {
        container.innerHTML = `<p style="grid-column: 1/-1; text-align: center; padding: 20px; color: var(--text-muted); font-size: 0.9rem;">${lang === 'ar' ? 'لم تضف أي كلمات بعد.' : 'No words added yet.'}</p>`;
    } else {
        container.innerHTML = vocab.map(v => `
            <div class="vocab-card-mini card p-1" style="background:var(--bg-secondary);">
                <div style="font-weight:700;">${v.word}</div>
                <div style="font-size:0.75rem; color:var(--text-muted);">${v.translation}</div>
            </div>
        `).join('');
    }

    
    const xp = parseInt(localStorage.getItem('lingowise_vocab_xp') || "0");
    const levelInfo = getVocabLevel(xp);
    if (document.getElementById('vocabMastery')) document.getElementById('vocabMastery').innerText = levelInfo.title;
}

function startVocabReview() {
    const vocab = getVocab();
    if (vocab.length === 0) {
        showToast('error', lang === 'ar' ? 'بنك المفردات فارغ! أضف بعض الكلمات أولاً.' : 'Vocab bank is empty! Add some words first.');
        return;
    }
    
    showToast('success', lang === 'ar' ? 'بدأت جلسة المراجعة! (+10 نقاط)' : 'Review session started! (+10 XP)');
    addVocabXP(10);
}

// XP & LEVEL HELPERS

function getVocabLevel(xp) {
    if (xp >= 1500) return { level: 5, title: translations['vocab-rank-5'][lang], next: Infinity };
    if (xp >= 700) return { level: 4, title: translations['vocab-rank-4'][lang], next: 1500 };
    if (xp >= 300) return { level: 3, title: translations['vocab-rank-3'][lang], next: 700 };
    if (xp >= 100) return { level: 2, title: translations['vocab-rank-2'][lang], next: 300 };
    return { level: 1, title: translations['vocab-rank-1'][lang], next: 100 };
}

function addVocabXP(amount) {
    const oldXp = parseInt(localStorage.getItem('lingowise_vocab_xp') || "0");
    const newXp = oldXp + amount;
    localStorage.setItem('lingowise_vocab_xp', newXp);
    
    const oldLevel = getVocabLevel(oldXp).level;
    const newLevelInfo = getVocabLevel(newXp);
    
    if (newLevelInfo.level > oldLevel) {
        showToast('success', `🎊 ${translations['vocab-level-up'][lang]} ${newLevelInfo.title}`);
    }
    
    // Update UI if on dashboard
    if (document.getElementById('vocabMastery')) updateDashboardStats();
}


// ===== MY COURSES LOGIC =====
function initMyCoursesPage() { 
    renderMyCoursesGrid(); 
    updateMyCoursesStats();
}

function updateMyCoursesStats() {
    const progress = getProgress();
    const totalMin = parseFloat(localStorage.getItem('lingowise_total_min') || "0");
    const hrsUnit = translations['unit-hrs'][lang];
    const timeEl = document.querySelector('#learningTimeVal');
    if (timeEl) timeEl.innerText = `${(totalMin / 60).toFixed(1)}${hrsUnit}`;
    
    const vocabCount = getVocab().length;
    const vocabEl = document.querySelector('#myVocabCount');
    if (vocabEl) vocabEl.innerText = vocabCount;

    // Count Finished Courses
    let finishedCourses = 0;
    Object.keys(progress.courses).forEach(cid => {
        const course = COURSE_POOL.find(c => c.id === cid);
        if (course && course.lessons && progress.courses[cid].completedLessons.length >= course.lessons.length) {
            finishedCourses++;
        }
    });
    const doneEl = document.querySelector('#coursesDoneVal');
    if (doneEl) doneEl.innerText = finishedCourses;

    // Speaking Score
    const avgScore = localStorage.getItem('lingowise_avg_speaking') || '0';
    const scoreEl = document.querySelector('#speakingScoreVal');
    if (scoreEl) scoreEl.innerText = avgScore + "%";
}



function renderMyCoursesGrid() {
    const grid = document.getElementById('myCoursesGrid');
    if (!grid) return;
    
    const progress = getProgress();
    const courseIds = Object.keys(progress.courses);
    
    if (courseIds.length === 0) {
        grid.innerHTML = `<div class="card p-4 text-center" style="grid-column:1/-1; background:var(--bg-secondary); border:1px dashed var(--border-strong);">
            <p style="color:var(--text-muted);">${lang === 'ar' ? 'لم تلتحق بأي دورات بعد. ابدأ التعلم الآن!' : 'No courses joined yet. Start learning now!'}</p>
            <a href="courses.html" class="btn btn-primary btn-sm mt-3" style="display:inline-flex;">${translations['nav-courses'][lang]}</a>
        </div>`;
        return;
    }

    const myItems = courseIds.map(id => {
        const c = COURSE_POOL.find(item => item.id === id);
        if (!c) return null;
        const completed = progress.courses[id].completedLessons.length;
        const total = c.lessons?.length || 1;
        const percent = Math.round((completed / total) * 100);
        const isDone = completed >= total;
        return { ...c, progress: percent, status: isDone ? 'completed' : 'in-progress' };
    }).filter(c => c !== null);

    grid.innerHTML = myItems.map(c => `
        <div class="card p-3 reveal active">
            <div style="font-size:2.5rem; margin-bottom:15px;">${c.icon}</div>
            <h3>${c.name[lang]}</h3>
            <div class="course-meta mb-1" style="font-size:0.8rem; opacity:0.7;">
                ${c.progress}% ${lang === 'ar' ? 'مكتمل' : 'Completed'}
            </div>
            <div class="progress-bar mt-2 mb-3" style="height:8px; background:var(--bg-secondary); border-radius:4px; overflow:hidden;">
                <div style="width:${c.progress}%; height:100%; background:${c.color}; border-radius:4px; transition: width 0.5s ease;"></div>
            </div>
            <button class="btn btn-primary btn-sm w-full" onclick="playLesson('${c.id}')">
                ${c.status === 'completed' ? (translations['course-watch-again']?.[lang] || 'Watch Again') : (translations['course-resume']?.[lang] || 'Resume')}
            </button>
        </div>
    `).join('');
}


// ===== AI ASSISTANT =====
function initAIAssistant() {
    if (document.getElementById('aiAssistantBtn')) return;
    const btn = document.createElement('button');
    btn.id = 'aiAssistantBtn';
    btn.innerHTML = '🤖<span class="notif-dot"></span>';
    btn.onclick = toggleAIChat;
    document.body.appendChild(btn);

    const chat = document.createElement('div');
    chat.id = 'aiChat';
    chat.className = 'card-glass'; // Premium glassmorphism
    chat.innerHTML = `
        <div class="ai-chat-header">
            <div class="ai-info" style="display:flex; align-items:center; gap:10px;">
                <div class="ai-avatar">🤖</div>
                <div style="display:flex; flex-direction:column;">
                    <span class="name">${translations['ai-name'][lang]}</span>
                    <span class="status">${lang === 'ar' ? 'متصل الآن • مدرس إنجليزي' : 'Online • English Tutor'}</span>
                </div>
            </div>
            <button class="ai-chat-close" onclick="toggleAIChat()">✕</button>
        </div>
        <div class="ai-chat-messages" id="aiMessages">
            <div class="ai-msg bot">${lang === 'ar' ? 'مرحباً! 👋 أنا مدرس اللغة الإنجليزية الذكي. اكتب لي بالإنجليزية وسأصحح أخطاءك وأعلمك القواعد الصحيحة! يمكنك أيضاً سؤالي عن أي قاعدة نحوية أو مفردات.' : 'Hi there! 👋 I\'m your AI English tutor. Write to me in English and I\'ll correct your grammar, vocabulary, and help you improve! You can also ask me about any grammar rules or vocabulary.'}</div>
        </div>
        <div class="ai-quick-replies" style="flex-wrap:wrap;">
            <button class="ai-quick-btn" onclick="sendAIMessage('${lang === 'ar' ? 'كيف أحسن نطقي؟' : 'How to improve pronunciation?'}')">${lang === 'ar' ? '🗣️ تحسين النطق' : '🗣️ Pronunciation'}</button>
            <button class="ai-quick-btn" onclick="sendAIMessage('${lang === 'ar' ? 'اشرح لي قواعد الأزمنة' : 'Explain English tenses'}')">${lang === 'ar' ? '⏳ الأزمنة' : '⏳ Tenses'}</button>
            <button class="ai-quick-btn" onclick="sendAIMessage('${lang === 'ar' ? 'صحح لي: I goed to the store yesterday' : 'Correct this: I goed to the store yesterday'}')">${lang === 'ar' ? '✏️ صحح جملتي' : '✏️ Fix my sentence'}</button>
            <button class="ai-quick-btn" onclick="sendAIMessage('${lang === 'ar' ? 'أعطني 5 كلمات إنجليزية متقدمة' : 'Give me 5 advanced English words'}')">${lang === 'ar' ? '📚 مفردات متقدمة' : '📚 Advanced Words'}</button>
        </div>
        <div class="ai-chat-input">
            <input type="text" id="aiInput" placeholder="${lang === 'ar' ? 'اكتب بالإنجليزية وسأصحح لك...' : 'Type in English and I\'ll help you...'}" onkeydown="if(event.key==='Enter') sendAIMessage()">
            <button onclick="sendAIMessage()">➤</button>
        </div>
    `;
    document.body.appendChild(chat);
}

function toggleAIChat() { 
    document.getElementById('aiChat').classList.toggle('open');
    const dot = document.querySelector('#aiAssistantBtn .notif-dot');
    if (dot) dot.style.display = 'none';
}

let aiChatHistory = [];

function formatAIResponse(text) {
    // Convert markdown-style formatting to HTML
    let html = text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/❌(.*?)\n/g, '<span style="color:#ff4757;">❌$1</span><br>')
        .replace(/✅(.*?)\n/g, '<span style="color:#2ed573;">✅$1</span><br>')
        .replace(/📝(.*?)\n/g, '<span style="color:var(--primary);">📝$1</span><br>')
        .replace(/\n/g, '<br>');
    return html;
}

async function sendAIMessage(preset) {
    const input = document.getElementById('aiInput');
    const msg = preset || input.value.trim();
    if (!msg) return;

    const msgs = document.getElementById('aiMessages');
    
    // Add User Message
    msgs.innerHTML += `<div class="ai-msg user">${msg}</div>`;
    msgs.scrollTop = msgs.scrollHeight;
    
    if (input) input.value = '';

    // Add Loading Indicator
    const loadingId = 'ai-loading-' + Date.now();
    msgs.innerHTML += `<div class="ai-msg bot" id="${loadingId}">
        <div class="typing-indicator"><span></span><span></span><span></span></div>
    </div>`;
    msgs.scrollTop = msgs.scrollHeight;

    try {
        const response = await fetch('/api/ai/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: msg, history: aiChatHistory })
        });
        const data = await response.json();
        
        // Remove Loading
        const loadingEl = document.getElementById(loadingId);
        if (loadingEl) loadingEl.remove();

        if (data.success) {
            const botMsg = data.response;
            const formattedMsg = formatAIResponse(botMsg);
            msgs.innerHTML += `<div class="ai-msg bot">${formattedMsg}</div>`;
            aiChatHistory.push({ role: 'user', text: msg });
            aiChatHistory.push({ role: 'bot', text: botMsg });
            // Keep last 20 messages for context
            if (aiChatHistory.length > 20) aiChatHistory = aiChatHistory.slice(-20);
        } else {
            throw new Error(data.message || 'Chat failed');
        }
    } catch (error) {
        console.error('AI Chat Error:', error);
        const loadingEl = document.getElementById(loadingId);
        if (loadingEl) {
            if (error.message && error.message.toLowerCase().includes('quota')) {
                loadingEl.innerHTML = lang === 'ar' ? 'عذراً، انتهت حصة الـ API المجانية لهذا اليوم.' : 'Sorry, the free API quota is exhausted for today.';
            } else {
                loadingEl.innerHTML = lang === 'ar' ? 'عذراً، حدث خطأ ما. يرجى التأكد من مفتاح API.' : 'Sorry, something went wrong. Please check your API key.';
            }
        }
    }
    msgs.scrollTop = msgs.scrollHeight;
}

function updateAIAssistant() {
    const input = document.getElementById('aiInput');
    if (input) input.placeholder = lang === 'ar' ? 'اكتب بالإنجليزية وسأصحح لك...' : 'Type in English and I\'ll help you...';
}

// ===== SPEAKING LAB HOOKS =====
async function getSpeakingAnalysis(transcript, topicId) {
    try {
        const response = await fetch('/api/ai/analyze', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ transcript, topic: topicId })
        });
        const data = await response.json();
        if (data.success) {
            return data.analysis;
        }
        
        // Handle specific Quota error
        if (data.message === 'API Quota Exceeded') {
            showToast('warning', lang === 'ar' ? 'انتهت حصة الـ API المجانية. جاري عرض تحليل تجريبي.' : 'API Quota exceeded. Showing demo analysis.');
            const status = document.getElementById('statusText');
            if(status) status.innerText = lang === 'ar' ? '⚠️ تم تجاوز الحصة (النتائج حالياً تجريبية)' : '⚠️ Quota Exceeded (Results are Demo)';
        }

        throw new Error(data.message || 'Analysis failed');
    } catch (error) {
        console.error('AI Analysis Error:', error);
        
        // Rich fallback with detailed mock data
        const pScore = Math.floor(Math.random() * 20) + 60;
        const fScore = Math.floor(Math.random() * 20) + 60;
        const gScore = Math.floor(Math.random() * 20) + 60;
        const overall = Math.round((pScore + fScore + gScore) / 3);
        
        return {
            transcript: transcript || (lang === 'ar' ? 'لم يتم اكتشاف نص' : 'No speech detected'),
            metrics: { 
                pronunciation: pScore, 
                fluency: fScore, 
                grammar: gScore,
                overall: overall
            },
            correction: {
                original: transcript || '...',
                corrected: transcript ? transcript : 'Please check your microphone.',
                explanation: 'Real-time AI analysis requires an active Gemini API key and available quota. Connect your API key for detailed grammar corrections.',
                explanation_ar: 'التحليل الفوري بالذكاء الاصطناعي يتطلب مفتاح Gemini API نشطاً وحصة متاحة. قم بتوصيل مفتاح API الخاص بك للحصول على تصحيحات نحوية مفصلة.'
            },
            errors: [],
            pronunciationNotes: [],
            strengths: [lang === 'ar' ? 'أنت تحاول التحدث بالإنجليزية - هذه خطوة أولى رائعة!' : 'You are attempting to speak English — that is a great first step!'],
            tip: 'Connect your Gemini API key for real AI-powered grammar and pronunciation analysis. Speak clearly and use complete sentences for better results.',
            tip_ar: 'قم بتوصيل مفتاح Gemini API الخاص بك للحصول على تحليل حقيقي مدعوم بالذكاء الاصطناعي. تحدث بوضوح واستخدم جمل كاملة للحصول على نتائج أفضل.',
            suggestedVocab: { 
                word: 'Articulate', 
                translation: lang === 'ar' ? 'يُعبّر بوضوح' : 'Articulate', 
                cat: 'Communication' ,
                example: 'She can articulate her ideas very clearly.'
            }
        };
    }
}

// ===== BLOG LOGIC =====
function filterBlog(category, btn) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cards = document.querySelectorAll('.blog-card');
    cards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

const BLOG_CONTENT = {
    1: {
        title: { en: 'Top 10 Phrasal Verbs for Business English 💼', ar: 'أهم 10 أفعال مركبة للغة الإنجليزية في الأعمال 💼' },
        content: { 
            en: '<p>Mastering phrasal verbs is essential for communicating naturally in corporate environments. Let’s explore 10 highly effective phrasal verbs that can immediately elevate your professional vocabulary:</p><ul style="margin:15px 0 25px 25px;display:flex;flex-direction:column;gap:10px;"><li>📌 <strong>Bring up</strong> – To introduce a new topic during a meeting. <em>"I will bring up the budget issues tomorrow."</em></li><li>🚫 <strong>Call off</strong> – To cancel an event or meeting entirely. <em>"The manager had to call off the negotiation."</em></li><li>🕰️ <strong>Put off</strong> – To postpone an event to a later time. <em>"Let’s put off the review until next week."</em></li><li>🔍 <strong>Look into</strong> – To investigate or research a matter. <em>"The IT department will look into the server outage."</em></li><li>📝 <strong>Draw up</strong> – To prepare an official document or contract. <em>"The lawyers will draw up the agreement."</em></li><li>☕ <strong>Catch up</strong> – To get up to speed on recent developments. <em>"Let’s grab coffee and catch up on the project."</em></li><li>👑 <strong>Take over</strong> – To assume control or responsibility. <em>"She will take over as the new Director of Marketing."</em></li><li>👟 <strong>Step down</strong> – To resign from an official position. <em>"The CEO decided to step down after ten years."</em></li><li>🛠️ <strong>Sort out</strong> – To successfully resolve a problem or organize details. <em>"We need to sort out the supply chain issues."</em></li><li>⚙️ <strong>Set up</strong> – To establish, arrange, or organize a system or meeting. <em>"I will set up the conference call for 2 PM."</em></li></ul><p>Integrating these phrases elegantly into your daily communication will help you sound highly fluent, confident, and professional among your peers. 🌟</p>',
            ar: '<p>يعد إتقان الأفعال المركبة (Phrasal Verbs) أمراً بالغ الأهمية للتواصل بشكل طبيعي في بيئات الشركات. دعونا نستكشف 10 أفعال مركبة فعالة للغاية يمكنها الارتقاء بمفرداتك المهنية على الفور:</p><ul style="margin:15px 25px 25px 0;display:flex;flex-direction:column;gap:10px;"><li>📌 <strong>Bring up</strong> – طرح موضوع جديد أثناء اجتماع. <em>"I will bring up the budget issues tomorrow."</em></li><li>🚫 <strong>Call off</strong> – إلغاء حدث أو اجتماع بالكامل. <em>"The manager had to call off the negotiation."</em></li><li>🕰️ <strong>Put off</strong> – تأجيل حدث لوقت لاحق. <em>"Let’s put off the review until next week."</em></li><li>🔍 <strong>Look into</strong> – التحقيق في أمر أو البحث فيه. <em>"The IT department will look into the server outage."</em></li><li>📝 <strong>Draw up</strong> – إعداد وثيقة رسمية أو عقد. <em>"The lawyers will draw up the agreement."</em></li><li>☕ <strong>Catch up</strong> – الاطلاع على أحدث التطورات أو اللحاق بالركب. <em>"Let’s grab coffee and catch up on the project."</em></li><li>👑 <strong>Take over</strong> – تولي السيطرة أو المسؤولية. <em>"She will take over as the new Director of Marketing."</em></li><li>👟 <strong>Step down</strong> – الاستقالة من منصب رسمي. <em>"The CEO decided to step down after ten years."</em></li><li>🛠️ <strong>Sort out</strong> – حل مشكلة بنجاح أو تنظيم التفاصيل. <em>"We need to sort out the supply chain issues."</em></li><li>⚙️ <strong>Set up</strong> – تأسيس، أو ترتيب، أو تنظيم نظام أو اجتماع. <em>"I will set up the conference call for 2 PM."</em></li></ul><p>إن دمج هذه التعبيرات بأناقة في اتصالاتك اليومية سيجعلك تبدو أكثر طلاقة وثقة واحترافية بين زملائك. 🌟</p>'
        }
    },
    2: {
        title: { en: 'How to Prepare for the IELTS Speaking Test 🗣️', ar: 'كيفية التحضير الاحترافي لاختبار التحدث في الايلتس 🗣️' },
        content: { 
            en: '<p>Achieving a Band 7 or higher in the IELTS speaking test requires more than just conversational fluency; it requires a highly organized, strategic approach. Here is an expert guide to maximizing your score:</p><h3 style="margin-top:25px;">1. Expand Your Lexical Resource 📚</h3><p>Avoid relying on simplistic vocabulary like "good" or "bad." Opt for highly descriptive alternatives such as "exceptional," "remarkable," or "detrimental." Demonstrating a broad and sophisticated vocabulary directly influences your band score.</p><h3 style="margin-top:25px;">2. Master Grammatical Range and Accuracy 🎯</h3><p>Examiners look for a variety of complex structures. Ensure you effectively utilize advanced grammatical forms, such as mixed conditionals, passive voice constructs, and diverse relative clauses, while maintaining high accuracy.</p><h3 style="margin-top:25px;">3. Cultivate Natural Fluency and Coherence 🌊</h3><p>Rote memorization is highly discouraged. Instead, focus on structuring your responses spontaneously but logically. Employ sophisticated cohesive devices like "furthermore," "nevertheless," and "conversely" to bridge your thoughts seamlessly.</p>',
            ar: '<p>لتحقيق درجة 7 أو أعلى في اختبار التحدث (IELTS)، فإن الأمر يتطلب أكثر من مجرد الطلاقة في المحادثة؛ بل يتطلب نهجاً استراتيجياً عالي التنظيم. إليك دليلاً احترافياً لتعزيز درجاتك:</p><h3 style="margin-top:25px;">1. الارتقاء بالموارد المعجمية 📚</h3><p>تجنب الاعتماد على المفردات التبسيطية مثل "good" أو "bad". اختر البدائل الوصفية الدقيقة مثل "exceptional" (استثنائي)، "remarkable" (ملحوظ)، أو "detrimental" (ضار). إظهار مفردات واسعة ومتطورة يؤثر بشكل مباشر وعميق في تقييمك.</p><h3 style="margin-top:25px;">2. إتقان النطاق النحوي والدقة 🎯</h3><p>يبحث الممتحنون عن مجموعة متنوعة من التراكيب المعقدة. تأكد من توظيف الأشكال النحوية المتقدمة بفعالية، مثل الجمل الشرطية المختلطة، وصيغ المبني للمجهول، وجمل الوصل المتنوعة، مع الحفاظ على دقة عالية.</p><h3 style="margin-top:25px;">3. تعزيز الطلاقة الطبيعية والترابط 🌊</h3><p>يُنصح بشدة بتجنب الحفظ عن ظهر قلب. بدلاً من ذلك، ركز على هيكلة ردودك بشكل عفوي ومنطقي. استخدم أدوات ربط لغوية رفيعة المستوى مثل "furthermore" (علاوة على ذلك)، "nevertheless" (ومع ذلك)، لربط أفكارك بسلاسة تامة.</p>'
        }
    },
    3: {
        title: { en: 'The Secret to Mastering English Pronunciation ✨', ar: 'السر وراء إتقان النطق الاحترافي للغة الإنجليزية ✨' },
        content: {
            en: '<p>Exceptional pronunciation is not merely about articulate enunciation of individual words; it encompasses the mastery of rhythm, strategic stress, and the inherent melodic flow of the English language. 🎵</p><h3 style="margin-top:25px;">Phonetic Word Stress 🗣️</h3><p>In English, emphasizing the correct syllable is crucial for clarity. For instance, in the noun <strong>"PHO-to-graph"</strong>, the initial syllable carries the primary stress. Conversely, in the derivative <strong>"pho-TO-gra-phy"</strong>, the stress correctly shifts to the second syllable.</p><h3 style="margin-top:25px;">Strategic Sentence Intonation 🎼</h3><p>Your vocal pitch acts as punctuation in spoken language. Notice how an upward inflection typically denotes an inquiry, whereas a descending pitch conclusively ends a declarative statement. Replicating authentic intonation patterns dramatically boosts your communicational confidence.</p><h3 style="margin-top:25px;">The Art of Connected Speech 🔗</h3><p>Fluent speakers rarely speak with rigid word-by-word separation. Instead of the mechanical "I want to go," you will frequently hear the blended "I wanna go." Mastering these phonetic linkages will significantly refine both your listening comprehension and spoken fluidity.</p>',
            ar: '<p>إن النطق الاستثنائي لا يقتصر فحسب على النطق الواضح للكلمات الفردية؛ بل يشمل إتقان الإيقاع، والتشديد الاستراتيجي، والتدفق اللحني المتأصل في اللغة الإنجليزية. 🎵</p><h3 style="margin-top:25px;">التشديد الصوتي في الكلمات 🗣️</h3><p>في اللغة الإنجليزية، يعتبر التأكيد على المقطع الصحيح أمراً حيوياً للوضوح. على سبيل المثال، في كلمة <strong>"PHO-to-graph"</strong>، يحمل المقطع الأول التشديد الرئيسي. ولكن، في مشتقتها <strong>"pho-TO-gra-phy"</strong>، ينتقل التشديد بشكل صحيح إلى المقطع الثاني.</p><h3 style="margin-top:25px;">التنغيم الاستراتيجي للجمل 🎼</h3><p>تعمل نبرة صوتك بمثابة علامات الترقيم في اللغة المنطوقة. لاحظ كيف يدل الصعود بالنبرة عادةً على سؤال، في حين أن النبرة الهابطة تنهي العبارة التقريرية بشكل حاسم. تكرار أنماط التنغيم الأصلية يعزز بشكل كبير من ثقتك التواصلية.</p><h3 style="margin-top:25px;">فن الكلام المتصل 🔗</h3><p>نادراً ما يتحدث المتحدثون بطلاقة بفصل جامد بين كلمة وأخرى. بدلاً من العبارة الآلية "I want to go"، ستسمع مراراً المزج السلس "I wanna go". إتقان هذه الروابط الصوتية سيصقل بشكل جذري كلاً من فهمك السماعي وتعابيرك المنطوقة.</p>'
        }
    },
    8: {
        title: { en: 'Overcoming the Fear of Speaking English 🛡️', ar: 'التغلب على الخوف من التحدث باللغة الإنجليزية 🛡️' },
        content: {
            en: '<p>Experiencing apprehension when conversing in a foreign language is a universally recognized cognitive barrier. Implementing robust psychological strategies can effectively dismantle this anxiety and foster communicative confidence: 🌱</p><h3 style="margin-top:25px;">Embrace Linguistic Errors as Data 📊</h3><p>Mistakes are not failures; they are critical data points indicating active learning. Every grammatical slip is an invaluable opportunity for refinement. It is worth noting that even native speakers frequently commit syntactic errors during rapid discourse.</p><h3 style="margin-top:25px;">Prioritize Efficacy Over Perfection 🎯</h3><p>The primary objective of language is the successful transmission of intent. If your interlocutor grasps your core message, you have executed successful communication! Syntactic perfection will naturally cultivate over time through consistent exposure and practice.</p><h3 style="margin-top:25px;">Implement Micro-Habits 🔄</h3><p>Begin by integrating subtle routines: engage in brief, low-stakes exchanges with colleagues, or employ solitary vocal practice. Leveraging AI-driven dialogue simulators provides a highly effective, zero-pressure environment to refine your conversational agility.</p>',
            ar: '<p>إن الشعور بالقلق عند المحادثة بلغة أجنبية هو حاجز إدراكي معترف به عالمياً. يمكن لتطبيق استراتيجيات نفسية قوية أن يفكك هذا القلق بفعالية ويعزز الثقة التواصلية: 🌱</p><h3 style="margin-top:25px;">تقبل الأخطاء اللغوية كبيانات 📊</h3><p>الأخطاء ليست إخفاقات؛ إنها نقاط بيانات حاسمة تشير إلى التعلم النشط. كل زلة نحوية هي فرصة لا تقدر بثمن للتحسين. تجدر الإشارة إلى أن حتى المتحدثين الأصليين يرتكبون أخطاء تركيبية بشكل متكرر أثناء الحديث السريع.</p><h3 style="margin-top:25px;">إعطاء الأولوية للفعالية على المثالية 🎯</h3><p>الهدف الأساسي للغة هو النقل الناجح للقصد الإدراكي. إذا فهم محاورك رسالتك الأساسية، فقد حققت تواصلاً ناجحاً! ستتطور المثالية النحوية بشكل طبيعي بمرور الوقت من خلال التعرض والممارسة المستمرة.</p><h3 style="margin-top:25px;">تطبيق العادات المصغرة 🔄</h3><p>ابدأ بدمج روتينيات خفيفة: انخرط في تبادلات قصيرة منخفضة المخاطر مع الزملاء، أو استخدم الممارسة الصوتية المنفردة. إن الاستفادة من محاكيات الحوار المعتمدة على الذكاء الاصطناعي توفر بيئة عالية الفعالية وخالية تماماً من الضغوط لصقل مرونتك الحوارية.</p>'
        }
    },
    9: {
        title: { en: 'Mastering English Tenses Once and For All ⏳', ar: 'إتقان أزمنة اللغة الإنجليزية باحترافية وبشكل نهائي ⏳' },
        content: {
            en: '<p>While the English chronological tense framework may initially appear convoluted, deconstructing it reveals a highly logical and systematic architecture. 🏗️</p><h3 style="margin-top:25px;">The Absolute Simplicity of Simple Tenses 🟢</h3><p>Deploy these forms categorically for established facts, recurring routines, and universal truisms. <br><em>Example: "I negotiate contracts" (A professional routine). "I finalized the report" (A categorically concluded past action).</em></p><h3 style="margin-top:25px;">The Dynamic Nature of Continuous Tenses 🌊</h3><p>Incorporate continuous forms to intentionally highlight the ongoing status or temporary nature of an action. <br><em>Example: "I am actively analyzing the data" (An action strictly confined to the present moment).</em></p><h3 style="margin-top:25px;">The Sophistication of Perfect Tenses 🏆</h3><p>Perfect tenses serve as contextual bridges between two distinct temporal planes. The Present Perfect constructs a critical link between a completed action and its immediate relevance to the current scenario. Mastery involves discerning when an action’s timeline is less relevant than its current operational impact.</p>',
            ar: '<p>على الرغم من أن الإطار الزمني للغة الإنجليزية قد يبدو معقداً في البداية، إلا أن تفكيكه يكشف عن بنية منطقية ومنهجية للغاية. 🏗️</p><h3 style="margin-top:25px;">البساطة المطلقة للأزمنة البسيطة 🟢</h3><p>استخدم هذه الصيغ بشكل قاطع للحقائق الثابتة، والروتين المتكرر، والمسلمات العالمية. <br><em>مثال: "I negotiate contracts" (روتين مهني). "I finalized the report" (إجراء ماضٍ محسوم بشكل قاطع).</em></p><h3 style="margin-top:25px;">الطبيعة الديناميكية للأزمنة المستمرة 🌊</h3><p>قم بدمج الصيغ المستمرة لتسليط الضوء عمداً على الحالة المستمرة أو الطبيعة المؤقتة لحدث ما. <br><em>مثال: "I am actively analyzing the data" (إجراء مقيد بدقة في اللحظة الحالية).</em></p><h3 style="margin-top:25px;">تعقيد ودقة الأزمنة التامة 🏆</h3><p>تعمل الأزمنة التامة كجسور سياقية بين مستويين زمنيين متمايزين. يبني المضارع التام (Present Perfect) رابطاً نقدياً بين حدث مكتمل وأهميته الفورية في السيناريو الحالي. يتضمن الإتقان التمييز بين متى يكون الجدول الزمني للإجراء أقل أهمية من تأثيره التشغيلي الحالي.</p>'
        }
    },
    10: {
        title: { en: 'Is Daily Practice Better Than Weekly Study? 📅', ar: 'التحليل العلمي: هل الممارسة اليومية تتفوق على الدراسة الأسبوعية؟ 📅' },
        content: {
            en: '<p>A perpetual dilemma among linguistic scholars and learners is the efficiency of concentrated blocks (e.g., three strenuous hours on a Sunday) versus distributed frequency (twenty minutes daily). Empirical educational psychology unequivocally sanctions the latter. 🧠</p><h3 style="margin-top:25px;">The Power of Spaced Repetition 🔁</h3><p>Neurological encoding primarily solidifies during rest cycles. Engaging in brief, recurrent learning intervals leverages multiple sleep cycles, fundamentally optimizing the neurological retention of novel lexicon and syntax structures.</p><h3 style="margin-top:25px;">Systematic Consistency Over Intense Bursts ⚡</h3><p>Instilling a daily regiment transforms language acquisition from an arduous task into an intrinsic lifestyle component. Over an extended timeline, this methodology generates exponential momentum, rendering cognitive load virtually imperceptible. The LingoWise analytics dashboard is architected explicitly to fortify and monitor these critical micro-habits.</p>',
            ar: '<p>معضلة دائمة بين علماء اللغة والمتعلمين هي مدى كفاءة الكتل المكثفة (مثل القراءة الشاقة لثلاث ساعات يوم الأحد) مقارنة بالتكرار الموزع (عشرين دقيقة يومياً). علم النفس التربوي التجريبي يؤيد بشكل لا لبس فيه الخيار الثاني. 🧠</p><h3 style="margin-top:25px;">قوة التكرار المتباعد 🔁</h3><p>يتم ترسيخ التشفير العصبي في المقام الأول خلال دورات الراحة. الانخراط في فترات تعلم قصيرة ومتكررة يستفيد من دورات نوم متعددة، مما يؤدي بشكل أساسي إلى تحسين الاحتفاظ العصبي بالمعجم الجديد والتراكيب اللغوية.</p><h3 style="margin-top:25px;">الاستمرارية المنهجية تتفوق على الاندفاعات المكثفة ⚡</h3><p>إن غرس نظام يومي يغير اكتساب اللغة من مهمة شاقة إلى مكون أساسي في أسلوب الحياة. على مدى زمني ممتد، تولد هذه المنهجية زخماً تصاعدياً، مما يجعل العبء الإدراكي غير محسوس تقريباً. تم تصميم لوحة تحليلات LingoWise خصيصاً لتعزيز ومراقبة هذه العادات المصغرة بالغة الأهمية.</p>'
        }
    }
};

function openBlogModal(id) {
    const modal = document.getElementById('blogModal');
    const contentArea = document.getElementById('blogContentArea');
    const post = BLOG_CONTENT[id] || { title: { en: 'New Post', ar: 'مقال جديد' }, content: { en: 'Content coming soon...', ar: 'المحتوى قريباً...' } };
    
    if (modal && contentArea) {
        contentArea.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:20px; gap:15px;">
                <h2 style="margin:0;">${post.title[lang]}</h2>
                <button class="btn btn-gold btn-sm" onclick="extractAIVocab('${id}')" style="flex-shrink:0;">
                    ✨ AI Extract Vocab
                </button>
            </div>
            <div style="line-height:1.6; font-size:1.1rem; color:var(--text-secondary);">
                ${post.content[lang]}
            </div>
            <div style="margin-top:30px; padding-top:20px; border-top:1px solid var(--border-subtle);">
                <button class="btn btn-primary" onclick="closeBlogModal()">${lang === 'ar' ? 'إغلاق' : 'Close'}</button>
            </div>
        `;
        modal.classList.add('active');
    }
}

async function extractAIVocab(id) {
    const post = BLOG_CONTENT[id];
    if (!post || !post.content.en) return;
    const content = post.content.en;

    showToast('info', lang === 'ar' ? 'جاري استخراج المفردات الذكية...' : 'Extracting smart vocabulary...');
    try {
        const response = await fetch('/api/ai/extract-vocab', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content })
        });
        const data = await response.json();
        if (data.success) {
            const vocab = getVocab();
            let added = 0;
            data.vocab.forEach(v => {
                 if(!vocab.find(existing => existing.word.toLowerCase() === v.en.toLowerCase())) {
                    vocab.unshift({ 
                        id: Date.now().toString() + Math.random(), 
                        word: v.en, 
                        translation: v.ar, 
                        category: 'AI Extracted', 
                        date: new Date().toISOString().split('T')[0] 
                    });
                    added++;
                }
            });
            if (added > 0) {
                saveVocab(vocab);
                if (typeof recordGoalProgress === 'function') recordGoalProgress('vocab', added);
                showToast('success', lang === 'ar' ? `تمت إضافة ${added} كلمات ذكية!` : `Added ${added} smart words!`);
                if (typeof updateVocabUIStrip === 'function') updateVocabUIStrip();
                if (typeof renderVocabGrid === 'function' && document.getElementById('vocabularyGrid')) renderVocabGrid();
            } else {
                showToast('info', lang === 'ar' ? 'الكلمات موجودة بالفعل.' : 'Words already in bank.');
            }
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        console.error('Extract Error:', error);
        const errorMessage = error.message ? error.message.toLowerCase() : '';
        const msg = errorMessage.includes('quota') || errorMessage.includes('too many requests')
            ? (lang === 'ar' ? 'عذراً، انتهت حصة الـ API المجانية لهذا اليوم.' : 'Sorry, the free API quota is exhausted for today.')
            : (lang === 'ar' ? 'فشل استخراج المفردات. تأكد من مفتاح API.' : 'Failed to extract vocabulary. Check API key.');
        showToast('error', msg);
    }
}

function resetLearningTracker() {
    const msg = lang === 'ar' 
        ? 'هل أنت متأكد أنك تريد مسح جميع بيانات تقدمك؟ لا يمكن التراجع عن هذا الإجراء.' 
        : 'Are you sure you want to clear all your progress? This action cannot be undone.';
    
    if (confirm(msg)) {
        localStorage.removeItem('lingowise_progress');
        localStorage.removeItem('lingowise_total_min');
        localStorage.removeItem('lingowise_today_min');
        localStorage.removeItem('lingowise_today_date');
        localStorage.removeItem('lingowise_vocab');

        localStorage.removeItem('lingowise_vocab_xp');
        localStorage.removeItem('lingowise_goals');
        localStorage.removeItem('lingowise_streak');
        localStorage.removeItem('lingowise_goals_date');

        
        showToast('success', lang === 'ar' ? 'تمت إعادة ضبط جميع البيانات بنجاح!' : 'Successfully reset all progress!');
        
        setTimeout(() => {
            location.reload();
        }, 1500);
    }
}

