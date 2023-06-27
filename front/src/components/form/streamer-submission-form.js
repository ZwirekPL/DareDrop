import React, { useState } from "react";
import axios from "axios";

export const StreamerSubmissionForm = () => {
  const apiServerUrl = process.env.REACT_APP_API_SERVER_URL;
  const [errorIsVisible, setErrorIsVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [input, setInput] = useState({
    streamerName: "",
    platform: "",
    description: "",
  });

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    const toLowerCase = value.toLowerCase();
    setInput((prevInput) => {
      return {
        ...prevInput,
        [name]: toLowerCase,
      };
    });
  };

  // ERRORS
  const streamerNameNull = () => {
    setErrorIsVisible(true);
    setErrorMessage("Pole nazwa jest wymagane. Proszę je uzupełnić.");
  };
  const platformNull = () => {
    setErrorIsVisible(true);
    setErrorMessage("Pole pojemność jest wymagane. Proszę je uzupełnić.");
  };
  const descriptionNull = () => {
    setErrorIsVisible(true);
    setErrorMessage("Pole jednostka jest wymagane. Proszę je uzupełnić.");
  };
  //.

  const handleClick = (event) => {
    event.preventDefault();
    const newstreamerName = {
      streamerName: input.streamerName,
      platform: input.platform,
      description: input.description,
    };
    if (!input.streamerName) {
      return streamerNameNull();
    }
    if (!input.platform) {
      return platformNull();
    }

    if (!input.description) {
      return descriptionNull();
    }

    axios.post(`${apiServerUrl}/api/messages/create`, newstreamerName);
    window.location.reload();

    // console.log(newstreamerName);
  };

  return (
    <div className="wrapper">
      <div className="productModal">
        <div className="productModal__top">
          <p className="productModal__title">Add Streamer to ranking </p>
        </div>
        <div className="productModal__form">
          {errorIsVisible ? (
            <div className="error__div">
              <p>{errorMessage}</p>
            </div>
          ) : null}
          <form id="add__storage-form"></form>
          <table className="table__modal">
            <tr>
              <th>Streamer Name</th>
              <th>
                <input
                  autoFocus
                  onChange={handleOnChange}
                  name="streamerName"
                  value={input.streamerName}
                  type="text"
                  form="add__storage-form"
                />
              </th>
            </tr>
            <tr>
              <th>Platform</th>
              <th>
                <input
                  onChange={handleOnChange}
                  name="platform"
                  value={input.platform}
                  type="text"
                  form="add__storage-form"
                />
              </th>
            </tr>
            <tr>
              <th>Description</th>
              <th>
                <input
                  onChange={handleOnChange}
                  name="description"
                  value={input.description}
                  type="text"
                  form="add__storage-form"
                />
              </th>
            </tr>
          </table>
          <button
            className="button button--primary width-100"
            onClick={handleClick}
            form="add__storage-form"
          >
            Dodaj
          </button>
        </div>
      </div>
    </div>
  );
};
