"use client";
import { useEffect, useState } from "react";
import { useConfigQuery } from "@/hooks/api";
import { LayoutProps } from "@/types";

import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { Topbar } from "./topbar";
import CityPopup from "../cityPopup/page";

export const Layout = ({ children, config }: LayoutProps) => {
  const [hasCity, setHasCity] = useState<boolean | null>(null);

  useConfigQuery({ Data: config });

  useEffect(() => {
    const city = localStorage.getItem("savedCity");
    setHasCity(!!city);

    function onStorage() {
      const city = localStorage.getItem("savedCity");
      setHasCity(!!city);
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  if (hasCity === null) return null;

  return hasCity ? (
    <>
      <Topbar />
      <Navbar />
      {children}
      <Footer />
    </>
  ) : (
    <CityPopup onCitySaved={() => setHasCity(true)} />
  );
};
