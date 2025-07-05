export { default as TableOfContents } from "./TableOfContents";
export type { TableOfContentsProps, TocItem } from "./TableOfContents.types";

// Hooks exports
export { useTableOfContents } from './hooks/useTableOfContents';
export { useActiveHeader } from './hooks/useActiveHeader';
export { useScrollToElement } from './hooks/useScrollToElement';

// Component exports
export { TableOfContentsSkeleton } from './components/TableOfContentsSkeleton';
export { TableOfContentsTitle } from './components/TableOfContentsTitle';
export { TableOfContentsItem } from './components/TableOfContentsItem';