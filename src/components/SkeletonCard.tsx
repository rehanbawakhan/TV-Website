import { motion } from 'framer-motion'

export default function SkeletonCard() {
    return (
        <div className="flex flex-col gap-4">
            {/* Image Skeleton */}
            <div className="relative w-full rounded-xl overflow-hidden aspect-video bg-gray-800 animate-pulse">
                {/* Optional: Add a subtle shimmer effect here if needed, but animate-pulse is usually enough */}
            </div>

            {/* Content Skeleton */}
            <div className="flex items-start gap-3">
                {/* Avatar/Icon Skeleton */}
                <div className="w-10 h-10 rounded-full bg-gray-800 animate-pulse flex-shrink-0" />

                {/* Text Lines */}
                <div className="flex-1 space-y-2 py-1">
                    <div className="h-4 bg-gray-800 rounded w-3/4 animate-pulse" />
                    <div className="h-3 bg-gray-800/60 rounded w-1/2 animate-pulse" />
                </div>
            </div>
        </div>
    )
}
