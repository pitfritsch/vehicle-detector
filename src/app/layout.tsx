import type { Metadata } from "next";
import { Open_Sans, Ubuntu } from "next/font/google";
import "@mantine/core/styles.css";
import "@mantine/dropzone/styles.css";
import {
  ColorSchemeScript,
  createTheme,
  mantineHtmlProps,
  MantineProvider,
} from "@mantine/core";

const openSans = Open_Sans({
  subsets: ["latin"],
});

const ubuntu = Ubuntu({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vehicle detector",
  description: "Pedro",
};

const theme = createTheme({
  fontFamily: openSans.style.fontFamily,
  headings: { fontFamily: ubuntu.style.fontFamily },
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head {...mantineHtmlProps}>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider theme={theme} defaultColorScheme="dark">
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
