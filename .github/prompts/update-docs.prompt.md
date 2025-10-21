---
mode: 'agent'
model: 'Claude Sonnet 4.5'
description: 'Refresh documentation for a component spec and mapping, using explicit Figma metadata and project documentation standards.'
---

# Update Component Documentation Workspace Prompt

Update the documentation (spec and mapping) for component `${input:ComponentName:Component name}` using the latest Figma design at node-id `${input:NodeId:Node ID}`.

## Reference Instructions
- [Documentation Standards](../instructions/documentation-standards.instructions.md)
- [Component Patterns & Design System](../instructions/component-patterns.instructions.md)
- [Figma MCP Integration Rules](../instructions/figma-mcp.instructions.md)
- [Copilot Main Instructions](../copilot-instructions.md)

## Workflow

1. **Retrieve Figma Metadata**
   - Use `get_code()` to get full measurement/constraint details.
   - Never estimate padding or gaps from screenshots; always use Figma node metadata.

2. **Update Spec Doc**
   - Edit `docs/components/${input:ComponentName}.md` to match all details: specs, variants, typography, colors, spacing, effects, layout.
   - Ensure all 18 documentation sections are current and accurate.

3. **Update Mapping Doc**
   - Edit `docs/mapping/${input:ComponentName.toLowerCase()}.md` and sync: node structure, property mapping, exact tokens, layout guide, variants.
   - Ensure all 8 mapping sections are included.

4. **Cross-Reference and Assets**
   - Validate links between docs, mapping, code, and Figma (node ID).
   - If any design asset changed, reference new MCP assets (do not infer values from screenshots).

5. **Quality Checks**
   - Confirm frontmatter is set.
   - Validate against project tokens and accessibility standards.

6. **Finalize**
   - Update `.agent-memory.md` and `.agent-progress.json`.
   - Summarize changes made and ask for confirmation before committing.

