const passwordValidation = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
};

const nameValidation = (name) => {
    const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
    return nameRegex.test(name);
};

const usernameValidation = (username) => {
    // should be 6 symbols long or more, only letters and numbers and _
    const usernameRegex = /^[a-zA-Z0-9_]{6,}$/;
    return usernameRegex.test(username);
};


const phoneValidation = (phoneNumber) => {
    const phoneRegex = /^\+1\d{10}$/;
    return phoneRegex.test(phoneNumber);
};

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
    usernameValidation,
    phoneValidation,
    stringValidation,
    codeValidation,
    confirmPasswordValidation,
};
