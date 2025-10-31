import React, { createRef, Component } from "react";
import { ErrorMessage } from "../ErrorMessage";
import { ClassTextInput } from "./ClassTextInput";
import { ClassPhoneInput } from "./ClassPhoneInput";
import { isEmailValid, isCityValid, isPhoneValid } from "../utils/validations";

const firstNameErrorMessage =
  "First name must be at least 2 characters long and can only contain letters";
const lastNameErrorMessage =
  "Last name must be at least 2 characters long and can only contain letters";
const emailErrorMessage = "Email is Invalid";
const cityErrorMessage = "City is Invalid";
const phoneNumberErrorMessage = "Invalid Phone Number";

export class ClassForm extends Component {
  constructor(props) {
    super(props);

    this.refsArray = [createRef(), createRef(), createRef(), createRef()];
  }

  reset = () => {
    const {
      setFirstNameInput,
      setLastNameInput,
      setEmailInput,
      setCityInput,
      setPhoneNumberState,
    } = this.props;

    setFirstNameInput("");
    setLastNameInput("");
    setEmailInput("");
    setCityInput("");
    setPhoneNumberState(["", "", "", ""]);
  };

  handleOnSubmit = (e) => {
    e.preventDefault();
    const {
      firstNameInput,
      lastNameInput,
      emailInput,
      cityInput,
      phoneNumberState,
      setIsSubmitted,
      setSubmittedFormData,
    } = this.props;

    const isFirstNameInputValid = /^[A-Za-z]{2,}$/.test(firstNameInput);
    const isLastNameInputValid = /^[A-Za-z]{2,}$/.test(lastNameInput);
    const isEmailInputValid = isEmailValid(emailInput);
    const isCityInputValid = isCityValid(cityInput);
    const isPhoneNumberInputValid = isPhoneValid(phoneNumberState);

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
      this.reset();
    } else {
      alert("Bad Inputs");
    }
  };

  handlePhoneOnChange = (index) => (e) => {
    const { phoneNumberState, setPhoneNumberState } = this.props;
    const lengths = [2, 2, 2, 1];
    const currentMaxLength = lengths[index];
    const nextRef = this.refsArray[index + 1];
    const prevRef = this.refsArray[index - 1];
    const value = e.target.value;

    const shouldGoToNextRef = currentMaxLength <= value.length && nextRef;
    const shouldGoToPrevRef = value.length === 0 && prevRef;

    const newPhoneNumberState = phoneNumberState.map(
      (phoneNumberInput, phoneNumberIndex) =>
        index === phoneNumberIndex ? value : phoneNumberInput
    );

    if (shouldGoToNextRef) nextRef.current?.focus();
    if (shouldGoToPrevRef) prevRef.current?.focus();

    setPhoneNumberState(newPhoneNumberState);
  };

  render() {
    const {
      firstNameInput,
      setFirstNameInput,
      lastNameInput,
      setLastNameInput,
      emailInput,
      setEmailInput,
      cityInput,
      setCityInput,
      phoneNumberState,
      isSubmitted,
    } = this.props;

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

    return (
      <form onSubmit={this.handleOnSubmit}>
        <u>
          <h3>User Information Form</h3>
        </u>

        <ClassTextInput
          label={"First Name"}
          inputProps={{
            type: "text",
            placeholder: "Bilbo",
            onChange: (e) => setFirstNameInput(e.target.value),
            value: firstNameInput,
          }}
        />
        {shouldShowFirstNameError && (
          <ErrorMessage message={firstNameErrorMessage} show={true} />
        )}

        <ClassTextInput
          label={"Last Name"}
          inputProps={{
            type: "text",
            placeholder: "Baggins",
            onChange: (e) => setLastNameInput(e.target.value),
            value: lastNameInput,
          }}
        />
        {shouldShowLastNameError && (
          <ErrorMessage message={lastNameErrorMessage} show={true} />
        )}

        <ClassTextInput
          label={"Email"}
          inputProps={{
            type: "type",
            placeholder: "bilbo-baggins@adventurehobbits.net",
            onChange: (e) => setEmailInput(e.target.value),
            value: emailInput,
          }}
        />
        {shouldShowEmailError && <ErrorMessage message={emailErrorMessage} show={true} />}

        <ClassTextInput
          label={"City"}
          inputProps={{
            type: "text",
            placeholder: "Hobbiton",
            onChange: (e) => setCityInput(e.target.value),
            value: cityInput,
          }}
        />
        {shouldShowCityError && <ErrorMessage message={cityErrorMessage} show={true} />}

        <ClassPhoneInput
          htmlFor={"phone"}
          label={"Phone"}
          refs={this.refsArray}
          handlePhoneOnChange={this.handlePhoneOnChange}
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
  }
}
