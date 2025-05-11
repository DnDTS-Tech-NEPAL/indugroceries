import { SearchIcon } from "@/assets/svg";
import { SearchInputProps } from "@/types";

import { TextFieldInput } from "./TextField";

export const SearchInput: React.FC<SearchInputProps> = (props) => {
  return <TextFieldInput {...props} startElement={<SearchIcon />} />;
};
