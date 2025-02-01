'use client';

import "./globals.css";
import { RecoilRoot } from "recoil";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <RecoilRoot>
          {children}
        </RecoilRoot>
      </body>
    </html>
  );
}
