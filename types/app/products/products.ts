import type { ProductFilterAPIType } from "@/types"

export type CategoryItem = {
  name: string
  parent_item_group?: string
  is_group?: number
  children?: CategoryItem[]
}

export type FilterAccordionProps = {
  title: string
  items: Array<{
    value: string
    title: string
    hasChildren?: boolean
    children?: CategoryItem[]
  }>
  isFetching: boolean
  name: string
  stock_qty?: number
}

export type ReviewAccordionProps = {
  title: string
}

export type ProductFilterType = Pick<ProductFilterAPIType, "brand" | "item_group"> & {
  bestseller: string
  pricerange: string
}


