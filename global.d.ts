// Global JSX fallback for react-three-fiber elements
// This file intentionally avoids exporting to ensure it's treated as a global
declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any
  }
}
