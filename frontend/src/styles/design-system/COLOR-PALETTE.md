# Visual Color Palette Reference

Comprehensive color palette specifications for both **Verdant Signal (Light)** and **Obsidian & Forest (Dark)**.

---

## 1. Light Theme: Verdant Signal

Inspired by botanical gardens, sea glass, and calm Japanese architectural stationery.

### Foundations & Surfaces

| Role | Token Variable | Hex Code | Swatch Preview | Description | Contrast vs Canvas |
|---|---|---|---|---|---|
| Canvas Background | `--color-bg` | `#F6F8F5` | `[ #F6F8F5 ]` | Soft ivory parchment base | Base |
| Card Surface | `--color-surface` | `#FFFFFF` | `[ #FFFFFF ]` | Pure crisp white surface | 1.05:1 |
| Raised Surface | `--color-surface-raised` | `#FFFFFF` | `[ #FFFFFF ]` | Elevated floating cards | 1.05:1 |
| Sunken Base | `--color-surface-sunken` | `#EAF0ED` | `[ #EAF0ED ]` | Inset fields, progress tracks | 1.12:1 |
| Sidebar Surface | `--color-sidebar` | `#F0F5F2` | `[ #F0F5F2 ]` | Muted cool mist column | 1.06:1 |
| Sidebar Border | `--color-sidebar-border` | `#D6E1DD` | `[ #D6E1DD ]` | Sea-glass boundary | 1.25:1 |

### Typography & Foreground

| Role | Token Variable | Hex Code | Swatch Preview | Description | Contrast vs Surface |
|---|---|---|---|---|---|
| Primary Text | `--color-text` | `#193238` | `[ #193238 ]` | Deep slate ink | **13.6:1 (AAA)** |
| Muted Text | `--color-text-muted` | `#53666A` | `[ #53666A ]` | Cool mineral slate | **6.2:1 (AAA)** |
| Subtle Text | `--color-text-subtle` | `#5B7072` | `[ #5B7072 ]` | Subdued metadata | **4.9:1 (AA)** |
| Inverse Text | `--color-text-inverse` | `#FFFFFF` | `[ #FFFFFF ]` | Crisp white on dark buttons | **14.2:1 (AAA)** |

### Brand Accents & Interactive

| Role | Token Variable | Hex Code | Swatch Preview | Description |
|---|---|---|---|---|
| Brand Primary | `--color-primary` | `#0F766E` | `[ #0F766E ]` | Saturated botanical teal |
| Primary Hover | `--color-primary-hover` | `#115E59` | `[ #115E59 ]` | Deep conifer pine |
| Primary Container | `--color-primary-container` | `#D9F1EC` | `[ #D9F1EC ]` | Soft sea-glass pill fill |
| On-Primary Container | `--color-on-primary-container`| `#124F4A` | `[ #124F4A ]` | High-contrast conifer label |
| Brand Secondary | `--color-secondary` | `#315E67` | `[ #315E67 ]` | Slate teal supporting tone |
| Secondary Container | `--color-secondary-container`| `#E1ECEC` | `[ #E1ECEC ]` | Muted cool tag fill |
| Brand Tertiary | `--color-tertiary` | `#8B5A00` | `[ #8B5A00 ]` | Saffron amber for key achievements |
| Tertiary Container | `--color-tertiary-container` | `#F8E8C6` | `[ #F8E8C6 ]` | Warm golden highlight chip |

---

## 2. Dark Theme: Obsidian & Forest

Inspired by dense conifer alpine forests, high-altitude night skies, and carbon obsidian mineral structures.

### Foundations & Surfaces

| Role | Token Variable | Hex Code | Swatch Preview | Description | Contrast vs Canvas |
|---|---|---|---|---|---|
| Canvas Background | `--color-bg` | `#0E1111` | `[ #0E1111 ]` | Pure carbon obsidian canvas | Base |
| Card Surface | `--color-surface` | `#141919` | `[ #141919 ]` | Obsidian dark glass tile | 1.15:1 |
| Raised Surface | `--color-surface-raised` | `#1B2222` | `[ #1B2222 ]` | Elevated spruce card surface | 1.30:1 |
| Sunken Base | `--color-surface-sunken` | `#080A0A` | `[ #080A0A ]` | Dense dark foundation | 1.10:1 |
| Sidebar Surface | `--color-sidebar` | `#0A0D0D` | `[ #0A0D0D ]` | Obsidian shadow column | 1.05:1 |
| Sidebar Border | `--color-sidebar-border` | `#1F2726` | `[ #1F2726 ]` | Charcoal conifer seam | 1.25:1 |

### Typography & Foreground

| Role | Token Variable | Hex Code | Swatch Preview | Description | Contrast vs Surface |
|---|---|---|---|---|---|
| Primary Text | `--color-text` | `#EAECEB` | `[ #EAECEB ]` | Warm silver-parchment | **15.1:1 (AAA)** |
| Muted Text | `--color-text-muted` | `#96A09E` | `[ #96A09E ]` | Luminous silver-spruce | **6.6:1 (AAA)** |
| Subtle Text | `--color-text-subtle` | `#6B7674` | `[ #6B7674 ]` | Subdued metadata label | **3.7:1 (AA Large)** |
| Inverse Text | `--color-text-inverse` | `#0E1111` | `[ #0E1111 ]` | Carbon ink on bright chips | **15.1:1 (AAA)** |

### Brand Accents & Interactive

| Role | Token Variable | Hex Code | Swatch Preview | Description |
|---|---|---|---|---|
| Brand Primary | `--color-primary` | `#42946A` | `[ #42946A ]` | Luminous Alpine Forest Green |
| Primary Hover | `--color-primary-hover` | `#52A87C` | `[ #52A87C ]` | Vivid spruce emerald |
| Primary Container | `--color-primary-container` | `#122C1F` | `[ #122C1F ]` | Deep conifer pine pill fill |
| On-Primary Container | `--color-on-primary-container`| `#A2E0C0` | `[ #A2E0C0 ]` | Soft mint interactive text |
| Brand Secondary | `--color-secondary` | `#709686` | `[ #709686 ]` | Muted spruce sage |
| Secondary Container | `--color-secondary-container`| `#15241F` | `[ #15241F ]` | Subtle charcoal sage chip |
| Brand Tertiary | `--color-tertiary` | `#CFA363` | `[ #CFA363 ]` | Warm antique gold / champagne |
| Tertiary Container | `--color-tertiary-container` | `#2E2413` | `[ #2E2413 ]` | Deep amber shadow container |

---

## 3. Semantic Feedback Palette (Universal)

| Intent | Light Foreground | Light Container | Dark Foreground | Dark Container | Role |
|---|---|---|---|---|---|
| **Success** | `#217A50` | `#E6F5EC` | `#5EAA7C` | `#10251B` | Valid state, verified badge |
| **Warning** | `#8B5A00` | `#FFF3D6` | `#D6A756` | `#2A210F` | Caution, expiring state |
| **Error** | `#B42332` | `#FCEBEC` | `#E57373` | `#2B1618` | Validation failure, destructive |
| **Info** | `#245FC7` | `#EAF2FF` | `#7AA2D6` | `#122030` | System status, informational notice |

