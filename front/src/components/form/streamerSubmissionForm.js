import React, { useState } from "react";
import { createNewStreamer } from "../../services/streamerList.service";

export const StreamerSubmissionForm = () => {
  const [input, setInput] = useState({
    streamerName: "",
    platform: "",
    description: "",
  });

  const [errors, setErrors] = useState({
    streamerNameError: "",
    platformError: "",
    descriptionError: "",
  });

  const [validFields, setValidFields] = useState({
    streamerName: false,
    platform: false,
    description: false,
  });

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));

    setValidFields((prevValidFields) => ({
      ...prevValidFields,
      [name]: validateField(name, value),
    }));
  };

  const validateField = (name, value) => {
    switch (name) {
      case "streamerName":
        return value.length >= 3;
      case "platform":
        return value !== "";
      case "description":
        return value.length >= 10 && value.length <= 200;
      default:
        return true;
    }
  };

  const handleClick = (event) => {
    event.preventDefault();
    const newStreamerData = {
      streamerName: input.streamerName,
      platform: input.platform,
      description: input.description,
    };

    let formIsValid = true;
    const updatedErrors = {
      streamerNameError: "",
      platformError: "",
      descriptionError: "",
    };

    if (!validFields.streamerName) {
      formIsValid = false;
      updatedErrors.streamerNameError =
        "The streamer name field is required and must have minimum 3 characters. Please fill in this field.";
    }

    if (!validFields.platform) {
      formIsValid = false;
      updatedErrors.platformError =
        "The platform field is required. Please select an option.";
    }

    if (!validFields.description) {
      formIsValid = false;
      updatedErrors.descriptionError =
        "The description field must be between 10 and 200 characters.";
    }

    setErrors(updatedErrors);

    if (formIsValid) {
      createNewStreamer(newStreamerData);
      window.location.reload();
    }
  };

  return (
    <div className="wrapperForm">
      <div className="formTittle">
        <h4>Add Streamer to List</h4>
      </div>
      <form id="add-streamer-form">
        <label>
          Streamer Name:
          <input
            onChange={handleOnChange}
            name="streamerName"
            value={input.streamerName}
            type="text"
            form="add-streamer-form"
            className={`${errors.streamerNameError ? "error-input" : ""} ${
              validFields.streamerName ? "valid-input" : ""
            }`}
          />
          {validFields.streamerName && (
            <span className="checkmark">&#10004;</span>
          )}
        </label>
        <div className="formError">
          {errors.streamerNameError && <p>{errors.streamerNameError}</p>}
        </div>
        <label>
          Choose Platform:
          <select
            id="platform"
            name="platform"
            form="add-streamer-form"
            onChange={handleOnChange}
            className={`${errors.platformError ? "error-input" : ""} ${
              validFields.platform ? "valid-input" : ""
            }`}
          >
            <option value="">Select Platform</option>
            <option value="Twitch">Twitch</option>
            <option value="YouTube">YouTube</option>
            <option value="TikTok">TikTok</option>
            <option value="Kick">Kick</option>
            <option value="Rumble">Rumble</option>
          </select>
          {validFields.platform && <span className="checkmark">&#10004;</span>}
        </label>
        <div className="formError">
          {errors.platformError && <p>{errors.platformError}</p>}
        </div>
        <label>
          Description:
          <textarea
            onChange={handleOnChange}
            name="description"
            value={input.description}
            rows="4"
            form="add-streamer-form"
            className={`${errors.descriptionError ? "error-input" : ""} ${
              validFields.description ? "valid-input" : ""
            }`}
          />
          {validFields.description && (
            <span className="checkmark">&#10004;</span>
          )}
        </label>
        <div className="formError">
          {errors.descriptionError && <p>{errors.descriptionError}</p>}
        </div>
      </form>
      <button className="button" onClick={handleClick} form="add-streamer-form">
        Send
      </button>
    </div>
  );
};
