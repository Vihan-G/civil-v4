import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { MaterialIcon } from "@/components/ui/material-icon";

type ButtonVariant = "primary" | "tool" | "ghost" | "text" | "inverse";
type ButtonSize = "sm" | "md" | "lg" | "icon";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: string;
  trailingIcon?: string;
  href?: string;
  children?: ReactNode;
};

const variantClass: Record<ButtonVariant, string> = {
  primary: "bg-ink text-paper hover:bg-primary",
  tool: "bg-primary text-paper hover:bg-ink",
  ghost: "hairline bg-transparent text-ink hover:bg-surface-low",
  text: "bg-transparent text-ink hover:text-teal",
  inverse: "bg-paper text-ink hover:bg-surface-high"
};

const sizeClass: Record<ButtonSize, string> = {
  sm: "min-h-9 px-3 py-2 text-xs",
  md: "min-h-10 px-4 py-2.5 text-sm",
  lg: "min-h-12 px-5 py-3 text-sm",
  icon: "size-10 justify-center p-0"
};

export function Button({
  variant = "primary",
  size = "md",
  icon,
  trailingIcon,
  href,
  children,
  className,
  type = "button",
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center gap-2 rounded-sm font-headline font-medium transition duration-150 ease-[var(--ease-draft)]",
    "active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal",
    variantClass[variant],
    sizeClass[size],
    className
  );

  const content = (
    <>
      {icon ? <MaterialIcon name={icon} size={18} /> : null}
      {children ? <span className="min-w-0">{children}</span> : null}
      {trailingIcon ? <MaterialIcon name={trailingIcon} size={18} /> : null}
    </>
  );

  if (href) {
    return (
      <a className={classes} href={href}>
        {content}
      </a>
    );
  }

  return (
    <button className={classes} type={type} {...props}>
      {content}
    </button>
  );
}
