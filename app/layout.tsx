import { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { getConfigData } from "../api";
import { Providers } from "./providers";
import { Layout } from "@/templates/default/components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const montserrat = Montserrat({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const generateMetadata = async (): Promise<Metadata> => {
  const data = await getConfigData();
  const config = data.Data;

  return {
    description: config.footer_description,
    icons: {
      icon: [
        {
          rel: "icon",
          url: config.company_details_url,
        },
      ],
    },
    openGraph: {
      description: config.footer_description,
    },
  };
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const data = await getConfigData();
  const config = data.Data;

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${montserrat.className}`}>
        <Providers config={config}>
          <Layout config={config}>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
