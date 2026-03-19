import type { ReactNode } from "react";
import { Footer } from "./footer";
import { Header } from "./header";

type LayoutProps = {
  children: ReactNode;
};

export function Page({ children }: LayoutProps) {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
