import React, { useState } from "react";
import axios from "axios";

export const UpdateProductModal = ({
  setShowUpdateModal,
  nameUser,
  updateStreamerId,
  streamerToUpdate,
}) => {
  const apiServerUrl = process.env.REACT_APP_API_SERVER_URL;

  const [errorIsVisible, setErrorIsVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [input, setInput] = useState({
    userName: nameUser,
    streamerName: streamerToUpdate.streamerName,
    platform: streamerToUpdate.platform,
    description: streamerToUpdate.description,
  });

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setInput((prevInput) => {
      return {
        ...prevInput,
        [name]: value,
      };
    });
  };
  // ERRORS
  const streamerNameNull = () => {
    setErrorIsVisible(true);
    setErrorMessage("Pole Nazwa jest wymagane. Proszę je uzupełnić.");
  };
  const platformNull = () => {
    setErrorIsVisible(true);
    setErrorMessage("Pole Pojemność jest wymagane. Proszę je uzupełnić.");
  };
  const descriptionNull = () => {
    setErrorIsVisible(true);
    setErrorMessage(
      "Pole Opakowanie zbiorcze jest wymagane. Proszę je uzupełnić."
    );
  };
  //.
  const handleCloseUpdateModal = () => setShowUpdateModal(false);
  const handleClick = (event) => {
    event.preventDefault();
    const updateStreamer = {
      userName: nameUser,
      streamerName: input.streamerName,
      platform: input.platform,
      description: input.description,
    };
    if (!nameUser) {
      return null;
    }
    if (!input.streamerName) {
      return streamerNameNull();
    }
    if (!input.platform) {
      return platformNull();
    }
    if (!input.description) {
      return descriptionNull();
    }
    axios.post(
      `${apiServerUrl}/api/messages/update/` + updateStreamerId,
      updateStreamer
    );
    setShowUpdateModal(false);
    window.location.reload();
  };

  return (
    <div className="wrapper">
      <div className="productModal">
        <div className="productModal__top">
          <p className="productModal__title">
            Edytujesz: <strong>{streamerToUpdate.streamerName}</strong>
          </p>
          <div className="productModal__xbtn" onClick={handleCloseUpdateModal}>
            &#10006;
          </div>
        </div>
        <div className="productModal__form">
          {errorIsVisible ? (
            <div className="error__div">
              <p>{errorMessage}</p>
            </div>
          ) : null}
          <form id="update__storage-form"></form>
          <div className="table-responsive">
            <table className="table__modal">
              <tr>
                <th>Streamer Name</th>
                <th>
                  <input
                    onChange={handleOnChange}
                    name="streamerName"
                    value={input.streamerName}
                    type="text"
                    form="update__storage-form"
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
                    form="update__storage-form"
                  />
                </th>
              </tr>
              <tr>
                <th>description</th>
                <th>
                  <input
                    onChange={handleOnChange}
                    name="description"
                    value={input.description}
                    type="text"
                    form="update__storage-form"
                  />
                </th>
              </tr>
            </table>
          </div>
          <button
            className="button button--primary width-100"
            onClick={handleClick}
            form="update__storage-form"
          >
            Zmień
          </button>
        </div>
      </div>
    </div>
  );
};
