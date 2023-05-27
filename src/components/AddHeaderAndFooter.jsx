import React from "react";
import { Header } from "./header/Header";
import { Footer } from "./footer/Footer";

export function AddHeaderAndFooter(Component) {
  return function() {
    return(
      <div className="after-logging-in">
        <Header />
        <Component />
        <Footer />
      </div>
    )
  }
}