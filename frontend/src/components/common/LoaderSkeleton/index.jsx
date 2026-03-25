/**
 * Skeleton — Reusable loading placeholder primitive
 *
 */
export function Skeleton({
  width = "100%",
  height = 16,
  rounded = "md",
  className = "",
  style = {},
  as: Tag = "div",
}) {
  const radii = {
    sm:   "rounded-sm",
    md:   "rounded-md",
    lg:   "rounded-lg",
    xl:   "rounded-xl",
    full: "rounded-full",
  };

  return (
    <Tag
      aria-hidden="true"
      className={`animate-pulse bg-zinc-200 dark:bg-zinc-700 ${radii[rounded] ?? "rounded-md"} ${className}`}
      style={{
        width:  typeof width  === "number" ? `${width}px`  : width,
        height: typeof height === "number" ? `${height}px` : height,
        ...style,
      }}
    />
  );
}

/**
 * SkeletonText — renders N lines of text-shaped skeletons.
 *
 * Props:
 *   lines      — number of lines          (default: 3)
 *   gap        — gap between lines in px  (default: 8)
 *   lastWidth  — width of last line       (default: "60%")
 */
export function SkeletonText({ lines = 3, gap = 8, lastWidth = "60%" }) {
  return (
    <div className="flex flex-col" style={{ gap }}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          width={i === lines - 1 && lines > 1 ? lastWidth : "100%"}
          height={14}
        />
      ))}
    </div>
  );
}

/**
 * SkeletonAvatar — circular avatar placeholder.
 *
 * Props:
 *   size — diameter in px (default: 40)
 */
export function SkeletonAvatar({ size = 40 }) {
  return <Skeleton width={size} height={size} rounded="full" />;
}

/**
 * SkeletonImage — aspect-ratio-aware image placeholder.
 *
 * Props:
 *   aspect — Tailwind aspect class e.g. "aspect-video", "aspect-square", "[4/3]"
 */
export function SkeletonImage({ aspect = "aspect-video", className = "" }) {
  return (
    <Skeleton
      width="100%"
      height="auto"
      rounded="lg"
      className={`${aspect} ${className}`}
      style={{ height: "auto" }}
    />
  );
}

/**
 * SkeletonButton — inline button-shaped placeholder.
 *
 * Props:
 *   width  — button width  (default: 96)
 *   height — button height (default: 36)
 */
export function SkeletonButton({ width = 96, height = 36 }) {
  return <Skeleton width={width} height={height} rounded="xl" />;
}

/**
 * SkeletonCard — full product-style card skeleton.
 * Composes the primitives above. Drop-in for any card grid.
 */
export function SkeletonCard({ showImage = true, lines = 2 }) {
  return (
    <div className="flex flex-col gap-3 p-4 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800">
      {showImage && <SkeletonImage aspect="aspect-[4/3]" className="rounded-xl" />}
      <Skeleton width="40%" height={12} rounded="full" />
      <SkeletonText lines={lines} />
      <div className="flex items-center gap-2 mt-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} width={14} height={14} rounded="sm" />
        ))}
        <Skeleton width={32} height={12} />
      </div>
      <div className="flex items-center justify-between mt-2">
        <div className="flex flex-col gap-1.5">
          <Skeleton width={56} height={16} />
          <Skeleton width={40} height={11} />
        </div>
        <SkeletonButton />
      </div>
    </div>
  );
}

/**
 * SkeletonListItem — horizontal row skeleton (avatar + text).
 */
export function SkeletonListItem({ lines = 2 }) {
  return (
    <div className="flex items-center gap-3 p-3">
      <SkeletonAvatar size={44} />
      <div className="flex-1">
        <SkeletonText lines={lines} gap={6} lastWidth="50%" />
      </div>
    </div>
  );
}

/**
 * SkeletonTable — rows × cols grid of text cells.
 *
 * Props:
 *   rows — number of body rows (default: 4)
 *   cols — number of columns   (default: 4)
 */
export function SkeletonTable({ rows = 4, cols = 4 }) {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-zinc-100 dark:border-zinc-800">
      {/* Header */}
      <div
        className="grid gap-4 px-4 py-3 bg-zinc-50 dark:bg-zinc-800/60 border-b border-zinc-100 dark:border-zinc-800"
        style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
      >
        {Array.from({ length: cols }).map((_, i) => (
          <Skeleton key={i} width="70%" height={12} />
        ))}
      </div>
      {/* Body */}
      {Array.from({ length: rows }).map((_, r) => (
        <div
          key={r}
          className="grid gap-4 px-4 py-3 border-b border-zinc-50 dark:border-zinc-800/60 last:border-0"
          style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
        >
          {Array.from({ length: cols }).map((_, c) => (
            <Skeleton key={c} width={c === 0 ? "90%" : "60%"} height={12} />
          ))}
        </div>
      ))}
    </div>
  );
}
