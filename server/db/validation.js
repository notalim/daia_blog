// server/db/validation.js

const usernameValidation = (username) => {
    const usernameRegex = /^[a-zA-Z0-9_]{4,30}$/;
    return usernameRegex.test(username);
};

const passwordValidation = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
};

const avatarUrlValidation = (url) => {
    const urlRegex =
        /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    return urlRegex.test(url);
};

export default { usernameValidation, passwordValidation, avatarUrlValidation };
