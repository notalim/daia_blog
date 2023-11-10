// server/db/validation.js

const passwordValidation = (password) => {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return passwordRegex.test(password);
};

const nameValidation = (name) => {
  const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
  return nameRegex.test(name);
};

const phoneValidation = (phoneNumber) => {
  const phoneRegex = /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
  return phoneRegex.test(phoneNumber);
};

const stringValidation = (string) => {
  const stringRegex = /^[a-zA-Z0-9]+(([',. -][a-zA-Z ])?[a-zA-Z0-9]*)*$/;
  return stringRegex.test(string);
}

const validatePhoneAndPassword = (phoneNumber, password) => {
    return passwordValidation(password) && phoneValidation(phoneNumber);
}

const validatePhoneAndPasswordAndName = (phoneNumber, password, name) => {
    return passwordValidation(password) && nameValidation(name) && phoneValidation(phoneNumber);
};

export default {validatePhoneAndPassword, validatePhoneAndPasswordAndName, passwordValidation };
