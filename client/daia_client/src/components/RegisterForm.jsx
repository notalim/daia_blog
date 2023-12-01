import React, { useState } from 'react';

const RegisterForm = () => {
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [dexcomUsername, setDexcomUsername] = useState('');
  const [dexcomPassword, setDexcomPassword] = useState('');
  const [name, setName] = useState('');

  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    // Add logic to send verification code to the phone number
    // For example: You can make an API request to send the verification code
    // Once sent, move to the next step
    setStep(2);
  };

  const handleVerificationSubmit = (e) => {
    e.preventDefault();
    // Add logic to verify the entered verification code
    // For example: You can make an API request to verify the code
    // If the code is verified, you can proceed with the registration
    console.log('Phone Number:', phoneNumber);
    console.log('Verification Code:', verificationCode);
    console.log('Dexcom Username:', dexcomUsername);
    console.log('Dexcom Password:', dexcomPassword);
    console.log('Name:', name);
    // Further registration logic can go here
  };

  const handleGoBack = () => {
    setStep(1);
    // You can reset the form fields here if needed
    setVerificationCode('');
    setDexcomUsername('');
    setDexcomPassword('');
    setName('');
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <form onSubmit={handlePhoneSubmit}>
            <div>
              <label htmlFor="phoneNumber">Phone Number:</label>
              <input
                type="tel"
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter your phone number"
              />
            </div>
            <button type="submit">Send Verification Code</button>
          </form>
        );
      case 2:
        return (
          <div>
            <form onSubmit={handleVerificationSubmit}>
              <div>
                <label htmlFor="verificationCode">Verification Code:</label>
                <input
                  type="text"
                  id="verificationCode"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  placeholder="Enter verification code"
                />
              </div>
              <div>
                <label htmlFor="dexcomUsername">Dexcom Username:</label>
                <input
                  type="text"
                  id="dexcomUsername"
                  value={dexcomUsername}
                  onChange={(e) => setDexcomUsername(e.target.value)}
                  placeholder="Enter Dexcom username"
                />
              </div>
              <div>
                <label htmlFor="dexcomPassword">Dexcom Password:</label>
                <input
                  type="password"
                  id="dexcomPassword"
                  value={dexcomPassword}
                  onChange={(e) => setDexcomPassword(e.target.value)}
                  placeholder="Enter Dexcom password"
                />
              </div>
              <div>
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                />
              </div>
              <button type="submit">Register</button>
            </form>
            <button onClick={handleGoBack}>Change Phone Number</button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {renderStep()}
    </div>
  );
};

export default RegisterForm;
