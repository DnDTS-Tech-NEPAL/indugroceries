export type StarRatingProps = {
  stars?: number;
  onChange?: (rating: number) => void;
  isCheckBoxRequired?: boolean;
  fixedRating?: number;
  fillColor?: string;
  value?: number;
};
