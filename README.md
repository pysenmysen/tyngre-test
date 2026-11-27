# Greb starter

Start a project's front end from its Figma file. GrebFig exports the file's design system
(every variable, one Spec per component, icons and images), an AI agent builds the
components from that export and Figma's MCP, and the preview shows the stylesheet and every
component. Design changes made in code go back to Figma as proposals, for the designer to
apply.

## What you need

- Node 22 or later
- An AI agent that works in a repo: Claude Code, or Codex in ChatGPT. Both read AGENTS.md.
- Figma's MCP server connected to the agent, with access to the project's Figma file
- The GrebFig plugin in Figma (from the shared Drive folder *Grebban shared files › GrebFig*)
- The Figma file made from Grebban's template, so GrebFig can read it

## Start a project

1. On GitHub: **Use this template › Create a new repository** in the Grebban organization.
   Clone it.
2. `npm install`
3. In Figma, fill in the **Client** line in the Project Spec: the preview is titled
   *[Client] Stylesheet*. Then **GrebFig › Foundations › Export › Export**, and **Download
   all**. It saves `[client]-grebfig-export.zip` to Downloads.
4. `npm run import`. It takes the newest export in Downloads (later, only this project's
   client's), and stops if a zip is another client's. Or name the file:
   `npm run import -- path/to/zip`. Commit the result.
5. Fill in PROJECT.md: the client, the Figma file, the preview link.
6. Ask the agent to build a component: *"Build Button/Primary."* It reads its Spec from
   `design/components/`, fetches the component once through Figma's MCP, and adds it to the
   preview.
7. `npm run dev` shows the preview at http://localhost:5175. `npm run check` must pass before
   you commit.

## When Figma changes

Export and download again, then `npm run import`. It lists what changed. Ask the agent to
*"Update from the new export"*: it fetches only the components that changed.

## When code changes something Figma owns

A colour, a spacing value, a component's width, a padding: the agent notes it in
`design/changes.json`. Send it to Figma in one of two ways:

- Ask the agent to *"push the changes to Figma"* (through Figma's MCP), or
- In Figma: **GrebFig › Foundations › Export › From code › Import changes.json**.

The designer applies or dismisses each change in From code, then exports again. The next
`npm run import` tells the agent what was handled.

## The preview online

`.github/workflows/pages.yml` publishes the preview on every push to `main`, at
`https://grebban.github.io/[repo]/stylesheet/`. Turn it on once: **Settings › Pages ›
Source: GitHub Actions**. On GitHub Team a Pages site is public even when the repo is
private, so anyone with the link can see it.

## What's what

| Path | What it is | Who changes it |
|---|---|---|
| `src/theme.css`, `design/` (but `changes.json`), `src/assets/` | GrebFig's export | `npm run import` only |
| `src/components/` | The built components | The agent |
| `src/preview.config.tsx` | Which component draws each Figma set in the preview | The agent |
| `design/changes.json` | Design changes made in code, waiting for Figma | The agent |
| `preview/`, `scripts/`, `AGENTS.md` | The starter itself | Updates from this repo |
| `PROJECT.md` | This project's notes, decisions and open questions | You and the agent |

`design/CONTRACT.md` has the formats of the export and of `changes.json`.
