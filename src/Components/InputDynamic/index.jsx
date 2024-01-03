import { FormLabel, TextField } from "@mui/material";
const InputDynamic = ({ element, section, handleChange }) => {
  return (
    <>
      <FormLabel>{element.label}</FormLabel>
      <TextField
        className="w-100 m-1"
        type="text"
        size="normal"
        variant="outlined"
        label={element.label}
        name={element.name}
        placeholder={element.placeholder ? element.placeholder : ""}
        onChange={(e) => handleChange(e, element.label, section)}
      />
    </>
  );
};
export default InputDynamic;
