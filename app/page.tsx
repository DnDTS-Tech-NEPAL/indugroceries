import { Metadata } from "next";

import { MakeupLandingPage } from "@/templates/makeup/pages";
import { DefaultLandingPage } from "@/templates/default/pages";

import { getConfigData, getHomePageData } from "../api"; // does not work with @/ import in docker

export const generateMetadata = async (): Promise<Metadata> => {
  const data = await getConfigData();
  const config = data.Data;

  return {
    title: config.company_details_name,
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
      title: config.company_details_name,
      description: config.footer_description,
    },
  };
};

const Home = async () => {
  const data = await getHomePageData();
  const config = await getConfigData();

  const template = config?.Data?.template;

  switch (template) {
    case "makeup":
      return <MakeupLandingPage />;

    default:
      return <DefaultLandingPage initialData={data} />;
  }
};

export default Home;
