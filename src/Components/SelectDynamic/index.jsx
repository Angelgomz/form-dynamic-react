import { TextField } from "@mui/material";
const SelectDynamic = ({ element, section, options, handleChange }) => {
  return (
    <TextField
      className="w-100"
      select
      defaultValue=""
      onChange={(e) => handleChange(e, element.label, section)}
      label={element.label}
      name={element.name}
    >
      {options}
    </TextField>
  );
};
export default SelectDynamic;
