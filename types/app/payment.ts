import { ValueChangeDetails } from "@zag-js/radio-group";

export type PaymentMethodProps = {
  selectedPaymentMethod: string;
  handlePaymentMethodChange: (details: ValueChangeDetails) => void;
};

export type SummaryProps = {
  selectedPaymentMethod: string;
};
