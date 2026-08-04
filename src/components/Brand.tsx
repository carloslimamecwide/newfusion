import Image from "next/image";

export function Brand({
  compact = false,
  eager = false,
  highPriority = false,
}: {
  compact?: boolean;
  eager?: boolean;
  highPriority?: boolean;
}) {
  return (
    <span className="inline-flex items-center" aria-hidden="true">
      <Image
        src="/brand/logo-full.webp"
        alt=""
        width={1709}
        height={231}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={highPriority ? "high" : "auto"}
        decoding={highPriority ? "sync" : "async"}
        sizes={compact ? "158px" : "205px"}
        className={compact ? "h-auto w-[9.875rem]" : "h-auto w-[10.5rem] sm:w-[12.8rem]"}
      />
    </span>
  );
}
