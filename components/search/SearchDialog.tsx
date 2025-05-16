"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Box, Flex, Grid, Heading, Text } from "@chakra-ui/react";

import { CloseCircleIcon } from "@/assets/svg";
import {
  Dialog,
  FormProvider,
  ProductCard,
  SearchInput,
  Tag,
  VisibleSection,
} from "@/components";
import { useColors } from "@/config";
import { ROUTES } from "@/constants";
import {
  useConfigQuery,
  useProductsLikeQuery,
  useSearchListQuery,
} from "@/hooks/api";
import { SearchDialogProps } from "@/types";
import { calculateHeightAndWidth, generateNextPath } from "@/utils";

export const SearchDialog = ({ open, onClose }: SearchDialogProps) => {
  const { data: config } = useConfigQuery();

  const { THEME_COLORS } = useColors();

  const methods = useForm();
  const searchValue = methods.watch("search");

  const { data: searchData } = useSearchListQuery(searchValue, {
    enabled: !!searchValue,
  });

  const submitHandler = () => {};

  const list = searchData?.data.data;

  const { height, width } = calculateHeightAndWidth(
    config.width,
    config.height
  );
  const router = useRouter();

  const handleClick = (productName: string) => {
    router.push(
      generateNextPath(ROUTES.APP.INDIVIDUAL_PRODUCT, {
        productName,
      })
    );
    onClose();
  };

  const { data: productsLikeData } = useProductsLikeQuery();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      contentMinWidth={{
        sm: "100%",
        lg: "1000px",
        xl: "1200px",
      }}
    >
      <Box px={"40px"} py={"32px"}>
        <Box position="absolute" top="16px" right="16px" cursor="pointer">
          <CloseCircleIcon
            onClick={onClose}
            stroke={THEME_COLORS.primary[400].value}
            color="white"
          />
        </Box>

        <Flex justifyContent="center" mb="24px">
          <Box position="relative" width={`${width}px`} height={`${height}px`}>
            <Image
              src={config.company_details_url}
              alt={config.company_details_name}
              loading="eager"
              fill
            />
          </Box>
        </Flex>

        <Box px={"100px"}>
          <FormProvider methods={methods} onSubmit={submitHandler}>
            <SearchInput name="search" placeholder="Search" startElement />
          </FormProvider>

          <Flex gap={"12px"} mt={"24px"} justifyContent="center" wrap={"wrap"}>
            {list?.map((item, index) => (
              <Tag
                name={item.item_name}
                key={index}
                onClick={() => handleClick(item.name)}
              />
            ))}
          </Flex>
        </Box>

        <VisibleSection visibility={config?.products_you_may_like_visibility}>
          <Flex
            direction="column"
            alignItems="start"
            gap="8px"
            py="2px"
            mt={"69px"}
          >
            <Heading variant={"heading4"} fontWeight={400} fontSize={"26px"}>
              Products you may like
            </Heading>
            <Text variant={"paragraphRegular"} color={"#252B37"}>
              Stay ahead of the curve with this season’s must-have pieces
            </Text>
          </Flex>

          <Grid
            gridTemplateColumns={{
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              xl: "repeat(4, 1fr)",
            }}
            gap="20px"
          >
            {productsLikeData?.map((product, index) => (
              <ProductCard
                key={index}
                id={index}
                category={product.item_group}
                image={product.custom_image_1_link}
                title={product.name}
                description={product.description}
                price={product.prices?.[0]?.price_list_rate}
              />
            ))}
          </Grid>
        </VisibleSection>
      </Box>
    </Dialog>
  );
};
