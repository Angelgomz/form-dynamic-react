import axios from "axios";
import { useContext } from "react";
import { ModalFinishContext } from "../../Context"
import { useEffect, useState } from "react"
import Swal from 'sweetalert2'
import AOS from 'aos';
import 'aos/dist/aos.css';
import {
  Card,
  FormLabel,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Box,
  MenuItem,
  Button,
  Grid,
} from "@mui/material"
import "./index.css"

const DynamicForm = () => {
  const context = useContext(ModalFinishContext)
  const [formData, setFormData] = useState([])
  const [data, setData] = useState([])
  const baseUrl = "https://run.mocky.io/v3/bc6f92ce-dab7-4ad5-a0f8-0b4a1a160dd1"

  useEffect(() => {
    AOS.init();
    axios({
      method: "GET",
      url: baseUrl,
      responseType: "application/json",
    }).then(function(response) {
      let data = JSON.parse(response.data);
      setFormData(data[0].forms.sections);
    });
  }, []);

  const showAlert = () => {
    Swal.fire({
      title: '¡Ingresaste un json no valido!',
      text: 'Para poder crear un formulario extra tu json debe tener la propiedad elements. Ejemplo:{"elements":[{"type":"button"},{"type":"input","name":"description_new","label":"description_45","value":"","placeholder":"test","required":true}]}',
      icon: 'error',
      confirmButtonText: 'Entendido'
    })
  }

  const handleChange = (event, label, section_id) => {
    let object = {name: event.target.name,value: event.target.value,label: label,section_id: section_id}
    let records = data.filter(function (dat) {
      return (  (dat.label == label && dat.section_id != section_id) || dat.label != label )
    })
    records.push(object)
    setData(records)
    try{
    if(event.target.type == 'text'){
    let form = JSON.parse(event.target.value)
    Object.prototype.hasOwnProperty.call(form, "elements") ? setFormData((current) => [...current, form]): showAlert()
    }
    }
    catch(e){
      return false;
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    context.setData(data);
    context.setOpen(true);
  };
  const getElements = (elements) => {
    let htmlElement = []
    elements = elements.sort((a) => (a.type == "button" ? 1 : -1))

    elements.map(function (element, section) {
      let radioGroupOptions = []
      let menuItemOptions = []
      switch (element.type) {
        case "input":
          htmlElement.push(
            <Box className="box">
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
            </Box>
          );
          break;
        case "select":
          element.options.map((option) => {
            menuItemOptions.push(
              <MenuItem key={option} value={option}>
                {" "}
                {option}
              </MenuItem>
            );
          });
          htmlElement.push(
            <TextField
              className="w-100"
              select
              onChange={(e) => handleChange(e, element.label, section)}
              label={element.label}
              name={element.name}
            >
              {menuItemOptions}
            </TextField>
          );
          break;
        case "radio":
          element.options.map((option) => {
            radioGroupOptions.push(
              <FormControlLabel
                key={option}
                value={option}
                control={<Radio />}
                label={option}
              />
            );
          });
          htmlElement.push(
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
                {radioGroupOptions}
              </RadioGroup>
            </Box>
          );
          break;
        case "button":
          htmlElement.push(
            <Button className="btn-submit" type="submit">CONFIRMAR</Button>
          );
          break;
      }
    });
    return htmlElement;
  };
  return (
    <Grid container spacing={2}>
       <Grid item xs={12} sm={6}>
          <form onSubmit={handleSubmit}>
            {formData.map(function (formDat, i) {
              return (
                <Card className="card" variant="outlined" key={i}>
                    <p className="title" key={formDat.id}>
                      Sección {formDat.id}
                    </p>
                      {getElements(formDat.elements, formDat.id)}
                </Card>
              );
            })}
          </form>
    </Grid>
    <Grid item xs={11} sm={6} data-aos="fade-up">
            <div className="instructions">
              <p className="title-instructions"><strong>Instrucciones: </strong></p>
                <text> En caso de añadir un JSON para agregar más en un input debe poseer la propiedad elements.
                </text>
            </div>
    </Grid>
    </Grid>
  );
};
export default DynamicForm
