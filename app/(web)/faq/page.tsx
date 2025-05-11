import { API_ROUTES } from "@/constants";

import { FAQContainer } from "./(components)";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "FAQ",
  openGraph: {
    title: "FAQ",
  },
};
const FAQ = async () => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_ENDPOINT + API_ROUTES.APP.FAQ,
    {
      // cache: "force-cache",
      method: "GET",
    }
  );

  const data = await response.json();

  return <FAQContainer faqData={data.Data} />;
};

export default FAQ;
