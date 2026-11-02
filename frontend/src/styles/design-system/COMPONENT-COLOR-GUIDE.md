# Component Color Specification Guide

Detailed color mappings and state behaviors for all 20 primary interface components.

---

## 1. Navigation & Sidebar
- **Background**: `var(--color-sidebar)` (`#F0F5F2` Light / `#0A0D0D` Dark)
- **Border Seam**: `var(--color-sidebar-border)` (`#D6E1DD` Light / `#1F2726` Dark)
- **Default Links**: `var(--color-text-muted)` (`#53666A` Light / `#96A09E` Dark)
- **Link Hover**: `var(--color-text)` on `var(--color-surface-sunken)`
- **Active Nav Item**: 
  - Fill: `var(--nav-active-bg)` (`#D9F1EC` Light / `#122C1F` Dark)
  - Text: `var(--nav-active-text)` (`#124F4A` Light / `#A2E0C0` Dark)
  - Border: 1px solid `rgba(66, 148, 106, 0.28)`

---

## 2. Hero Section
- **Background**: `var(--color-bg)` with overlaying 3D flowing light ribbon canvas
- **Status Badge ("Welcome to my portfolio")**:
  - Fill: `var(--color-primary-container)`
  - Text: `var(--color-on-primary-container)`
  - Border: `1px solid rgba(var(--color-primary), 0.25)`
- **Greeting ("Hi, I'm")**: `var(--color-text-muted)`
- **Hero Name ("Katakam Bhargav")**:
  - *Dark Theme*: `linear-gradient(135deg, #EAECEB 20%, #42946A 75%, #709686 100%)` with soft bloom drop-shadow
  - *Light Theme*: `linear-gradient(135deg, #163630 15%, #0F766E 65%, #2D8A74 100%)`
- **Dynamic Typewriter Text**: `var(--color-primary)` (`#0F766E` Light / `#42946A` Dark)
- **Hero Body Description**: `var(--color-text-muted)`

---

## 3. Hero Profile Photograph Surroundings
- **Background Glow Halo (`.gds-photo-glow`)**:
  - *Dark Theme*: Multi-stop radial aura `rgba(66, 148, 106, 0.40)` core + `rgba(147, 220, 178, 0.22)` rim flare
  - *Light Theme*: Multi-stop radial aura `rgba(34, 120, 80, 0.24)` core + `rgba(110, 231, 183, 0.18)` rim flare
- **Photo Tile Border**:
  - *Dark Theme*: 1.5px solid `rgba(255, 255, 255, 0.12)`
  - *Light Theme*: 2px solid `rgba(34, 120, 80, 0.20)`
- **Floating Physical Elevation Shadow**:
  - *Dark Theme*: 4-tier shadow stack `0 32px 64px -16px rgba(0, 0, 0, 0.80), 0 0 0 1px rgba(66, 148, 106, 0.25)`
  - *Light Theme*: Botanical depth stack `0 28px 56px -12px rgba(20, 50, 35, 0.12), 0 0 0 1px rgba(34, 120, 80, 0.15)`

---

## 4. Cards (Projects, Skills, Education, Certifications)
- **Surface Fill**: `var(--card-bg)` (`#FFFFFF` Light / `#141919` Dark)
- **Border**: `1px solid var(--card-border)` (`#D6E1DD` Light / `#232B2B` Dark)
- **Hover State**:
  - Border: `var(--card-border-hover)` (`#0F766E` Light / `#42946A` Dark)
  - Elevation: Lift `-4px`, Box-shadow `var(--shadow-popover)`
- **Card Title**: `var(--color-text)`
- **Card Description**: `var(--color-text-muted)`
- **Card Tag/Chip**: `var(--badge-bg)` fill with `var(--badge-text)` text

---

## 5. Buttons (Primary, Secondary, Ghost, Destructive)
- **Primary Action**:
  - Default: Background `var(--color-primary)`, Text `var(--color-on-primary)`
  - Hover: Background `var(--color-primary-hover)`, Lift `-2px`
  - Active: Scale `0.98`, Background `var(--color-primary-active)`
  - Focus Ring: `3px solid var(--color-focus)`, offset `3px`
- **Secondary Action**:
  - Default: Background `var(--color-surface-raised)`, Border `var(--color-control-border)`, Text `var(--color-text)`
  - Hover: Border `var(--color-primary)`, Background `var(--color-surface-sunken)`
- **Ghost Action**:
  - Default: Background `transparent`, Text `var(--color-text)`
  - Hover: Background `var(--color-primary-container)`, Text `var(--color-on-primary-container)`
- **Destructive Action**:
  - Default: Background `var(--color-error)`, Text `var(--color-text-inverse)`
  - Hover: Opacity `0.9`

---

## 6. Form Controls & Inputs
- **Input Fill**: `var(--input-bg)` (`#FFFFFF` Light / `#080A0A` Dark)
- **Input Border**: `1px solid var(--input-border)` (`#7C928C` Light / `#384646` Dark)
- **Text Color**: `var(--color-text)`
- **Placeholder Color**: `var(--color-text-subtle)`
- **Focus Ring**: `0 0 0 3px rgba(66, 148, 106, 0.25)` Dark / `0 0 0 3px rgba(15, 118, 110, 0.22)` Light

---

## 7. Modals, Dropdowns & Overlays
- **Backdrop Overlay**: `var(--color-overlay)` (`rgba(16, 38, 42, 0.48)` Light / `rgba(0, 0, 0, 0.75)` Dark) with `backdrop-filter: blur(8px)`
- **Modal Surface**: `var(--color-surface)` (`#FFFFFF` Light / `#141919` Dark)
- **Modal Border**: `1px solid var(--color-border)`
- **Modal Shadow**: `var(--shadow-popover)`

---

## 8. Footer
- **Background**: `var(--color-sidebar)`
- **Top Border**: `1px solid var(--color-border)`
- **Text**: `var(--color-text-muted)`
- **Links Hover**: `var(--color-primary)`

