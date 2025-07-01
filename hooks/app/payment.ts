"use client";

import { useState } from "react";

import { CashOnDeliveryImage, StripeImage } from "@/assets/image";
import { usePromoStore } from "@/store";

import { useConfigQuery, usePaymentMethodQuery } from "../api";

export const usePaymentMethods = () => {
  const { data: paymentMethod } = usePaymentMethodQuery();
  const defaultItems = [
    {
      icon: StripeImage.src,
      description: "Pay via stripe.",
      value: "Stripe",
    },
    {
      icon: CashOnDeliveryImage.src,
      description: "Pay our rider while delivering your product.",
      value: "Cash On Delivery",
    },
  ];
  // Map API response
  const items =
    paymentMethod?.map((method: any) => ({
      icon: method.icon_link,
      description: method.description,
      value: method.name ,
    })) || defaultItems;

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    items[0].value
  );

  const handlePaymentMethodChange = (value: string) => {
    setSelectedPaymentMethod(value);
  };

  return {
    items,
    selectedPaymentMethod,
    handlePaymentMethodChange,
  };
};

export const useSummary = () => {
  const { data: config } = useConfigQuery();

  const { promoData: calculationData } = usePromoStore();

  const subTotal = calculationData?.total ?? 0;

  const ShippingValue = calculationData?.delivery_charge ?? 0;
  const EstimatedTax = calculationData?.total_tax ?? 0;
  const Discount = calculationData?.discount_amount ?? 0;
  const TotalAfterTax = calculationData?.total_after_tax ?? 0;
  const TotalAfterDiscount = calculationData?.grand_total_after_discount ?? 0;

  const summaryItems = [
    { label: "Sub Total", value: `${config.currency} ${subTotal}` },
    { label: "Shipping", value: `${config.currency} ${ShippingValue}` },
    { label: "Discount Code", value: `${config.currency} ${Discount}` },

    { label: "Estimated Tax", value: `${config.currency} ${EstimatedTax}` },
    { label: "Sub Total + Tax", value: `${config.currency} ${TotalAfterTax}` },
    {
      label: "Total After Discount",
      value: `${config.currency} ${TotalAfterDiscount}`,
    },
  ];

  const total = calculationData?.final_total;

  return { summaryItems, total };
};
