import { Box, FormLabel, RadioGroup } from "@mui/material";
const RadioDynamic = ({ element, options, section, handleChange }) => {
  return (
    <Box className="box">
      <FormLabel>
        <strong>{element.label}</strong>
      </FormLabel>
      <RadioGroup
        name={element.name}
        onChange={(e) => handleChange(e, element.label, section)}
        row
        className="flex"
        required={element.required}
      >
        {options}
      </RadioGroup>
    </Box>
  );
};
export default RadioDynamic;
