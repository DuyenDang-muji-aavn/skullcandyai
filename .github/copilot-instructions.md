# SkullCandy Project - GitHub Copilot Instructions

> **Last Updated**: 2025-10-16  
> **Project**: SkullCandy | **Org**: ePost | **Design System**: DevDaySkullCandy

---

## 📋 Quick Reference

| Resource           | Location                                           |
|--------------------|-----------------------------------------------------|
| **Figma Design**   | [SkullCandy Design](https://www.figma.com/design/V8UvDvpedWuc7biBBVPi7C/SkullCandy?node-id=0-1) |
| **Config**         | `.designrc.json`                                    |
| **Components**     | `src/components/`                                   |
| **Specs**          | `docs/components/`                                  |
| **Mapping**        | `docs/mapping/`                                     |
| **Styles**         | `src/styles/tokens.css`, `tailwind.config.ts`       |
| **Agent Memory**   | `.github/.agent-memory.md` (auto-managed)           |
| **Progress**       | `.github/.agent-progress.json` (auto-managed)       |

---

## 🎯 Core Principles

**1. Autonomous Decision Making**
- Auto-execute routine tasks: dependency installs, lint fixes, memory updates
- Provide A/B/C options for architectural or breaking changes
- Never ask open-ended questions; always offer specific choices

**2. Memory Efficiency**
- Keep `.agent-memory.md` under 2KB; consolidate often
- Use structured sections: Current Context, Project State, Next Steps

**3. Environment Awareness**
- Verify terminals before spawning new ones
- Check file existence and permissions
- Use relative paths from project root

---

## 🚀 Standard Workflows

### Component Implementation
1. Read spec: `docs/components/<Component>.md`
2. Check mapping: `docs/mapping/<component>.md`
3. Implement in `src/components/` using tokens and existing components
4. Update docs: spec + mapping
5. Update `.agent-memory.md` and `.agent-progress.json`

### Figma-to-Code Translation
1. `get_code` → structured code
2. `get_screenshot` → visual reference
3. `get_assets` → download assets
4. Transform MCP output into project conventions
5. Validate against Figma for parity and accessibility

### Documentation Updates
- After each component creation/modification
- Keep spec and mapping docs in sync
- Update memory and progress files

---

## 🛠️ Generate New Component Flow

**When user requests a new component:**

1. **Copy Specs Template**
   ```bash
   cp docs/components/_template-component.md docs/components/<Component>.md
   ```
2. **Replace Placeholders**
   - `{{ComponentName}}`, `{{NodeId}}`, dimensions, tokens
3. **Copy Mapping Template**
   ```bash
   cp docs/mapping/_template-mapping.md docs/mapping/<component>.md
   ```
4. **Replace Mapping Placeholders**
   - `{{ComponentName}}`, `{{component}}`, `{{NodeId}}`, variant IDs
5. **Update Agent Memory**
   - Add new file entries under "Files Modified"
6. **Initialize Progress**
   - Add new task in `.agent-progress.json`

**Command Example:**
```
@workspace Generate new component "Card" with node-id 234:567
```
Agent actions:
- Copy and populate `Card.md` spec
- Copy and populate `card.md` mapping
- Create `src/components/card/Card.tsx` scaffold
- Update memory and progress files

---

## 📁 Project Structure

```
SKULLCANDY2/
├── .github/
│   ├── copilot-instructions.md          # Main instructions
│   ├── instructions/
│   │   ├── component-patterns.instructions.md
│   │   ├── figma-mcp.instructions.md
│   │   └── documentation-standards.instructions.md
│   ├── .agent-memory.md                 # Runtime context
│   └── .agent-progress.json             # Task tracking
├── .designrc.json                       # Config metadata
├── docs/
│   ├── components/
│   │   └── _template-component.md       # Spec template
│   └── mapping/
│       └── _template-mapping.md         # Mapping template
├── src/
│   └── components/
└── src/styles/
    └── tokens.css
```

---

## 🔍 Validation Checklist

- [ ] Templates present in `docs/components/` and `docs/mapping/`
- [ ] `applyTo` frontmatter on templates
- [ ] `.gitignore` ignores underscore templates
- [ ] New component flow tested with sample component

---

## 📚 References
- [Figma MCP Rules](instructions/figma-mcp.instructions.md)
- [Component Patterns](instructions/component-patterns.instructions.md)
- [Documentation Standards](instructions/documentation-standards.instructions.md)

