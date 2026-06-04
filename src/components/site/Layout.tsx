import type { ReactNode } from "react";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { FloatingActions } from "./FloatingActions";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>{children}</main>
      <Footer />
      <FloatingActions />
    </div>
  );
}
