import { Metadata } from "next";

import { getContactUsData } from "@/api";
import { PageTitle } from "@/components";
import { BREADCRUMB_CONFIG } from "@/config";
import { ROUTES } from "@/constants";

import { ContactContainer, ContactForm, MapLocation } from "./(components)";

export const metadata: Metadata = {
  title: "Contact Us",
  openGraph: {
    title: "Contact Us",
  },
};

const ContactUs = async () => {
  const data = await getContactUsData();

  const contactData = data?.Data;

  return (
    <>
      <PageTitle
        backLabel="Back to homepage"
        backLink={ROUTES.APP.HOMEPAGE}
        title="Contact Us"
        breadcrumb={BREADCRUMB_CONFIG.CONTACT_US}
      />

      <ContactContainer>
        <ContactForm data={contactData} />

        <MapLocation data={contactData} />
      </ContactContainer>
    </>
  );
};

export default ContactUs;
