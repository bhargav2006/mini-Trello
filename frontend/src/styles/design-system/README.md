# Verdant & Obsidian Global Design System

A production-ready, framework-agnostic design system built for high-performance engineering portfolios, enterprise dashboards, developer portals, and SaaS interfaces.

Developed by **Katakam Bhargav**.

---

## Features

- **Dual-Aesthetic Excellence**:
  - **Verdant Signal (Light)**: Calm, botanical ivory and soft sea-glass teal.
  - **Obsidian & Forest (Dark)**: Deep carbon obsidian surfaces with luminous alpine forest-green accents.
- **W3C Design Tokens**: Complete JSON definitions compatible with Style Dictionary, Figma Tokens, and Tailwind CSS.
- **Three-Tier Architecture**: Primitives $\rightarrow$ Semantic Role Tokens $\rightarrow$ Component Specifications.
- **WCAG AA / AAA Certified**: Contrast ratios mathematically calculated and verified for all text and interactive states.
- **Universal Compatibility**: Zero framework lock-in. Works effortlessly with plain HTML/CSS, React, Vite, Next.js, Vue, Svelte, or SSR templates.

---

## Package Contents

```
D:\DesignSystems\Global-Design-System\
├── tokens.json              # Complete W3C-compliant token specifications
├── tokens.css               # Primitive scales (typography, spacing, radius, motion)
├── themes.css               # Light & Dark theme variable bindings
├── components.css           # Production-ready component classes
├── theme.js                 # Framework-agnostic theme controller & event dispatcher
├── preview.html             # Interactive visual showcase and design audit suite
├── DESIGN-SYSTEM.md         # Comprehensive architecture and usage guide
├── COLOR-PALETTE.md         # Visual swatch palette & color specifications
├── COMPONENT-COLOR-GUIDE.md # Component-specific color mapping & states
├── ACCESSIBILITY.md         # WCAG AA/AAA contrast matrix & audit report
└── README.md                # This document
```

---

## Installation & Setup

### Option 1: Vanilla HTML / Multi-Page Web Apps

Copy the `Global-Design-System` folder into your project's assets or vendor directory:

```html
<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>My Engineering Project</title>

  <!-- Load Global Design System -->
  <link rel="stylesheet" href="./design-system/tokens.css" />
  <link rel="stylesheet" href="./design-system/themes.css" />
  <link rel="stylesheet" href="./design-system/components.css" />

  <!-- Anti-FOUC Theme Initializer -->
  <script src="./design-system/theme.js"></script>
  <script>
    GDSTheme.init();
  </script>
</head>
<body>
  <!-- Use Component Classes -->
  <button class="gds-btn gds-btn-primary">View Projects</button>
  <button class="gds-btn gds-btn-secondary" onclick="GDSTheme.toggleTheme()">Toggle Theme</button>
</body>
</html>
```

---

### Option 2: React (Vite / Next.js / Create React App)

In your root layout or main entry file (`src/main.tsx` or `src/app/layout.tsx`):

```tsx
import React, { useEffect, useState } from 'react';
import './design-system/tokens.css';
import './design-system/themes.css';
import './design-system/components.css';
import GDSTheme from './design-system/theme.js';

export default function App() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const active = GDSTheme.init();
    setTheme(active);
    return GDSTheme.subscribe((nextTheme) => setTheme(nextTheme));
  }, []);

  return (
    <div className="min-h-screen">
      <header className="p-4 flex justify-between items-center border-b" style={{ borderColor: 'var(--color-border)' }}>
        <h1 className="text-xl font-bold" style={{ color: 'var(--color-text)' }}>Katakam Bhargav</h1>
        <button
          className="gds-btn gds-btn-secondary"
          onClick={() => GDSTheme.toggleTheme()}
        >
          {theme === 'dark' ? '☀️ Switch to Light' : '🌙 Switch to Dark'}
        </button>
      </header>
      <main className="p-8">
        <div className="gds-card">
          <h2 className="gds-card-title">Full Stack Application</h2>
          <p className="gds-card-desc">Production-ready Java Spring Boot & React architecture.</p>
          <div className="mt-4 flex gap-2">
            <span className="gds-badge gds-badge-primary">Spring Boot</span>
            <span className="gds-badge">React</span>
          </div>
        </div>
      </main>
    </div>
  );
}
```

---

### Option 3: Integration with Tailwind CSS

In `tailwind.config.js`:

```javascript
module.exports = {
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--color-bg)',
        surface: 'var(--color-surface)',
        'surface-raised': 'var(--color-surface-raised)',
        'surface-sunken': 'var(--color-surface-sunken)',
        text: 'var(--color-text)',
        'text-muted': 'var(--color-text-muted)',
        primary: {
          DEFAULT: 'var(--color-primary)',
          hover: 'var(--color-primary-hover)',
          container: 'var(--color-primary-container)',
          'on-container': 'var(--color-on-primary-container)',
        },
        secondary: 'var(--color-secondary)',
        border: 'var(--color-border)',
      },
      fontFamily: {
        sans: ['var(--gds-font-sans)'],
        mono: ['var(--gds-font-mono)'],
      }
    }
  }
}
```

---

## Interactive Visual Audit Preview

Open `D:\DesignSystems\Global-Design-System\preview.html` in any browser to inspect live swatches, interactive buttons, cards, typography scales, and test theme switching in real time.

