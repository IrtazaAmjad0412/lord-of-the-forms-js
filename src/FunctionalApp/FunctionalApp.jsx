import { useState } from "react";
import { ProfileInformation } from "../ProfileInformation";
import { FunctionalForm } from "./FunctionalForm";

export const FunctionalApp = ({ submittedFormData, setSubmittedFormData }) => {
  const [firstNameInput, setFirstNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [cityInput, setCityInput] = useState("");
  const [phoneNumberState, setPhoneNumberState] = useState(["", "", "", ""]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <>
      <h2>Functional</h2>
      <ProfileInformation userData={submittedFormData} />
      <FunctionalForm
        firstNameInput={firstNameInput}
        setFirstNameInput={setFirstNameInput}
        lastNameInput={lastNameInput}
        setLastNameInput={setLastNameInput}
        emailInput={emailInput}
        setEmailInput={setEmailInput}
        cityInput={cityInput}
        setCityInput={setCityInput}
        phoneNumberState={phoneNumberState}
        setPhoneNumberState={setPhoneNumberState}
        isSubmitted={isSubmitted}
        setIsSubmitted={setIsSubmitted}
        setSubmittedFormData={setSubmittedFormData}
      />
    </>
  );
};
