import { useRoutes, BrowserRouter } from "react-router-dom";
import {ModalFinishFormProvider} from '../../Context' 
import Home from "../Home/";
import NotFound from "../NotFound/";
import Navbar  from "../../Components/Navbar";
import "./App.css";
const AppRoutes = () => {
  let routes = useRoutes([
    {path: "/",element: <Home />},
    {path: '/*',element:<NotFound/>}
  ]);
  return routes;
};

const App = () => {
  return (
    <ModalFinishFormProvider>
      <BrowserRouter>
        <Navbar />
        <AppRoutes />
      </BrowserRouter>
    </ModalFinishFormProvider>
  );
};

export default App;
