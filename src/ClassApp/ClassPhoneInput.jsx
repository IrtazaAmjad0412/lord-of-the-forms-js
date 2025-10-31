import React, { Component } from "react";

export class ClassPhoneInput extends Component {
  render() {
    const { htmlFor, label, refs, handlePhoneOnChange, phoneNumberState, inputProps } =
      this.props;

    return (
      <div className="input-wrap">
        <label htmlFor={htmlFor}>{label}:</label>
        <div id="phone-input-wrap">
          <input
            id="phone-input-1"
            ref={refs[0]}
            onChange={handlePhoneOnChange(0)}
            value={phoneNumberState[0]}
            {...inputProps}
          />
          -
          <input
            id="phone-input-2"
            ref={refs[1]}
            onChange={handlePhoneOnChange(1)}
            value={phoneNumberState[1]}
            {...inputProps}
          />
          -
          <input
            id="phone-input-3"
            ref={refs[2]}
            onChange={handlePhoneOnChange(2)}
            value={phoneNumberState[2]}
            {...inputProps}
          />
          -
          <input
            id="phone-input-4"
            ref={refs[3]}
            onChange={handlePhoneOnChange(3)}
            value={phoneNumberState[3]}
            {...inputProps}
            placeholder="5"
            maxLength={1}
          />
        </div>
      </div>
    );
  }
}
