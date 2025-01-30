
import PropTypes from "prop-types";
import React from "react";
import { Header } from "../header/header";
import { Footer } from "../footer/footer";



export const Layout = (children) => {
  return (
    <div>
    <Header />
    <main>{children}</main>
    <Footer />
  </div>
  )
}
Layout.propTypes = {
  children: PropTypes.node.isRequired,
};