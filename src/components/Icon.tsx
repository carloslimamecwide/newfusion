import type { SVGProps } from "react";

export type IconName =
  | "globe"
  | "app"
  | "cart"
  | "mobile"
  | "link"
  | "shield"
  | "bulb"
  | "arrow"
  | "check"
  | "message"
  | "ruler"
  | "code"
  | "calendar"
  | "external"
  | "arrow-left"
  | "menu"
  | "close";

type Props = SVGProps<SVGSVGElement> & {
  name: IconName;
  size?: number;
};

const paths: Record<IconName, React.ReactNode> = {
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.6 3.9 5.7 3.9 9S14.5 18.4 12 21c-2.5-2.6-3.9-5.7-3.9-9S9.5 5.6 12 3Z" />
    </>
  ),
  app: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M9 9h6M9 13h6M9 17h4" />
    </>
  ),
  cart: (
    <>
      <circle cx="9" cy="20" r="1.4" />
      <circle cx="17" cy="20" r="1.4" />
      <path d="M3 4h2l2.4 12.4a1 1 0 0 0 1 .8h8.9a1 1 0 0 0 1-.8L20 8H6" />
    </>
  ),
  mobile: (
    <>
      <rect x="7" y="3" width="10" height="18" rx="2" />
      <path d="M11 17.5h2" />
    </>
  ),
  link: (
    <>
      <path d="M10 14a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1.5 1.5" />
      <path d="M14 10a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1.5-1.5" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 5 6v5c0 4.4 3 8.4 7 10 4-1.6 7-5.6 7-10V6l-7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  bulb: (
    <>
      <path d="M9 18h6M10 21h4" />
      <path d="M12 3a6 6 0 0 0-4 10.5c.6.6 1 1.5 1 2.5h6c0-1 .4-1.9 1-2.5A6 6 0 0 0 12 3Z" />
    </>
  ),
  arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
  check: <path d="m5 13 4 4L19 7" />,
  message: <path d="M5 5h14v10H9l-4 4V5Z" />,
  ruler: (
    <>
      <path d="m4 17 13-13 3 3L7 20H4v-3Z" />
      <path d="m12 9 3 3M9 12l2 2M15 6l2 2" />
    </>
  ),
  code: <path d="m8 8-4 4 4 4M16 8l4 4-4 4M14 5l-4 14" />,
  calendar: (
    <>
      <rect x="4" y="5" width="16" height="15" rx="1" />
      <path d="M8 3v4M16 3v4M4 10h16" />
    </>
  ),
  external: <path d="M14 5h5v5M19 5l-8 8M19 13v6H5V5h6" />,
  "arrow-left": <path d="M19 12H5m6-6-6 6 6 6" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
};

export function Icon({ name, size = 22, ...rest }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...rest}
    >
      {paths[name]}
    </svg>
  );
}
