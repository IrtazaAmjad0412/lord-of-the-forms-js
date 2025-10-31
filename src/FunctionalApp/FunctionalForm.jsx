import { useState, useRef } from "react";
import { ErrorMessage } from "../ErrorMessage";
import { FunctionalTextInput } from "./FunctionalTextInput";
import { FunctionalPhoneInput } from "./FunctionalPhoneInput";

const firstNameErrorMessage =
  "First name must be at least 2 characters long and can only contain letters";
const lastNameErrorMessage =
  "Last name must be at least 2 characters long and can only contain letters";
const emailErrorMessage = "Email is Invalid";
const cityErrorMessage = "City is Invalid";
const phoneNumberErrorMessage = "Invalid Phone Number";

export const FunctionalForm = () => {
  const [firstNameInput, setFirstNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [cityInput, setCityInput] = useState("");
  const [phoneNumberState, setPhoneNumberState] = useState(["", "", "", ""]);

  const refs = [useRef(), useRef(), useRef(), useRef()];

  const reset = () => {
    setFirstNameInput("");
    setLastNameInput("");
    setEmailInput("");
    setCityInput("");
    setPhoneNumberState(["", "", "", ""]);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log({
      firstNameInput,
      lastNameInput,
      emailInput,
      cityInput,
      phoneNumberState,
    });
    reset();
  };

  const handlePhoneOnChange = (index) => (e) => {
    const lengths = [2, 2, 2, 1];
    const currentMaxLength = lengths[index];
    const nextRef = refs[index + 1];
    const prevRef = refs[index - 1];
    const value = e.target.value;

    const shouldGoToNextRef = currentMaxLength <= value.length && nextRef;
    const shouldGoToPrevRef = value.length === 0 && prevRef;

    const newPhoneNumberState = phoneNumberState.map(
      (phoneNumberInput, phoneNumberIndex) =>
        index === phoneNumberIndex ? value : phoneNumberInput
    );
    if (shouldGoToNextRef) {
      nextRef.current?.focus();
    }
    if (shouldGoToPrevRef) {
      prevRef.current?.focus();
    }
    setPhoneNumberState(newPhoneNumberState);
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <u>
        <h3>User Information Form</h3>
      </u>

      <FunctionalTextInput
        label={"First Name"}
        inputProps={{
          type: "text",
          placeholder: "Bilbo",
          onChange: (e) => {
            setFirstNameInput(e.target.value);
          },
          value: firstNameInput,
        }}
      />
      <ErrorMessage message={firstNameErrorMessage} show={true} />

      <FunctionalTextInput
        label={"Last Name"}
        inputProps={{
          type: "text",
          placeholder: "Baggins",
          onChange: (e) => {
            setLastNameInput(e.target.value);
          },
          value: lastNameInput,
        }}
      />
      <ErrorMessage message={lastNameErrorMessage} show={true} />

      <FunctionalTextInput
        label={"Email"}
        inputProps={{
          type: "email",
          placeholder: "bilbo-baggins@adventurehobbits.net",
          onChange: (e) => {
            setEmailInput(e.target.value);
          },
          value: emailInput,
        }}
      />
      <ErrorMessage message={emailErrorMessage} show={true} />

      <FunctionalTextInput
        label={"City"}
        inputProps={{
          type: "text",
          placeholder: "Hobbiton",
          onChange: (e) => {
            setCityInput(e.target.value);
          },
          value: cityInput,
        }}
      />
      <ErrorMessage message={cityErrorMessage} show={true} />

      <FunctionalPhoneInput
        htmlFor={"phone"}
        label={"Phone"}
        refs={refs}
        handlePhoneOnChange={handlePhoneOnChange}
        phoneNumberState={phoneNumberState}
        inputProps={{
          type: "tel",
          placeholder: "55",
          maxLength: 2,
        }}
      />
      <ErrorMessage message={phoneNumberErrorMessage} show={true} />

      <input type="submit" value="Submit" />
    </form>
  );
};
