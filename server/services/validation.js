// ! Make sure to add it both to the server and client validation.js files and update it.

const passwordValidation = (password) => {
    // 8 symbols, at least one number, letter, one special character and one caps letter

    const passwordRegex =
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    // console.log("password:" + password, passwordRegex.test(password));
    return passwordRegex.test(password);
};

const nameValidation = (name) => {
    const nameRegex = /^([a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*){1,50}$/;
    return nameRegex.test(name);
};

const glucagonLocationValidation = (location) => {
  if (location === undefined) return true;
  return location.length <= 25;
};

const glucagonTypeValidation = (type) => {
  if (type === undefined) return true;
  return type.length <= 30;
};

const allergiesValidation = (allergies) => {
  if (allergies === undefined) return true;
  return allergies.length <= 50;
}

const medicationsValidation = (medications) => {
  if (medications === undefined) return true;
  return medications.length <= 50;
};

const diagnosesValidation = (diagnoses) => {
  if (diagnoses === undefined) return true;
  return diagnoses.length <= 50;
};

const crisisTextValidation = (text) => {
  return text.length <= 100;
};

const phoneValidation = (phoneNumber) => {
    const phoneRegex = /^\+1\d{10}$/;
    return phoneRegex.test(phoneNumber);
};

// const usernameValidation = (username) => {
//     // should be 6 symbols long or more, only letters and numbers and _
//     const usernameRegex = /^[a-zA-Z0-9_]{6,}$/;
//     return usernameRegex.test(username);
// };

const stringValidation = (string) => {
    const stringRegex = /^[a-zA-Z0-9]+(([',. -][a-zA-Z ])?[a-zA-Z0-9]*)*$/;
    return stringRegex.test(string);
};

const codeValidation = (code) => {
    const codeRegex = /^\d{6}$/;
    return codeRegex.test(code);
};

const confirmPasswordValidation = (password, confirmPassword) => {
    return password === confirmPassword;
};

export default {
    passwordValidation,
    nameValidation,
    // usernameValidation,
    phoneValidation,
    stringValidation,
    codeValidation,
    confirmPasswordValidation,
    glucagonLocationValidation,
    glucagonTypeValidation,
    crisisTextValidation,
    allergiesValidation,
    medicationsValidation,
    diagnosesValidation,
};
