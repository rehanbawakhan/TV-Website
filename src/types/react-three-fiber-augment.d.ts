// Augment global JSX IntrinsicElements with types from @react-three/fiber
// This imports the library's JSX types and merges them into the global JSX namespace.
import type { JSX as FiberJSX } from '@react-three/fiber'

declare global {
  namespace JSX {
    // Merge fiber's intrinsic elements into the global JSX interface
    interface IntrinsicElements extends FiberJSX.IntrinsicElements {}
  }
}

export {}
