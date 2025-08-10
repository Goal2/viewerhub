// src/app/layout.tsx
import "./globals.css";
import AnimatedBackdrop from "@/components/AnimatedBackdrop";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="bg-[#0b0d13] text-white antialiased">
        {/* décor animé global */}
        <AnimatedBackdrop />

        {children}
      </body>
    </html>
  );
}
