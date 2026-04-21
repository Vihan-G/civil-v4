import { Wordmark } from "@/components/brand/wordmark";
import { Button } from "@/components/ui/button";
import { MaterialIcon } from "@/components/ui/material-icon";

const navItems = [
  { label: "Product", href: "#product" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Preview", href: "#preview" },
  { label: "FAQ", href: "#faq" }
];

export function TopBar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-20 border-b border-border bg-[rgba(10,10,11,0.4)] backdrop-blur-[12px]">
      <div className="mx-auto flex h-16 max-w-[1320px] items-center justify-between px-4 sm:px-6 lg:px-10">
        <div className="flex min-w-0 items-center gap-8">
          <Wordmark />
          <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary navigation">
            {navItems.map((item) => (
              <a
                className="font-body text-sm font-medium text-ink transition hover:text-teal"
                href={item.href}
                key={item.label}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <Button className="hidden sm:inline-flex" href="#cta" size="sm" variant="text">
            Sign in
          </Button>
          <Button href="#cta" size="sm" trailingIcon="arrow_forward">
            <span className="hidden sm:inline">Request early access</span>
            <span className="sm:hidden">Access</span>
          </Button>
          <button
            aria-label="Open navigation"
            className="inline-flex size-9 items-center justify-center rounded-sm text-ink transition hover:bg-surface-low lg:hidden"
            type="button"
          >
            <MaterialIcon name="menu" size={21} />
          </button>
        </div>
      </div>
    </header>
  );
}
