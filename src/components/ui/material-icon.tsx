import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type MaterialIconProps = {
  name: string;
  className?: string;
  fill?: boolean;
  size?: number;
  title?: string;
};

export function MaterialIcon({
  name,
  className,
  fill = false,
  size = 24,
  title
}: MaterialIconProps) {
  return (
    <svg
      aria-hidden={title ? undefined : true}
      aria-label={title}
      className={cn("shrink-0", className)}
      fill="none"
      focusable="false"
      height={size}
      role={title ? "img" : undefined}
      stroke="currentColor"
      strokeLinecap="square"
      strokeLinejoin="miter"
      strokeWidth="1.7"
      viewBox="0 0 24 24"
      width={size}
    >
      {title ? <title>{title}</title> : null}
      {renderIcon(name, fill)}
    </svg>
  );
}

function renderIcon(name: string, fill: boolean): ReactNode {
  switch (name) {
    case "arrow_forward":
      return <path d="M4 12h14M13 7l5 5-5 5" />;
    case "play_arrow":
      return <path d="M8 5v14l11-7-11-7Z" fill="currentColor" stroke="none" />;
    case "bolt":
      return <path d="M13 2 5 13h6l-1 9 8-12h-6l1-8Z" fill={fill ? "currentColor" : "none"} />;
    case "menu":
      return <path d="M4 7h16M4 12h16M4 17h16" />;
    case "search":
      return <path d="m20 20-4.5-4.5M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z" />;
    case "layers":
      return <path d="m12 3 9 5-9 5-9-5 9-5ZM3 12l9 5 9-5M3 16l9 5 9-5" />;
    case "settings":
      return (
        <>
          <path d="M12 8.5a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7Z" />
          <path d="M19 12a7 7 0 0 0-.1-1.2l2-1.5-2-3.5-2.4 1a7 7 0 0 0-2-1.2L14 3h-4l-.4 2.6a7 7 0 0 0-2 1.2l-2.4-1-2 3.5 2 1.5A7 7 0 0 0 5 12c0 .4 0 .8.1 1.2l-2 1.5 2 3.5 2.4-1a7 7 0 0 0 2 1.2L10 21h4l.4-2.6a7 7 0 0 0 2-1.2l2.4 1 2-3.5-2-1.5c.1-.4.2-.8.2-1.2Z" />
        </>
      );
    case "account_circle":
      return (
        <>
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="9" r="2.5" />
          <path d="M6.5 18c1.2-2.4 3-3.6 5.5-3.6s4.3 1.2 5.5 3.6" />
        </>
      );
    case "dashboard":
      return <path d="M4 4h7v7H4V4Zm9 0h7v4h-7V4ZM4 13h7v7H4v-7Zm9-3h7v10h-7V10Z" />;
    case "edit_document":
      return <path d="M6 3h8l4 4v14H6V3Zm8 0v5h5M9 13h4M9 17h6M14 13l5-5 2 2-5 5-3 1 1-3Z" />;
    case "cloud_upload":
      return <path d="M7 18H6a4 4 0 0 1 0-8 6 6 0 0 1 11.5-2A5 5 0 0 1 18 18h-1M12 19V9M8.5 12.5 12 9l3.5 3.5" />;
    case "account_tree":
      return <path d="M5 5h5v5H5V5Zm9 0h5v5h-5V5ZM5 14h5v5H5v-5Zm5-6h2v8H10M12 8h2M12 16H10" />;
    case "grid_view":
      return <path d="M4 4h6v6H4V4Zm10 0h6v6h-6V4ZM4 14h6v6H4v-6Zm10 0h6v6h-6v-6Z" />;
    case "map":
      return <path d="m4 6 5-2 6 2 5-2v14l-5 2-6-2-5 2V6Zm5-2v14M15 6v14" />;
    case "summarize":
      return <path d="M6 3h9l3 3v15H6V3Zm9 0v4h4M9 10h6M9 14h6M9 18h4" />;
    case "grid_on":
      return <path d="M4 4h16v16H4V4Zm5 0v16M15 4v16M4 9h16M4 15h16" />;
    case "check_box":
      return (
        <>
          <rect height="16" width="16" x="4" y="4" fill={fill ? "currentColor" : "none"} opacity={fill ? "0.16" : "1"} />
          <path d="m8 12 3 3 5-6" />
        </>
      );
    case "trip_origin":
      return <circle cx="12" cy="12" r={fill ? "5" : "6"} fill={fill ? "currentColor" : "none"} />;
    case "add":
      return <path d="M12 5v14M5 12h14" />;
    case "remove":
      return <path d="M5 12h14" />;
    case "center_focus_weak":
      return <path d="M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5M10 10h4v4h-4v-4Z" />;
    case "info":
      return (
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 10v6M12 7h.01" />
        </>
      );
    case "warning":
      return (
        <>
          <path d="M12 3 2.8 20h18.4L12 3Z" fill={fill ? "currentColor" : "none"} opacity={fill ? "0.16" : "1"} />
          <path d="M12 8v6M12 17h.01" />
        </>
      );
    case "mail":
      return <path d="M4 6h16v12H4V6Zm0 1 8 6 8-6" />;
    case "database":
      return (
        <>
          <ellipse cx="12" cy="6" rx="7" ry="3" />
          <path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />
        </>
      );
    case "refresh":
      return <path d="M20 7v5h-5M4 17v-5h5M18.5 12A6.5 6.5 0 0 0 7.4 7.4L4 11M5.5 12a6.5 6.5 0 0 0 11.1 4.6L20 13" />;
    default:
      return <rect height="14" width="14" x="5" y="5" />;
  }
}
