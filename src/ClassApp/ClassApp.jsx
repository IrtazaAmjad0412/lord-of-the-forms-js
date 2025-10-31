import React, { Component } from "react";
import { ProfileInformation } from "../ProfileInformation";
import { ClassForm } from "./ClassForm";

export class ClassApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstNameInput: "",
      lastNameInput: "",
      emailInput: "",
      cityInput: "",
      phoneNumberState: ["", "", "", ""],
      isSubmitted: false,
    };
  }

  render() {
    const {
      firstNameInput,
      lastNameInput,
      emailInput,
      cityInput,
      phoneNumberState,
      isSubmitted,
    } = this.state;

    const { submittedFormData, setSubmittedFormData } = this.props;

    return (
      <>
        <h2>Class</h2>
        <ProfileInformation userData={submittedFormData} />
        <ClassForm
          firstNameInput={firstNameInput}
          setFirstNameInput={(value) => this.setState({ firstNameInput: value })}
          lastNameInput={lastNameInput}
          setLastNameInput={(value) => this.setState({ lastNameInput: value })}
          emailInput={emailInput}
          setEmailInput={(value) => this.setState({ emailInput: value })}
          cityInput={cityInput}
          setCityInput={(value) => this.setState({ cityInput: value })}
          phoneNumberState={phoneNumberState}
          setPhoneNumberState={(value) => this.setState({ phoneNumberState: value })}
          isSubmitted={isSubmitted}
          setIsSubmitted={(value) => this.setState({ isSubmitted: value })}
          setSubmittedFormData={setSubmittedFormData}
        />
      </>
    );
  }
}
