import { Roboto } from "next/font/google";

export const font = Roboto({
  subsets: ["latin"],
  variable: "--font-primary",
  display: "swap",
  // Include different weights that we'll use
  weight: ["400", "500", "700"],
});
