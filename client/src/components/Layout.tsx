import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
  return (
    <div className=" bg-gray-100">
      <Header />
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
