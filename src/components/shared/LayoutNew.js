import React from "react";
import HeaderNew from "../HeaderNew";
import FooterNew from "../FooterNew";
import Footer from "../Footer";
import Loader from "../Loader";

const LayoutNew = ({ children }) => {
  return <>
  <HeaderNew/>
  {children}
  <Loader/>
  <Footer />
  <FooterNew/>
  </>;
};

export default LayoutNew;
