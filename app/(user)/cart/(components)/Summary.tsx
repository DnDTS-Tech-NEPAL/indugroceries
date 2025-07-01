"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { Box, Flex, Separator, Text, VStack } from "@chakra-ui/react";

import { Button, FormProvider, TextFieldInput } from "@/components";
import { ROUTES } from "@/constants";
import { useAddPromo, useDeliveryLocationsQuery } from "@/hooks/api";
import { useSummary } from "@/hooks/app";
import { usePromoFormStore, usePromoStore } from "@/store";
import { PromoFormData } from "@/types";

export const Summary = ({ disabled = false }) => {
  const methods = useForm<PromoFormData>();
  const router = useRouter();

  const { summaryItems, total } = useSummary();
  const { mutate: applyPromo, isPending } = useAddPromo();
  const { data: deliveryData } = useDeliveryLocationsQuery();

  const { setPromoData, promoData } = usePromoStore();
  const { resetFlag, clearResetFlag, setPromoCode, setDeliveryLocation } =
    usePromoFormStore();

  const promoCode = methods.watch("promoCode");
  const deliveryLocation = methods.watch("deliveryLocation");
  useEffect(() => {
    if (!promoCode && promoData) {
      // If promoCode is empty and there's existing promo data, clear it
      const delivery =
        deliveryLocation ||
        (Array.isArray(deliveryData) && deliveryData.length > 0
          ? deliveryData[0].place
          : "");

      applyPromo(
        {
          coupon: "",
          delivery_place: delivery,
          loyalty_points: 0,
        },
        {
          onSuccess: (response) => {
            setPromoData(response.data.data);
          },
        }
      );
    }
  }, [promoCode, deliveryLocation, deliveryData]);

  const onSubmit = (data: PromoFormData) => {
    const delivery =
      data.deliveryLocation ||
      (Array.isArray(deliveryData) && deliveryData.length > 0
        ? deliveryData[0].place
        : "");

    const promo = data.promoCode?.trim() || "";

    setPromoCode(promo);
    setDeliveryLocation(delivery);

    applyPromo(
      {
        coupon: promo,
        delivery_place: delivery,
        loyalty_points: 0,
      },
      {
        onSuccess: (response) => {
          setPromoData(response.data.data);
        },
      }
    );
  };

  useEffect(() => {
    if (deliveryLocation) {
      setDeliveryLocation(deliveryLocation);

      applyPromo(
        {
          coupon: promoCode?.trim() || "",
          delivery_place: deliveryLocation,
          loyalty_points: 0,
        },
        {
          onSuccess: (response) => {
            setPromoData(response.data.data);
          },
        }
      );
    }
  }, [deliveryLocation]);

  useEffect(() => {
    if (resetFlag) {
      methods.reset({
        promoCode: "",
        deliveryLocation: "",
      });

      setPromoCode("");
      setDeliveryLocation("");
      clearResetFlag();
    }
  }, [resetFlag]);

  return (
    <Box
      w={{
        base: "full",
        lg: "315px",
        xl: "412px",
      }}
      flexShrink={0}
      position="relative"
      border={"1px solid"}
      borderColor={"primary.100"}
      borderRadius={"24px"}
      p={"24px"}
      height={{ md: "700px" }}
      overflow="hidden"
      opacity={disabled ? 0.5 : 1}
      pointerEvents={disabled ? "none" : "auto"}
    >
      <Text
        variant="subtitle1"
        mb={"32px"}
        fontSize={{ lg: "16px", xl: "21px" }}
        fontWeight={700}
      >
        Summary
      </Text>

      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Flex alignItems="center" gap={4} justifyContent={"space-between"}>
          <TextFieldInput
            name="promoCode"
            label=""
            placeholder="Promo Code *"
          />
          <Button variant={"ghost"} type="submit" loading={isPending}>
            Apply
          </Button>
        </Flex>

        {deliveryData && (
          <Box mt={4}>
            <label htmlFor="deliveryLocation">Delivery Location</label>
            <select
              id="deliveryLocation"
              {...methods.register("deliveryLocation")}
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                marginTop: "4px",
                cursor: "pointer",
              }}
            >
              <option value="" disabled selected>
                Select Delivery Location
              </option>
              {Array.isArray(deliveryData) &&
                deliveryData.map((item, index) => (
                  <option key={index} value={item.place}>
                    {item.place}
                  </option>
                ))}
            </select>
          </Box>
        )}
      </FormProvider>

      <VStack align="stretch" gap={4} mt={{ base: "24px", lg: "32px" }}>
        {summaryItems.map(({ label, value }, index) => (
          <Flex justify="space-between" key={index} width="full">
            <Text
              variant="subtitle1"
              color="system.neutral.separator.black.dark"
              fontWeight={500}
              fontSize={"14px"}
            >
              {label}
            </Text>
            <Text variant="subtitle1" fontWeight={400} color={"primary.400"}>
              {value}
            </Text>
          </Flex>
        ))}

        <Separator my={2} />

        <Flex justify="space-between" width="full">
          <Text
            variant="subtitle2"
            color="system.neutral.separator.black.dark"
            fontWeight={500}
          >
            Total
          </Text>
          <Text variant="subtitle1" fontWeight={400} color="primary.400">
            {total}
          </Text>
        </Flex>
      </VStack>

      <Separator my={4} mb={"32px"} />

      <Button
        variant={"outline"}
        w={"full"}
        mb={"16px"}
        onClick={() => {
          router.push(ROUTES.APP.PRODUCTS);
        }}
      >
        Continue Shopping
      </Button>
      <Button
        w={"full"}
        mb={{ base: "8px", lg: 0 }}
        onClick={() => router.push(ROUTES.APP.CHECKOUT)}
      >
        Proceed
      </Button>
    </Box>
  );
};
