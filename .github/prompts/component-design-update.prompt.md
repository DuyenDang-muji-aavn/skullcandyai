---
mode: 'agent'
model: 'Claude Sonnet 4.5'
tools: ['edit', 'runNotebooks', 'search', 'new', 'runCommands', 'runTasks', 'Nx Mcp Server/*', 'figma-mcp-server/*', 'usages', 'vscodeAPI', 'problems', 'changes', 'testFailure', 'openSimpleBrowser', 'fetch', 'githubRepo', 'extensions', 'todos']
description: 'Update an existing component in all aspects, respecting Figma constraints and project rules'
---

# Update Component Workspace Prompt

Update component `${input:ComponentName:Component name}` using current Figma MCP node selection 

## Referenced Instructions
- [Figma MCP Integration Rules](../instructions/figma-mcp.instructions.md)
- [Component Patterns & Design System](../instructions/component-patterns.instructions.md)
- [Documentation Standards](../instructions/documentation-standards.instructions.md)
- [Copilot Main Instructions](../copilot-instructions.md)

## Process

1. **Fetch Figma Design** 
   - Run `get_code` for current Figma node selection from MCP for metadata and code.
   - Run `get_screenshot` for visual reference.

2. **Measurement Rules**
   - ❌ NEVER estimate padding, gap, or measurements from screenshots!
   - ✅ ALWAYS use explicit Figma node metadata: `paddingLeft`, `paddingRight`, `paddingTop`, `paddingBottom`, `itemSpacing` and any constraints set in Figma.

3. **Code Update**
   - Refactor `src/components/${input:ComponentName.toLowerCase()}` (or correct folder).
   - Use only design tokens and semantic classes—no hardcoded sizes/colors.
   - Update variants and props API to match new Figma structure.

4. **Documentation**
   - Refresh `docs/components/${input:ComponentName}.md` using spec template.
   - Regenerate and update `docs/mapping/${input:ComponentName.toLowerCase()}.md` using mapping template.
   - Ensure all 18 sections (specs) and 8 sections (mapping) are up to date.
   
5. **Assets**
   - Run `get_assets(node_id="${input:NodeId}")`.
   - Optimize and reference only localhost/linked assets from the MCP payload.

6. **Finalization**
   - Update `.agent-memory.md` and `.agent-progress.json`.
   - Validate: pixel-perfect visual parity, WCAG 2.1 AA compliance, responsive breakpoints.

## Output & Confirmation
- Summarize code changes, metadata updates, and documentation changes.
- Ask for user confirmation before final application.

---

**Usage Example**  
Type `/update-component: ComponentName=Button, NodeId=123:456` in Copilot Chat, or use the play button.

---

**Project Standard Reminders**
- Never measure UI from PNG; always use Figma metadata.
- Always align tokens and layouts to project documentation.
