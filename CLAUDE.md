# English Quest — Project Context for Claude Code

## 🎯 Проект

**English Quest** — дитячий курс англійської мови для дітей 6–9 років (рівень Pre-A1 → A1).
Продається як одноразова покупка ($12) з freemium моделлю (3 безкоштовних уроки).

**Живий сайт:** https://english-quest-kids.netlify.app
**GitHub:** https://github.com/Anton-dot911/english-quest.git

-----

## 📁 Структура файлів

```
english-quest/
├── index.html                  ← Головна сторінка (продаж)
├── checkout.html               ← Сторінка оплати
├── privacy.html                ← Політика конфіденційності
├── netlify.toml                ← Конфігурація Netlify
├── netlify/
│   └── functions/
│       └── send-email.js       ← Lambda функція відправки уроків (Brevo API)
├── audio/
│   └── spark/                  ← MP3 файли голосу Спарка (ElevenLabs)
│       ├── greeting-morning.mp3
│       ├── correct-1.mp3
│       ├── wrong-1.mp3
│       └── ... (42 файли)
└── lesson1_maksym.html         ← Уроки 1–24
    lesson2_maksym.html
    ...
    lesson24_maksym.html
```

-----

## 🎨 Дизайн — Неоморфізм

**ВАЖЛИВО:** Завжди використовувати hardcoded значення замість CSS змінних (Safari fix).

```css
/* Base */
background: #C8D8E4;

/* Surfaces */
background: linear-gradient(145deg, #DCE8F2, #C8D8E4);  /* світла */
background: linear-gradient(145deg, #B4C8D6, #C8D8E4);  /* темніша */

/* Тіні (неоморфізм) */
box-shadow: -8px -8px 20px rgba(255,255,255,1), 8px 8px 20px rgba(140,162,180,0.8);
box-shadow: inset 3px 3px 8px rgba(140,162,180,0.6), inset -3px -3px 8px rgba(255,255,255,0.8);

/* Текст */
color: #2A3A4A;   /* основний */
color: #6A8090;   /* другорядний */
color: #8AA0B0;   /* підписи */

/* Акценти */
background: linear-gradient(145deg, #4A90E8, #2A6AD8);  /* синя кнопка */
background: linear-gradient(145deg, #FFD700, #FFA500);  /* жовта кнопка */
background: linear-gradient(145deg, #28D068, #10A040);  /* зелена */
background: linear-gradient(145deg, #FF6B6B, #E03030);  /* червона */
```

**Шрифт:** `Nunito` (700, 900) — завжди підключати через Google Fonts.

**Border-radius:** 20–32px для карток, 14–16px для кнопок, 50px для таблеток.

-----

## 📚 Структура уроку

Кожен урок (`lessonN_maksym.html`) містить секції:

```
SECTION 0  — Головні фрази уроку (grammar-box)
           + 💬 Розмовна практика (діалог з вибором відповідей)
SECTION 1  — Нові слова (word cards з зображеннями та TTS)
SECTION 2  — Граматика (grammar-box з поясненням)
SECTION 3  — Вправи (quiz, matching, або fill-in)
SECTION 4  — Підсумок (confetti + кнопка наступного уроку)
```

**Навігація між секціями:** `goTo(sectionIndex)` — показує/ховає `.section` div-и.

**Безкоштовні уроки:** 1, 2, 3 — доступні всім.
**Платні уроки:** 4–24 — показують paywall якщо немає `eq_purchased=true` в localStorage.

-----

## 🐉 Персонаж Спарк

Маленький блакитний дракончик — друг, вчитель і помічник дитини.

**Характер:** веселий, трохи незграбний, завжди підтримує, ніколи не лає.
**Вік:** 8 років (як учень).
**Суперсила:** замість вогню видихає літери A, B, C.
**Крила:** схожі на сторінки книги.

**Мова спілкування:** мікс англійська + українська

- Ключові слова / вираз — англійською
- Пояснення / підтримка — українською

**Емоції Спарка:**

|Ситуація           |Емоція        |Emoji|
|-------------------|--------------|-----|
|Вхід на урок       |Радість       |🤩    |
|Правильна відповідь|Захват        |⭐    |
|Помилка            |Підбадьорення |🤗    |
|Підказка           |Зосередженість|🤔    |
|Завершення уроку   |Гордість      |🌟    |

**Аудіо файли** зберігаються в `/audio/spark/`, генеруються через ElevenLabs:

- Голос: `Adam` або `Callum`
- Модель: `eleven_multilingual_v2`
- Stability: 45, Similarity: 75, Style: 30

-----

## 📧 Backend — Email доставка

**Сервіс:** Brevo (SendinBlue)
**Відправник:** EnglishQuest labunuszn@gmail.com
**Функція:** `netlify/functions/send-email.js`

**Логіка:**

- `plan=free` → надсилає посилання на уроки 1, 2, 3
- `plan=full` → надсилає посилання на всі 24 уроки

**ВАЖЛИВО:** Файл повинен бути чистим CommonJS (без async/await top-level, без Unicode символів, без ES modules). Використовувати `require('https')` з Promise wrapper.

```javascript
// Правильна структура:
exports.handler = async function(event) { ... }
const https = require('https');
```

-----

## 💳 Оплата

**Сервіс:** WayForPay (реєстрація pending)
**Комісія:** 2.75%
**Підтримує:** ApplePay, GooglePay, Visa/MC
**Ціна:** $12 одноразово

**Поточний статус:** Реалізований mock checkout для тестування. Реальна інтеграція після реєстрації на wayforpay.com.

**Flow оплати:**

```
index.html → checkout.html?pn=&cn=&em= → форма картки
→ 4-stage loading (4.5s) → send-email (plan=full) → confetti + success
```

-----

## 🌐 Деплой

**Хостинг:** Netlify (auto-deploy з GitHub main branch)
**Функції:** Netlify Lambda (`netlify/functions/`)
**Змінні середовища в Netlify:**

- `BREVO_API_KEY` — ключ Brevo API

**Команда деплою:** просто `git push origin main`

-----

## 📊 Бізнес модель

|            |Безкоштовно|Повний курс|
|------------|-----------|-----------|
|Уроки       |1–3        |1–24       |
|Спарк AI чат|❌          |✅          |
|Перекладач  |❌          |✅          |
|Ціна        |$0         |$12        |

**Цільова аудиторія:** Батьки дітей 6–9 років в Україні.

-----

## ⚠️ Важливі правила

1. **Ніколи не використовувати CSS var()** — тільки hardcoded значення (#C8D8E4 тощо)
1. **send-email.js** — тільки чистий CommonJS, без Unicode в коментарях
1. **JS в уроках** — екранувати апострофи в українських словах (`сім\'я`)
1. **Кожен урок** — самодостатній HTML файл, без зовнішніх залежностей крім Google Fonts
1. **Спарк** — завжди позитивний, ніколи не каже “неправильно” напряму

-----

## 🔗 Корисні посилання

- Живий сайт: https://english-quest-kids.netlify.app
- GitHub: https://github.com/Anton-dot911/english-quest.git
- Netlify dashboard: https://app.netlify.com
- Brevo: https://app.brevo.com
- ElevenLabs: https://elevenlabs.io
- WayForPay: https://wayforpay.com
