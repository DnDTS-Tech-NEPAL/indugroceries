// components/DeliveryNote.tsx

"use client";

import { Box, Input, Text } from "@chakra-ui/react";
import { FormProvider, useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import { FormControl } from "@/components";

interface DeliveryNoteProps {
  deliveryNote: string;
  setDeliveryNote: (note: string) => void;
}

export const DeliveryNote = ({
  deliveryNote,
  setDeliveryNote,
}: DeliveryNoteProps) => {
  const methods = useForm({ defaultValues: { note: deliveryNote } });
  const { watch } = methods;

  const note = watch("note");
  const [debouncedNote, setDebouncedNote] = useState(note);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (note && note.trim() !== debouncedNote) {
        const trimmed = note.trim();
        setDebouncedNote(trimmed);
        setDeliveryNote(trimmed);
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, [note, debouncedNote]);

  return (
    <FormProvider {...methods}>
      {/* <Input name="note" type="textarea"
                  placeholder="Add Special Note in your order"
                  textAlign="center"
                  h={20}
                />  */}
      <FormControl
        inputType="textarea"
        placeholder="Add any specific delivery or order instructions"
        name="note"
      />
    </FormProvider>
  );
};
