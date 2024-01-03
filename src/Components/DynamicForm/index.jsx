import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { ModalFinishContext } from "../../Context";
import ButtonDynamic from "../ButtonDynamic";
import SelectDynamic from "../SelectDynamic";
import RadioDynamic from "../RadioDynamic";
import InputDynamic from "../InputDynamic";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";
import { Card, FormControlLabel, Radio, MenuItem, Grid } from "@mui/material";
import "./index.css";

const DynamicForm = () => {
  const context = useContext(ModalFinishContext);
  const [formData, setFormData] = useState([]);
  const [data, setData] = useState([]);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const ERROR_MESSAGE =
    '¡Ingresaste un json no valido! Para poder crear un formulario extra tu json debe tener la propiedad elements. Ejemplo: {"elements":[{"type":"button"},{"type":"input","name":"description_new","label":"description_45","value":"","placeholder":"test","required":true}]}';
  useEffect(() => {
    AOS.init();
    axios({
      method: "GET",
      url: BASE_URL,
      responseType: "application/json",
    }).then(function (response) {
      let data = JSON.parse(response?.data);
      setFormData(data[0]?.forms?.sections || []);
    });
  }, [BASE_URL]);

  const showAlert = () => {
    Swal.fire({
      title: "¡Ingresaste un json no valido!",
      text: ERROR_MESSAGE,
      icon: "error",
      confirmButtonText: "Entendido",
    });
  };

  const handleChange = (event, label, section_id) => {
    const object = {
      name: event.target.name,
      value: event.target.value,
      label,
      section_id,
    };
    const records = data.filter(
      (dat) =>
        (dat.label === label && dat.section_id !== section_id) ||
        dat.label !== label
    );
    records.push(object);
    setData(records);

    try {
      if (event.target.type === "text") {
        const form = JSON.parse(event.target.value);
        Object.prototype.hasOwnProperty.call(form, "elements")
          ? setFormData((current) => [...current, form])
          : showAlert();
      }
    } catch (e) {
      return false;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    context.setData(data);
    context.setOpen(true);
  };

  const renderRadioElement = (element, section, options) => (
    <RadioDynamic
      element={element}
      options={options}
      section={section}
      handleChange={handleChange}
    />
  );
  const renderInputElement = (element, section) => (
    <InputDynamic
      element={element}
      section={section}
      handleChange={handleChange}
    />
  );
  const renderSelectElement = (element, section, options) => (
    <SelectDynamic
      element={element}
      section={section}
      options={options}
      handleChange={handleChange}
    />
  );
  const renderButtonElement = () => <ButtonDynamic />;
  const getElements = (elements, section) => {
    let section_id = section;
    let options = [];
    const htmlElements = elements
      .sort((a) => (a.type == "button" ? 1 : -1))
      .map(function (element) {
        switch (element.type) {
          case "input":
            return renderInputElement(element, section_id);
          case "select":
            options = [];
            element.options.map((option) =>
              options.push(
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              )
            );
            return renderSelectElement(element, section_id, options);
          case "radio":
            options = [];
            element.options.map((option, i) =>
              options.push(
                <FormControlLabel
                  key={i}
                  value={option}
                  control={<Radio />}
                  label={option}
                />
              )
            );
            return renderRadioElement(element, section_id, options);
          case "button":
            return renderButtonElement();
          default:
            return null;
        }
      });
    return htmlElements;
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <form onSubmit={handleSubmit}>
          {formData.map(function (formDat, i) {
            return (
              <Card key={i} className="card" variant="outlined">
                <p className="title"> Sección {formDat.id} </p>
                {getElements(formDat.elements, formDat.id)}
              </Card>
            );
          })}
        </form>
      </Grid>
      <Grid item xs={11} sm={6} data-aos="fade-up">
        <div className="instructions">
          <p className="title-instructions">
            <strong>Instrucciones: </strong>
          </p>
          <p>
            {" "}
            En caso de añadir un JSON para agregar más en un input debe poseer
            la propiedad elements.
          </p>
        </div>
      </Grid>
    </Grid>
  );
};
export default DynamicForm;
