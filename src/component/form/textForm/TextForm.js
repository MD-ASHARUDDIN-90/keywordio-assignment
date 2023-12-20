import React, { useState } from "react";
import styles from "./Form.module.css";
import Navbar from "../../navbar/Navbar";
import { useNavigate } from "react-router-dom";
import SubmitModal from "../../submitModal/SubmitModal";

const TextForm = () => {
  const navigation = useNavigate();

  // State to store form values
  const [formValues, setFormValues] = useState({
    Heading1: "",
    Heading2: "",
    Description01: "",
    BusinessName: "",
    ButtonLabel: "Select a label that suits your ad",
    Website: "",
  });

  // Function to update form values
  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  const [open, setOpen] = useState(false);
  // Function to handle form submission
  const handleSubmit = () => {
    // Log form values to the console
    console.log("Form Values:", formValues);
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
      navigation("/create-ad");
    }, 600);
    // You can perform further actions here, such as sending the data to a server.
  };

  return (
    <>
      <div className={styles.container}>
        <Navbar />
        <div className={styles.content}>
          <div className={styles.form}>
            <h3>Create Text & Media</h3>
            <div className={styles.headingDescription}>
              <div className={styles.upperHeadInput}>
                <div className={styles.inputContainer}>
                  <label htmlFor='Heading1'>Heading 01</label>
                  <input
                    id='Heading1'
                    type='text'
                    placeholder='Add a heading that would make the user interested'
                    value={formValues.Heading1}
                    onChange={handleInputChange}
                  />
                </div>
                <div className={styles.inputContainer}>
                  <label htmlFor='Heading2'>Heading 02</label>
                  <input
                    id='Heading2'
                    type='text'
                    placeholder='Add a heading that would make the user interested'
                    value={formValues.Heading2}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className={styles.textContainer}>
                <div className={styles.inputContainer}>
                  <label htmlFor='Description01'>Description 01</label>
                  <textarea
                    className={styles.textareaClass}
                    id='Description01'
                    placeholder='Add a primary text that will make the user understand about your products, services or offers'
                    value={formValues.Description01}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
              </div>
            </div>
            <div className={styles.businessInputSelect}>
              <div className={styles.inputContainer}>
                <label htmlFor='BusinessName'>Business Name</label>
                <input
                  id='BusinessName'
                  type='text'
                  placeholder='Add your business name'
                  value={formValues.BusinessName}
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor='ButtonLabel'>Button Label</label>
                <select
                  id='ButtonLabel'
                  value={formValues.ButtonLabel}
                  onChange={handleInputChange}
                >
                  <option>Select a label that suits your ad</option>
                  <option>Trending</option>
                  <option>Marketing</option>
                  <option>Business</option>
                </select>
              </div>
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor='Website'>Website URL</label>
              <input
                id='Website'
                type='text'
                placeholder='Add the URL of the landing page that you want to redirect the user'
                value={formValues.Website}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.buttons}>
              <button onClick={() => navigation(-1)}>Back</button>
              <button onClick={handleSubmit}>Submit</button>
            </div>
          </div>
        </div>
      </div>

      <SubmitModal open={open} setOpen={setOpen} />
    </>
  );
};

export default TextForm;
