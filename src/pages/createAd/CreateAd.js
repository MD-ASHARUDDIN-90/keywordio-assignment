import React, { useState } from "react";
import style from "./CreatedAd.module.css";
import Navbar from "../../component/navbar/Navbar";
import textImage from "../../assets/Screenshot 2023-12-20 000102.png";
import mediaImage from "../../assets/Screenshot 2023-12-20 000117.png";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function CreateAd() {
  const navigate = useNavigate();
  const checkboxComponent = [
    {
      id: "text",
      url: textImage,
      alt: "Text Ad",
    },
    {
      id: "media",
      url: mediaImage,
      alt: "Media Ad",
    },
  ];

  const [selectedCheckbox, setSelectedCheckbox] = useState(null);
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const handleCheckboxChange = (id) => {
    setSelectedCheckbox(id);
  };

  const handleNext = () => {
    if (selectedCheckbox) {
      navigate(`/${selectedCheckbox}`);
    } else {
      setIsButtonClicked(true);
      setTimeout(() => setIsButtonClicked(false), 800); // Change back to normal after 1 second
    }
  };

  return (
    <div className={style.container}>
      <Navbar />

      <div className={style.content_container}>
        <h3>Create Ads</h3>

        <div className={style.option_container}>
          {checkboxComponent.map((item) => {
            return (
              <div key={item.id} style={{ cursor: "pointer" }}>
                <div
                  style={{
                    backgroundColor: isButtonClicked
                      ? "rgb(21, 98, 253 , 0.3)"
                      : "initial",
                  }}
                  className={style.box}
                >
                  <input
                    id={item.id}
                    type='checkbox'
                    checked={selectedCheckbox === item.id}
                    onChange={() => handleCheckboxChange(item.id)}
                    style={{ transform: "scale(1.1)" }}
                  />
                  <br />
                  <label
                    htmlFor={item.id}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ width: "70%" }}>
                      <img
                        style={{
                          width: "100%",
                          height: "auto",
                          cursor: "pointer",
                        }}
                        src={item.url}
                        alt={item.alt}
                      />
                    </div>
                  </label>
                </div>
                <div
                  className={style.inputHead}
                  onClick={() => handleCheckboxChange(item.id)}
                >
                  <h5>Create</h5>
                  <h3>{item.alt}</h3>
                </div>
              </div>
            );
          })}
        </div>
        <div className={style.buttonContainer}>
          <button onClick={handleNext} className={style.button}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateAd;
