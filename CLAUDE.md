# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # start dev server with Turbopack at localhost:3000
npm run build      # production build (Turbopack)
npm run lint       # ESLint check
```

No test suite is configured.

## Architecture Overview

**World Dev Dashboard** — a Next.js 15 App Router dashboard that surfaces live World App Mini Apps ecosystem data and SDK reference material for developers.

### Data Flow

All four routes are **async Server Components** that fetch data at request time (ISR, 1-hour revalidation) and pass it down to client components as props:

- `lib/api.ts` — `fetchApps()` hits `world-id-assets.com/api/v2/public/apps`, slims each app object, and exports `computeStats()` for aggregate metrics
- `lib/metrics-api.ts` — `fetchMetrics()` hits `metrics.worldcoin.org/miniapps/stats/data.json` and returns a `Map<app_id, AppMetrics>`
- `lib/snapshot.ts` — file-based persistence (`data/app-snapshot.json`) that tracks which app IDs were seen on the last run; used by `getNewApps()` and `getOldestApps()` on the Overview page. `saveSnapshot()` silently no-ops on read-only filesystems (Vercel)

Static content lives in `data/commands.ts` (full `MiniKitCommand[]` definitions) and `data/guide.ts` (guide sections). These are never fetched—just imported.

### Route → Component Map

| Route | Page | Key client component |
|---|---|---|
| `/` | Redirects to `/overview` | — |
| `/overview` | Fetches apps + metrics, runs snapshot | `StatsGrid`, `CategoryBreakdown`, `TopAppsTable`, `FastestGrowing`, `NewAppsBox`, `AppSpotlight` |
| `/apps` | Fetches apps | `AppsGrid` (filter/sort/search, opens `AppDetailDrawer`) |
| `/commands` | Static import | `CommandGrid` (expand/collapse cards, SDK+category tabs; "UI Kit" tab renders `UIKitSection` from `DESIGN.md` content) |
| `/guide` | Static import | `GuideContent` |

### Layout

`app/layout.tsx` wraps every route with a fixed `AppSidebar` (desktop only, 220px) + `TopBar` + scrollable `<main>`. Mobile nav is handled by `MobileNav`. `Toaster` (sonner) is mounted globally.

### Styling Conventions

- **Tailwind 4** via PostCSS. No CSS variables for colors — all colors are hardcoded hex in arbitrary Tailwind values (e.g. `bg-[#121212]`, `text-[#9D9B96]`).
- Brand palette: near-black `#121212` for primary/active, `#f9f9f8` for backgrounds, `#CECDCA`/`#e1dfda` for borders, `#9D9B96` for muted text, `#007CFB` blue for info/links.
- Color maps for category and SDK badges live in `lib/utils.ts` (`commandCategoryColors`, `sdkColors`, `appCategoryColors`, `categoryBarColors`).
- Number formatting helper: `fmtNum()` in `lib/utils.ts` (K/M/B suffixes).

### Key Conventions

- **`components/ui/`** — shadcn-compatible primitives (accordion, badge, button, card, etc.). `AppLogo` is a custom component that falls back to two-letter initials when the image URL fails.
- **`lib/config.ts`** — all API endpoints, revalidation constant, and canonical category lists (`APP_CATEGORIES`, `COMMAND_CATEGORIES`). If the API gains a new category, add it here.
- Remote images: `next.config.ts` whitelists `world-id-assets.com` for `next/image`. All app logo URLs come from this domain.
- API endpoints can be overridden for staging via env vars: `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_METRICS_URL`, `NEXT_PUBLIC_UIKIT_URL`.
- `max-w-[1400px]` is the standard page container width applied at the page level, not in the layout.

### Adding New Commands

Add entries to `data/commands.ts` as `MiniKitCommand` objects. The `llmPrompt` field is surfaced in the UI with a one-click copy button — keep it copy-pasteable and self-contained.

### DESIGN.md

`DESIGN.md` is a YAML + Markdown design spec for the `@worldcoin/mini-apps-ui-kit-react` component library (not installed in this repo). The Commands page "UI Kit" tab renders a summary of it via `UIKitSection`. Do not delete this file.

## Project Tracking

All tasks, features, and bugs are tracked as GitHub Issues at:
**https://github.com/mateosauton/miniapps-dashboard/issues**

A GitHub Projects board at the same repo aggregates these into Backlog / In Progress / In Review / Done columns.

**Always reference the relevant issue number in every commit and PR** using `(#N)` in the commit title. When a PR fully resolves an issue, put `Closes #N` in the PR body so the issue closes automatically on merge.

Issue templates live in `.github/ISSUE_TEMPLATE/`: `feature.md`, `bug.md`, `task.md`.

## Git Workflow

Solo developer. `main` is always deployable (Vercel deploys from it). All work happens on short-lived feature branches.

### Branch naming

```
feat/issue-<N>-<short-slug>    # new feature or enhancement
fix/issue-<N>-<short-slug>     # bug fix
task/issue-<N>-<short-slug>    # chore, refactor, internal improvement
```

Examples: `feat/issue-6-global-search`, `fix/issue-3-skeleton-loading`

### Step-by-step

1. Pick an issue from the board and move it to **In Progress**
2. Branch off `main`:
   ```bash
   git checkout main && git pull origin main
   git checkout -b feat/issue-6-global-search
   ```
3. Make commits using [Conventional Commits](https://www.conventionalcommits.org/):
   ```
   feat: add global command palette search (#6)
   fix: skeleton layout shift on overview load (#3)
   task: replace fs snapshot with Vercel KV (#9)
   ```
4. Push and open a PR:
   - Title mirrors the commit message
   - Body contains `Closes #N`
   - Move the issue to **In Review**
5. Merge to `main` (squash preferred to keep history clean)
6. Delete the feature branch; issue auto-closes and moves to **Done**

### Commit types

| Type | When to use |
|---|---|
| `feat` | New user-facing feature |
| `fix` | Bug fix |
| `task` | Refactor, chore, internal improvement |
| `docs` | CLAUDE.md, README, or comment-only changes |
| `style` | Formatting, Tailwind class reorders — no logic change |
