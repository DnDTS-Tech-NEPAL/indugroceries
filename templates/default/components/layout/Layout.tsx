// components/Layout.tsx
"use client";
import { useEffect, useState } from "react";
import { useConfigQuery } from "@/hooks/api"; // Assuming this hook is correctly defined
import { LayoutProps } from "@/types"; // Assuming LayoutProps type is correctly defined

import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { Topbar } from "./topbar";
import CityPopup from "../cityPopup/page"; // Adjust path as necessary

export const Layout = ({ children, config }: LayoutProps) => {
  const [showCityPopup, setShowCityPopup] = useState<boolean | null>(null); // Initially unknown
  const [topbarKey, setTopbarKey] = useState(0);

  useConfigQuery({ Data: config });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCity = localStorage.getItem("city");
      setShowCityPopup(!storedCity); // false if city is saved, true otherwise
    }
  }, []);

  useEffect(() => {
    function onStorageChange() {
      const city = localStorage.getItem("city");
      setShowCityPopup(!city);
      setTopbarKey((prev) => prev + 1);
    }

    window.addEventListener("storage", onStorageChange);
    return () => window.removeEventListener("storage", onStorageChange);
  }, []);

  const handleCitySaved = () => {
    setShowCityPopup(false);
    setTopbarKey((prev) => prev + 1);
  };

  // While determining localStorage status, show nothing
  if (showCityPopup === null) return null;

  return (
    <>
      {showCityPopup && <CityPopup onCitySaved={handleCitySaved} />}
      <Topbar key={topbarKey} />
      <Navbar />
      {children}
      <Footer />
    </>
  );
};
