import { Metadata } from "next";
import { redirect } from "next/navigation";

import { getProductDetailByName } from "@/api";
import { PageTitle } from "@/components";
import { BREADCRUMB_CONFIG } from "@/config";
import { ROUTES } from "@/constants";
import { ProductDetailPageProps } from "@/types";

import { ProductDetailContainer } from "./(components)";

export const generateMetadata = async ({
  params,
}: ProductDetailPageProps): Promise<Metadata> => {
  const productName = decodeURI((await params).productName);

  const product = await getProductDetailByName(productName);

  return {
    title: product?.item_name,
    description: product?.description,
    openGraph: {
      title: product?.item_name,
      description: product?.description,
    },
  };
};

const ProductDetail = async ({ params }: ProductDetailPageProps) => {
  const productName = decodeURI((await params).productName);

  const product = await getProductDetailByName(productName);

  if (!product || product.error) {
    return redirect(ROUTES.NOT_FOUND);
  }

  return (
    <>
      <PageTitle
        backLabel="Back to products"
        backLink={ROUTES.APP.PRODUCTS}
        title={product.item_name}
        breadcrumb={BREADCRUMB_CONFIG.PRODUCT_DETAIL}
      />

      <ProductDetailContainer product={product} />
    </>
  );
};

export default ProductDetail;
