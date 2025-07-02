export type UserProfileType = {
  customer_name: string;
  custom_customer_contact: string;
  custom_phone: string;
  custom_address: string;
  user: string;
  custom_date_of_birth: string;
  reviews: ReviewType[];
  data: UserData[];
};
type UserData = {
  customer_name: string;
  custom_customer_contact: string;
  custom_phone: string;
  custom_address: string;
  user: string;
  custom_date_of_birth: string;
};

type ReviewType = {
  item_code: string;
  posted_on: string;
  rating: number;
  review: string;
  custom_image_1_link: string;
};
