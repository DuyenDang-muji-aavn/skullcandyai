---
mode: 'agent'
model: 'GPT-4o'
tools: ['edit', 'runNotebooks', 'search', 'new', 'runCommands', 'runTasks', 'Nx Mcp Server/*', 'figma-mcp-server/*', 'usages', 'vscodeAPI', 'problems', 'changes', 'testFailure', 'openSimpleBrowser', 'fetch', 'githubRepo', 'extensions', 'todos']
description: 'Generate a new component across code, docs, mapping, and assets, using explicit constraints from Figma metadata only'
---

# Create New Component Workspace Prompt

Generate a new component `${input:ComponentName:Component name}` using Figma selection on MCP.

## Referenced Instructions
- [Figma MCP Integration Rules](../instructions/figma-mcp.instructions.md)
- [Component Patterns & Design System](../instructions/component-patterns.instructions.md)
- [Documentation Standards](../instructions/documentation-standards.instructions.md)
- [Copilot Main Instructions](../copilot-instructions.md)

## Workflow

1. **Fetch Figma Data**
   - Use `get_code()` for node structure and spec constraints.
   - Use `get_screenshot()` for reference (do NOT extract measurements!).
   - Use Figma metadata fields for constraints and sizing (e.g., `paddingLeft`, `paddingTop`, `itemSpacing`, etc).

2. **Code Generation**
   - Scaffold `src/components/${input:ComponentName.toLowerCase()}/${input:ComponentName}.tsx` following project patterns.
   - Use project design tokens (`tokens.css`, `tailwind.config.ts`). Never hardcode sizes or colors.

3. **Documentation**
   - Create `docs/components/${input:ComponentName}.md` from the spec template.
   - Create `docs/mapping/${input:ComponentName.toLowerCase()}.md` from the mapping template.
   - Fill all required sections referencing Figma metadata, tokens, and architecture.

4. **Assets**
   - Fetch via `get_assets(node_id="${input:NodeId}")`.
   - Place assets in `public/assets/` as needed, optimizing SVGs.

5. **Finalize**
   - Update `.agent-memory.md` and `.agent-progress.json`.
   - Set up mapping and cross-references for future updates.

6. **Validation**
   - Confirm use of semantic tokens and layout patterns.
   - Validate accessibility (WCAG 2.1 AA) and responsiveness.

## Reminders
- **Never infer measurements from screenshots; always use Figma constraints and metadata.**
- **Comply with referenced instruction files for code, docs, mapping, and design rules.**

## Output
- Summarize created files, mappings, and assets. Ask for user confirmation before commit.

