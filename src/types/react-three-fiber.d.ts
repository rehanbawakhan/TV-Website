// Relax JSX intrinsic element types for react-three-fiber / three.js elements
// This is a pragmatic fix to avoid TypeScript errors during build where
// many three.js tags (e.g., <group>, <mesh>, <boxGeometry>) are not present
// in the default JSX.IntrinsicElements mapping. It keeps runtime behavior
// unchanged while allowing the build to succeed in CI.

declare global {
  namespace JSX {
    // Allow any unknown JSX intrinsic elements (practical for three.js scene tags)
    interface IntrinsicElements {
      [elemName: string]: any
    }
  }
}

export {}
