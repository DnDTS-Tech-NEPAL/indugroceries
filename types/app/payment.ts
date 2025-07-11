import { ValueChangeDetails } from "@zag-js/radio-group";

export type PaymentMethodProps = {
  selectedPaymentMethod: string;
  handlePaymentMethodChange: (details: ValueChangeDetails) => void;
  setDeliveryNote: (note: string) => void;
};

export type SummaryProps = {
  selectedPaymentMethod: string;
  delivery_note: string;

};
