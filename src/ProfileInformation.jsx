import { capitalize, formatPhoneNumber } from "./utils/transformations";

export const InfoRow = ({ label, value }) => {
  return (
    <div>
      <span style={{ marginRight: 5 }}>
        <b>{label}:</b>
      </span>
      <span>{value}</span>
    </div>
  );
};
export const ProfileInformation = ({ userData }) => {
  if (!userData) {
    return (
      <>
        <u>
          <h3>Your Submitted User Information</h3>
        </u>
        <div className="user-info">
          <div>No information provided</div>
        </div>
      </>
    );
  }
  // eslint-disable-next-line no-unused-vars
  const {
    emailInput,
    firstNameInput,
    lastNameInput,
    phoneNumberState: phoneArr,
    cityInput,
  } = userData;
  return (
    <>
      <u>
        <h3>Your Submitted User Information</h3>
      </u>
      <div className="user-info">
        <InfoRow label="Email" value={emailInput} />
        <InfoRow label="First Name" value={capitalize(firstNameInput)} />
        <InfoRow label="Last Name" value={capitalize(lastNameInput)} />
        <InfoRow label="City" value={cityInput} />
        {/* You will need to format the string "nnnnnnn" as "nn-nn-nn-n" */}
        <InfoRow label="Phone" value={formatPhoneNumber(phoneArr)} />
      </div>
    </>
  );
};
