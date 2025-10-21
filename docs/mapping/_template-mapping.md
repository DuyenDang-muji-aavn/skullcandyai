---
description: Component mapping template
applyTo: "docs/mapping/*.md"
alwaysApply: true
---

# Component Mapping: {{ComponentName}}

| Property           | Value                                                                 |
|--------------------|-----------------------------------------------------------------------|
| **Figma Node**     | [Link](https://www.figma.com/...&node-id={{NodeId}})                  |
| **Component Path** | `src/components/{{component}}/`                                       |
| **Last Synced**    | YYYY-MM-DD                                                            |

## 1. Node Structure
```
{{ComponentName}} ({{NodeId}})
├─ SubLayer1 ({{SubNode1}})
└─ SubLayer2 ({{SubNode2}})
```

## 2. Property Mapping
| Figma Property | Value     | Code Prop        | Token                  |
|----------------|-----------|------------------|------------------------|
| Fill           | `#007AFF` | `bg-primary-500` | `--color-primary-500`  |
| Padding        | `16px`    | `p-4`            | `--spacing-4`          |

## 3. Token Extraction
| Category  | Figma Token   | Code Token      | Source File              |
|-----------|---------------|-----------------|--------------------------|
| Color     | Primary/500   | `primary-500`   | `src/styles/tokens.css`  |
| Spacing   | Spacing/4     | `spacing-4`     | `tailwind.config.ts`     |

## 4. Layout Guide
| Auto Layout    | Figma Setting  | CSS Class   | Notes                      |
|----------------|----------------|-------------|----------------------------|
| Direction      | Horizontal     | `flex`      | Default row               |
| Gap            | `8px`          | `gap-2`     | Matches spacing token     |

## 5. Variants Mapping
| Variant Name | Figma Variant ID | Prop Value         | Notes                    |
|--------------|------------------|--------------------|--------------------------|
| Default      | {{NodeId}}       | `variant="default"`| Base style               |
| Filled       | {{FilledId}}     | `variant="filled"` | Background primary       |

## 6. Assets
| Asset Name | Figma Path         | Dev Path                 | Usage                     |
|------------|--------------------|--------------------------|---------------------------|
| Icon       | `icons/close.svg`  | `public/assets/close.svg`| Close button icon         |

## 7. Implementation Notes
- Use `get_assets` to fetch assets directly from MCP  
- Optimize SVGs with SVGO before committing  
- Fallback to `<CloseIcon />` if asset missing

## 8. Update Log
| Date       | Change                                      | Author    |
|------------|---------------------------------------------|-----------|
| YYYY-MM-DD | Initial mapping                             | DevName   |
| YYYY-MM-DD | Added "filled" variant                     | DevName   |
