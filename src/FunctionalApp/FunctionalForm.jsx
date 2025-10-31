import { useRef } from "react";
import { ErrorMessage } from "../ErrorMessage";
import { FunctionalTextInput } from "./FunctionalTextInput";
import { FunctionalPhoneInput } from "./FunctionalPhoneInput";
import { isEmailValid, isCityValid, isPhoneValid } from "../utils/validations";

const firstNameErrorMessage =
  "First name must be at least 2 characters long and can only contain letters";
const lastNameErrorMessage =
  "Last name must be at least 2 characters long and can only contain letters";
const emailErrorMessage = "Email is Invalid";
const cityErrorMessage = "City is Invalid";
const phoneNumberErrorMessage = "Invalid Phone Number";

export const FunctionalForm = ({
  firstNameInput,
  setFirstNameInput,
  lastNameInput,
  setLastNameInput,
  emailInput,
  setEmailInput,
  cityInput,
  setCityInput,
  phoneNumberState,
  setPhoneNumberState,
  isSubmitted,
  setIsSubmitted,
  setSubmittedFormData,
}) => {
  const refs = [useRef(), useRef(), useRef(), useRef()];

  const isFirstNameInputValid = /^[A-Za-z]{2,}$/.test(firstNameInput);
  const isLastNameInputValid = /^[A-Za-z]{2,}$/.test(lastNameInput);
  const isEmailInputValid = isEmailValid(emailInput);
  const isCityInputValid = isCityValid(cityInput);
  const isPhoneNumberInputValid = isPhoneValid(phoneNumberState);

  const shouldShowFirstNameError = isSubmitted && !isFirstNameInputValid;
  const shouldShowLastNameError = isSubmitted && !isLastNameInputValid;
  const shouldShowEmailError = isSubmitted && !isEmailInputValid;
  const shouldShowCityError = isSubmitted && !isCityInputValid;
  const shouldShowPhoneNumberError = isSubmitted && !isPhoneNumberInputValid;

  const reset = () => {
    setFirstNameInput("");
    setLastNameInput("");
    setEmailInput("");
    setCityInput("");
    setPhoneNumberState(["", "", "", ""]);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    if (
      isFirstNameInputValid &&
      isLastNameInputValid &&
      isEmailInputValid &&
      isCityInputValid &&
      isPhoneNumberInputValid
    ) {
      setSubmittedFormData({
        firstNameInput,
        lastNameInput,
        emailInput,
        cityInput,
        phoneNumberState,
      });
      reset();
    } else {
      alert("Bad Inputs");
    }
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
      {shouldShowFirstNameError && (
        <ErrorMessage message={firstNameErrorMessage} show={true} />
      )}

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
      {shouldShowLastNameError && (
        <ErrorMessage message={lastNameErrorMessage} show={true} />
      )}

      <FunctionalTextInput
        label={"Email"}
        inputProps={{
          type: "type",
          placeholder: "bilbo-baggins@adventurehobbits.net",
          onChange: (e) => {
            setEmailInput(e.target.value);
          },
          value: emailInput,
        }}
      />
      {shouldShowEmailError && <ErrorMessage message={emailErrorMessage} show={true} />}

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
      {shouldShowCityError && <ErrorMessage message={cityErrorMessage} show={true} />}

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
      {shouldShowPhoneNumberError && (
        <ErrorMessage message={phoneNumberErrorMessage} show={true} />
      )}

      <input type="submit" value="Submit" />
    </form>
  );
};
