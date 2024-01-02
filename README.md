# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

### Project Structure 
```shell script
├── form-dynamic-reac
│   ├── src
│     ├── components
|     ├── context
|     ├── pages
|   |index.css
|   |main.jsx 
├── index.html
├── package.json
├── vite.config.js
├── README.md
```
# SET UP 
<strong> Installation via GITHUB </string>
```shell script
$ git clone https://github.com/Angelgomz/form-dynamic-react 
$ cd form-dinamyic-react
$ npm install 
$ npm run dev
```

**Enviroments api**:
* https://run.mocky.io/v3/bc6f92ce-dab7-4ad5-a0f8-0b4a1a160dd1: Principal entry point of the application, it creates all the form. 
* {"elements":[{"type":"button"},{"type":"input","name":"description_new","label":"Alternative description","value":"","placeholder":"test","required":true}]}: Example of json that could be insert in input's form to create more forms.
