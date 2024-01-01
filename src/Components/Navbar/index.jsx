import { NavLink } from "react-router-dom";
import { FaHouse } from "react-icons/fa6";
import './navbar.css'
const Navbar = () => {
    const activeStyle = "underline";
    
  return (
    <nav>
        <ul className="flex justify-content-between align-items-between">
          <div>
              <li><strong>© Kuantaz</strong></li>
          </div>
          <div>
              <li className="font-semibold text-lg">
              <NavLink to="/" 
              className={({ isActive }) => isActive ? activeStyle : ""}>
              {" "}
              <FaHouse />
              </NavLink>
              </li>
          </div>
        </ul>
    </nav>
  );
};

export default Navbar;
