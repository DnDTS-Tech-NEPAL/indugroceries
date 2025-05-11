"use client";

import { useConfigQuery } from "@/hooks/api";
import { LayoutProps } from "@/types";

// import { Topbar } from "./topbar";
import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { Topbar } from "./topbar";

export const Layout = ({ children, config }: LayoutProps) => {
  // set config data fetched from the server to the react query
  useConfigQuery({ Data: config });

  return (
    <>
      <Topbar />

      <Navbar />

      {children}

      <Footer />
    </>
  );
};
