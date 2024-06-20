import React, { useState } from "react";

const DisDropdown = () => {
  const options = ["Pune", "Yavatmal", "Mumbai"]; // Static array of states

  const [selectedOption, setSelectedOption] = useState(null);
  const [isOpen, setIsOpen] = useState(true); // Initialize isOpen to true for default visibility

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="dropdown">
      <div className="selected-option" onClick={toggleDropdown}>
        <div className="main-content">{selectedOption || "Select a State"}</div>
        <div className={`arrow ${isOpen ? "open" : ""}`}></div>
      </div>
      {isOpen && (
        <div className="options">
          {options.map((option) => (
            <div
              key={option}
              className="option"
              onClick={() => handleSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DisDropdown;
