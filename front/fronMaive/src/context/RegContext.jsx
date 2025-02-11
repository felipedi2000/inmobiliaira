import React, { createContext, useState } from "react";
import PropTypes from "prop-types";

const RegContext = createContext();

const RegProvider = ({ children }) => {
  const [reg, setReg] = useState(null);

  return (
    <RegContext.Provider value={{ reg, setReg}}>
      {children}
    </RegContext.Provider>
  );
};

RegProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { RegContext, RegProvider };
