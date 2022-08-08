import { FC } from "react";
import { NavLink } from "react-router-dom";
import styled from "@emotion/styled";

export const NavBar: FC<any> = ({ setAuth ,auth}) => {

  const logOut =()=>{
    localStorage.clear();
    setAuth(false)
    
  }
  return  (
    <Navbar>
      {auth ? 
        <NavLink className="nav" onClick={logOut} to="/authorization">
          Выйти {" "}
        </NavLink> : <NavLink className="nav" to="/authorization">
         Войти {" "}
        </NavLink>}
    </Navbar>
  );
};

const Navbar = styled.div`
  padding: 32px;
  background-color: #aa2ba3;
  font-size: 24px;
  border-radius: 4px;
  font-weight: bold;
  text-align: right;
  margin-bottom: 30px;
`;
