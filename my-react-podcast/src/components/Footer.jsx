import React from "react";
import "../footer.css";
const Footer = () => {
  return (
    <footer className="footer">
      <p>
        &copy; <span className="text-danger">{new Date().getFullYear()}</span>{" "}
        Podcast App All right reserved by{" "}
        <span className="text-primary">Mandla Dyonase</span>
      </p>
      {/* Add additional footer content here */}
    </footer>
  );
};

export default Footer;
