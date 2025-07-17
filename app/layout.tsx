import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import Link from "next/link";
import { EnvVarWarning } from "@/components/env-var-warning";
import { AuthButton } from "@/components/auth-button";
import { hasEnvVars } from "@/lib/utils";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Toaster } from "sonner";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Psi Mammoliti",
  description: "La mejor forma de encontrar tu psicólogo",
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${geistSans.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
            <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
              <div className="hidden md:block flex gap-5 items-center font-semibold">
                <Link href={"/"}>Psi Mammoliti</Link>
              </div>
              <div className="block md:hidden">
                PM
              </div>
              {!hasEnvVars() ? <EnvVarWarning /> : <AuthButton />}
            </div>
          </nav>
          <Toaster />
          {children}
        <footer className="w-full bg-card border-t mt-20">
          <div className="max-w-5xl mx-auto px-5 py-8">
            <div className="pt-4 text-center text-xs text-muted-foreground">
              <p>
                Psi Mammoliti © 2025 · Desarrollado por{" "}
                <a
                  href="https://www.linkedin.com/in/fabbiodv/"
                  target="_blank"
                  className="font-bold hover:underline"
                  rel="noreferrer"
                >
                  Fabio Mazzarella
                </a>
                <ThemeSwitcher />
              </p>
            </div>
          </div>
        </footer>
        </ThemeProvider>
        {/* Footer */}
      </body>
    </html>
  );
}
