// server/db/validation.js

const passwordValidation = (password) => {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return passwordRegex.test(password);
};

const nameValidation = (name) => {
  const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
  return nameRegex.test(name);
};

const phoneValidation = (phone) => {
  const phoneRegex = /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
  return phoneRegex.test(phone);
};

const allValidation = (phone, password, name) => {
  return passwordValidation(password) && nameValidation(name) && phoneValidation(phone);
};

export default { allValidation };
