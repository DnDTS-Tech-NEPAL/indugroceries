import Link from "next/link";
import * as React from "react";
import {
  Breadcrumb as ChakraBreadcrumb,
  BreadcrumbItem,
  Text,
} from "@chakra-ui/react";

import { BreadcrumbProps, BreadcrumbRootProps } from "@/types";

export const BreadcrumbRoot = React.forwardRef<
  HTMLDivElement,
  BreadcrumbRootProps
>(function BreadcrumbRoot(props, ref) {
  const { separator, separatorGap, children, ...rest } = props;

  const validChildren = React.Children.toArray(children).filter(
    React.isValidElement
  );

  return (
    <ChakraBreadcrumb.Root ref={ref} {...rest}>
      <ChakraBreadcrumb.List gap={separatorGap}>
        {validChildren.map((child, index) => {
          const last = index === validChildren.length - 1;
          return (
            <React.Fragment key={index}>
              {child}
              {!last && (
                <ChakraBreadcrumb.Separator>
                  {separator}
                </ChakraBreadcrumb.Separator>
              )}
            </React.Fragment>
          );
        })}
      </ChakraBreadcrumb.List>
    </ChakraBreadcrumb.Root>
  );
});

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ breadcrumb }) => {
  return (
    <BreadcrumbRoot fontSize="18px" separator={">"}>
      {breadcrumb.map((item, index) => (
        <BreadcrumbItem key={index}>
          {index < breadcrumb.length - 1 ? (
            <BreadcrumbLink
              as={Link}
              href={item.href}
              color={"primary.300"}
              fontWeight={500}
              fontSize={"18px"}
            >
              {item.label}
            </BreadcrumbLink>
          ) : (
            <Text fontWeight={500} color={"primary.400"} fontSize={"18px"}>
              {item.label}
            </Text>
          )}
        </BreadcrumbItem>
      ))}
    </BreadcrumbRoot>
  );
};

export const BreadcrumbLink = ChakraBreadcrumb.Link;
export const BreadcrumbCurrentLink = ChakraBreadcrumb.CurrentLink;
export const BreadcrumbEllipsis = ChakraBreadcrumb.Ellipsis;
