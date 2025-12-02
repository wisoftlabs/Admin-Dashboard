# Project Context & Rules: Wisoft Admin Dashboard
# Stack: 
    React 19, 
    TypeScript, 
    Shadcn UI, 
    Tanstack Query, 
    Zustand, 
    React Router

## 1. Naming Conventions (Strict)
- **React Components:** PascalCase (e.g., `ProjectList.tsx`, `AdminLayout.tsx`)
- **Hooks:** camelCase (e.g., `useProjectQueries.ts`, `useAuth.ts`)
- **Others:** kebab-case (e.g., `src/utils/date-formatter.ts`, `src/components/project-list/`)
    - Includes utility files, schema files, assets, and directory names.

## 2. Project Architecture
**Structure Strategy:** Flat Pages + Domain-scoped Hooks

### Directory Layout Example
- `src/`
    - `layout/` (Layout components)
        - `Header.tsx`, `Sidebar.tsx`, `Footer.tsx`
        - `AdminLayout.tsx` (Wraps Outlet)
    - `pages/` (Flat structure, Route Entry Points)
        - `HomePage.tsx`
        - `AwardPage.tsx`
        - `ProjectsPage.tsx`
        - `PaperPage.tsx`
        - `LoginPage.tsx`
    - `components/` (UI Presentation)
        - `ui/` (Shadcn primitives - Immutable)
        - `common/` (Shared components)
        - `award/`, `projects/`, `paper/` (Domain specific UI folders)
    - `hooks/` (Logic & Data Fetching)
        - `award/` (Example)
            - `querieOptions.ts` (queryOptions)
            - `queries.ts` (queries)
            - `mutations.ts` (Mutations)
        - `projects/`, `paper/`
    - `store/`
        - `useAuthStore.ts` (Global Auth only)
    - `lib/` (Utilities, config)
        - `api-fetch.ts` (Fetch with JWT Token)
        - `utils.ts`
        - `schemas/` (Zod schemas)

## 3. Core Principles
- **Strict TypeScript:** No `any`. Strict interfaces for API responses.
- **Component Props:** MUST use `type` aliases (not `interface`).
- **Separation of Concerns:**
    - `pages/*`: Route composition & Layout usage only.
    - `components/*`: Pure presentation.
    - `hooks/*`: Business logic, Data fetching, Form submission handlers.
- **React 19 Usage:** Utilize React Compiler optimizations. Use `use` API if needed.

## 4. Data Fetching (Tanstack Query)
- **Location:** Query logic must reside in `src/hooks/<domain>/`.
- **Query Options Pattern:**
    - Define a static `queryOptions` factory object inside the hook file.
    - Export specific hooks that utilize these options.
- **State Handling:** Handle `isLoading` and `isError` explicitly in the UI where necessary.

## 5. Forms & Validation
- **Validation:** Zod schemas defined in `src/lib/schemas/`.
- **Form Lib:** React Hook Form + Zod Resolver.

## 6. Implementation Examples

### Folder & File Naming Example
```text
src/components/project/ProjectCard.tsx  (Component: Pascal)
src/lib/string-utils.ts                      (Util: kebab)
src/hooks/projects/useProjectQueries.ts      (Hook: camel)
```

Query Options Pattern (src/hooks/projects/useProjectQueries.ts)
```typescript
import { queryOptions, useQuery } from '@tanstack/react-query';
import { type Project } from '@lib/schema/project.ts'

// Factory Object
export const projectQueries = {
  all: () => ['projects'] as const,
  listKey: () => [...projectQueries.all(), "list"],
  detailKey: (id: Project["id"]) => [...projectQueries.all(), "detail", id],
  
  list: () => 
    queryOptions({
      queryKey: [...projectQueries.listKey()],
      queryFn: () => api.allProjects(),
    }),
};
```