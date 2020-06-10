import React from "react";
import "./styles/layout.css";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-info">
        Copyright <i className="far fa-copyright"></i> 2019. Malik Shaik
      </div>
      <div className="footer-contact">
        <i className="fas fa-envelope fa-lg"></i>
        <i className="fab fa-linkedin fa-lg"></i>
        <i className="fab fa-github fa-lg"></i>
      </div>
    </footer>
  );
};

export default Footer;
