import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  HeadContent,
  Scripts,
  useRouterState,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { Toaster } from "@/components/ui/sonner";

function NotFound() {
  return (
    <div className="min-h-dvh flex flex-col items-center justify-center px-6 text-center">
      <p className="font-serif text-7xl text-accent">404</p>
      <p className="mt-3 text-sm uppercase tracking-luxe text-muted-foreground">Page not found</p>
      <a href="/" className="mt-8 text-xs uppercase tracking-luxe border-b border-accent pb-1">Return Home</a>
    </div>
  );
}

function ErrorBoundary({ error }: { error: Error }) {
  useEffect(() => { console.error(error); }, [error]);
  return (
    <div className="min-h-dvh flex flex-col items-center justify-center px-6 text-center">
      <p className="font-serif text-3xl">Something went wrong</p>
      <a href="/" className="mt-8 text-xs uppercase tracking-luxe border-b border-accent pb-1">Return Home</a>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Pastor Rugera & Sarah — 20 December 2026" },
      { name: "description", content: "Join Pastor Rugera and Sarah as they celebrate their wedding on 20 December 2026 in Dar es Salaam, Tanzania." },
      { property: "og:title", content: "Pastor Rugera & Sarah — 20 December 2026" },
      { property: "og:description", content: "Join Pastor Rugera and Sarah as they celebrate their wedding on 20 December 2026 in Dar es Salaam, Tanzania." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Pastor Rugera & Sarah — 20 December 2026" },
      { name: "twitter:description", content: "Join Pastor Rugera and Sarah as they celebrate their wedding on 20 December 2026 in Dar es Salaam, Tanzania." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/2118eb84-b7af-482d-acec-98f7addb1338" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/2118eb84-b7af-482d-acec-98f7addb1338" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFound,
  errorComponent: ErrorBoundary,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const path = useRouterState({ select: s => s.location.pathname });
  return (
    <QueryClientProvider client={queryClient}>
      <SiteNav />
      <main key={path} className="pt-16 animate-fade-up">
        <Outlet />
      </main>
      <SiteFooter />
      <Toaster />
    </QueryClientProvider>
  );
}
