import type { Metadata } from "next";

import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Storefront | Ropa para programadores",
  description:
    "Frontend storefront para ecommerce de ropa temática para programadores, con configurador visual, carrito local y formulario de envío.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="font-sans">{children}</body>
    </html>
  );
}
