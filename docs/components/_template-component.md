---
description: Component specification template
applyTo: "docs/components/*.md"
alwaysApply: true
---

# {{ComponentName}}

| Property       | Value                                                   |
| -------------- | ------------------------------------------------------- |
| **Last Updated** | YYYY-MM-DD                                            |
| **Status**       | ✅ Implemented / 🚧 In Progress / 📋 Planned            |
| **Figma**        | [Link to Figma node](https://www.figma.com/...&node-id={{NodeId}}) |
| **Node ID**      | {{NodeId}}                                             |

## Table of Contents
1. Overview
2. Specs
3. Variants
4. Typography
5. Colors
6. Spacing
7. Effects
8. Layout
9. Responsive
10. States
11. Accessibility
12. Props API
13. Usage
14. Examples
15. Edge Cases
16. Theming
17. Performance
18. References

---

## 1. Overview
Brief 2–3 sentence description of the component’s purpose and behavior.

## 2. Specs
| Property        | Value       | Token                |
| --------------- | ----------- | -------------------- |
| Width           | {{Width}}px | `--size-{{widthToken}}` |
| Height          | {{Height}}px| `--size-{{heightToken}}` |
| Border Radius   | {{Radius}}px| `--radius-{{radiusToken}}` |

## 3. Variants
| Variant Name | Description                     | Props                   |
| ------------ | ------------------------------- | ----------------------- |
| Default      | Base style                      | `{ variant: 'default' }`|
| Outline      | Border only                    | `{ variant: 'outline' }`|

## 4. Typography
| Style        | Font Size | Token                 |
| ------------ | --------- | --------------------- |
| Body         | 16px      | `body-md`             |
| Heading      | 24px      | `heading-lg`          |

## 5. Colors
| Element      | Color Token         | Value    |
| ------------ | ------------------- | -------- |
| Background   | `primary-500`       | #007AFF  |
| Text         | `neutral-900`       | #1A1A1A  |

## 6. Spacing
| Property     | Value    | Token        |
| ------------ | -------- | ------------ |
| Padding      | 16px     | `p-4`        |
| Gap          | 8px      | `gap-2`      |

## 7. Effects
| Effect       | Class              | Token        |
| ------------ | ------------------ | ------------ |
| Shadow       | `shadow-md`        | `--shadow-md`|
| Border       | `border`           | `--border`   |

## 8. Layout
```tsx
<div className="flex items-center justify-between gap-4">
  // Elements
</div>
```

## 9. Responsive
| Breakpoint | Class        | Behavior                        |
| ---------- | ------------ | ------------------------------- |
| md         | `md:flex-row`| Row on tablet and above         |
| lg         | `lg:flex-col`| Column on desktop               |

## 10. States
| State    | Behavior/Class                 |
| -------- | ------------------------------ |
| Hover    | `hover:bg-primary-600`         |
| Active   | `active:scale-95`              |
| Disabled | `opacity-50 cursor-not-allowed`|

## 11. Accessibility
- Role: `button`
- ARIA attributes: `aria-pressed`, `aria-label`
- Keyboard: `Enter`/`Space` triggers

## 12. Props API
```ts
interface {{ComponentName}}Props {
  variant?: 'default'|'outline';
  size?: 'sm'|'md'|'lg';
  disabled?: boolean;
  onClick?: () => void;
}
```

## 13. Usage
```tsx
<{{ComponentName}} variant="default" size="md">Label</{{ComponentName}}>
```

## 14. Examples
```tsx
<{{ComponentName}} variant="outline">Outline</{{ComponentName}}>
<{{ComponentName}} disabled>Disabled</{{ComponentName}}>
```

## 15. Edge Cases
- Long text truncation
- RTL support

## 16. Theming
- Supports dark mode via `dark:` classes

## 17. Performance
- Memoized with `React.memo`
- Minimal re-renders on prop changes

## 18. References
- Mapping: `docs/mapping/{{component}}.md`
- Code: `src/components/{{component}}/{{ComponentName}}.tsx`
- Figma: [Design File](https://www.figma.com/...)
