import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
interface IMainLayoutProps{
    cart: any[]
}

const MainLayout = ({cart}:IMainLayoutProps) => {
  return (
    <>
      <Navbar  cart = {cart}/>
      <Outlet />
    </>
  );
};

export default MainLayout;