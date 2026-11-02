# Verdant & Obsidian Global Design System

> **A Cross-Framework Design Foundation Pairing Botanical Verdant Signal with Executive Obsidian & Forest**  
> Architected for Katakam Bhargav's production software ecosystems.

---

## 1. System Vision & Overview

The **Verdant & Obsidian Global Design System** provides an independent, framework-agnostic design architecture tailored for modern engineering portfolios, dashboards, developer documentation, and full-stack web applications.

It bridges two distinct, high-craft aesthetic worlds:
1. **Verdant Signal (Light Theme)**: Crisp, calm ivory and soft-white surfaces (`#F6F8F5`), botanical deep-teal accents (`#0F766E`), slate-teal metadata (`#315E67`), and saffron-gold container highlights.
2. **Obsidian & Forest (Dark Theme)**: Dense carbon foundations (`#0E1111`), elevated obsidian surfaces (`#141919`), luminous Alpine Forest Green branding (`#42946A`), silver-white parchment text (`#EAECEB`), and restrained antique-gold highlights (`#CFA363`).

Both themes share an identical **Three-Tier Semantic Token Architecture**, allowing instantaneous theme switching with zero DOM restructuring or layout shifts.

---

## 2. Directory & Architecture Map

```
D:\DesignSystems\Global-Design-System\
├── tokens.json              # Complete W3C-compliant token specifications
├── tokens.css               # Primitive scales (typography, spacing, radius, motion)
├── themes.css               # Light & Dark theme variable bindings
├── components.css           # Production-ready component classes
├── theme.js                 # Framework-agnostic theme controller & event dispatcher
├── preview.html             # Interactive visual showcase and design audit suite
├── COLOR-PALETTE.md         # Visual swatch palette & color specifications
├── COMPONENT-COLOR-GUIDE.md # Component-specific color mapping & states
├── ACCESSIBILITY.md         # WCAG AA/AAA contrast matrix & audit report
└── README.md                # Installation & framework integration recipes
```

---

## 3. Token Tiering Strategy

The system enforces a strict 3-layer token separation:

```
┌────────────────────────────────────────────────────────┐
│ 1. Primitives (tokens.css & tokens.json)               │
│ Raw values: --gds-space-4: 1rem; --color-teal-800      │
└──────────────────────────┬─────────────────────────────┘
                           │ mapped to
┌──────────────────────────▼─────────────────────────────┐
│ 2. Semantic Role Tokens (themes.css)                   │
│ Contextual tokens: --color-primary, --color-bg, etc.   │
└──────────────────────────┬─────────────────────────────┘
                           │ aliased to
┌──────────────────────────▼─────────────────────────────┐
│ 3. Component Tokens (components.css)                   │
│ Component specs: --card-bg, --nav-active-bg, etc.     │
└────────────────────────────────────────────────────────┘
```

---

## 4. Quick Start & Integration

### A. Plain HTML & CSS

Link the stylesheets in your `<head>`:

```html
<link rel="stylesheet" href="tokens.css" />
<link rel="stylesheet" href="themes.css" />
<link rel="stylesheet" href="components.css" />
<script src="theme.js"></script>
<script>
  // Prevent FOUC
  GDSTheme.init();
</script>
```

### B. React & Vite / Next.js

Import directly into your global entry file (`main.tsx` or `layout.tsx`):

```tsx
import './design-system/tokens.css';
import './design-system/themes.css';
import './design-system/components.css';
import GDSTheme from './design-system/theme.js';

export function ThemeToggle() {
  return (
    <button
      onClick={() => GDSTheme.toggleTheme()}
      className="gds-btn gds-btn-secondary"
      aria-label="Toggle theme"
    >
      Toggle Theme
    </button>
  );
}
```

---

## 5. Core Theme Tokens Summary

| Semantic Role | Token Variable | Verdant Signal (Light) | Obsidian & Forest (Dark) |
|---|---|---|---|
| **Canvas Background** | `--color-bg` | `#F6F8F5` | `#0E1111` |
| **Default Surface** | `--color-surface` | `#FFFFFF` | `#141919` |
| **Elevated Surface** | `--color-surface-raised` | `#FFFFFF` | `#1B2222` |
| **Sunken Base** | `--color-surface-sunken` | `#EAF0ED` | `#080A0A` |
| **Sidebar Canvas** | `--color-sidebar` | `#F0F5F2` | `#0A0D0D` |
| **Primary Text** | `--color-text` | `#193238` (13.6:1 AAA) | `#EAECEB` (15.1:1 AAA) |
| **Muted Text** | `--color-text-muted` | `#53666A` (6.2:1 AAA) | `#96A09E` (6.6:1 AAA) |
| **Subtle Label** | `--color-text-subtle` | `#5B7072` (4.9:1 AA) | `#6B7674` (3.7:1 AA Large) |
| **Subtle Border** | `--color-border` | `#D6E1DD` | `#232B2B` |
| **Control Border** | `--color-control-border` | `#7C928C` | `#384646` |
| **Brand Primary** | `--color-primary` | `#0F766E` | `#42946A` |
| **Primary Container**| `--color-primary-container` | `#D9F1EC` | `#122C1F` |
| **Brand Secondary** | `--color-secondary` | `#315E67` | `#709686` |
| **Brand Tertiary** | `--color-tertiary` | `#8B5A00` | `#CFA363` |

---

## 6. Extending the Design System

To add project-specific components without breaking global rules:
1. Never hardcode hex codes in component CSS.
2. Reference semantic tokens (`var(--color-primary)`, `var(--color-surface)`).
3. Prefix custom classes with your project scope (e.g., `.app-card`, `.dashboard-stat`).

