// Add to this file if you need to add more error types. This is for matching the error message to the error type in the front end.
// For example, if the error type is "INVALID_PHONE_NUMBER", the front end will display "Invalid phone number" to the user.

// ! Make sure to add it both to the server and client errorTypes.js files.

export const errorTypes = {
    INVALID_PHONE_NUMBER:
        "Invalid phone number format, must be of the form +1XXXXXXXXXX",
    PHONE_NUMBER_REQUIRED: "Phone number is missing",
    USER_NOT_FOUND: "User not found. You should register first",
    CODE_NOT_APPROVED: "Code wasn't approved",
    USER_ALREADY_EXISTS: "User already exists.",
    SERVER_ERROR: "Unknown server error",
    INVALID_DEXCOM_CREDENTIALS: "Invalid Dexcom credentials",
    INVALID_CONTACT_NUMBER: "Invalid emergency contact phone number",
    INVALID_CONTACT_NAME: "Invalid emergency contact name",
    VERIFICATION_FAILED: "Verification failed",
    INVALID_PASSWORD:
        "Password must be at least 8 characters and include a number",
    PASSWORDS_DO_NOT_MATCH: "The passwords entered do not match",
    INVALID_VERIFICATION_CODE:
        "Invalid verification code, it should be 6 digits long",
    INVALID_CODE:
        "Invalid verification code. Try reloading the page and resending it again",
    INVALID_CONTACT_ID: "Invalid contact ID",
    INVALID_CONTACT_RELATIONSHIP: "Invalid contact relationship",
    CONTACT_NOT_ADDED: "Could not add emergency contact",
    CONTACT_NOT_UPDATED:
        "Could not update emergency contact, need to update at least 1 field",
    CONTACT_STATUS_NOT_UPDATED: "Could not update contact status",
    CONTACT_NOT_REMOVED: "Could not remove emergency contact",
    GETTING_USER_CONTACTS_FAILED: "Could not get user contacts",
    CONTACT_ALREADY_EXISTS: "Contact already exists",
    CONTACT_NOT_FOUND: "Contact not found",
    CONTACTS_NOT_FOUND: "Contacts not found",
    INVALID_NAME: "Invalid name format",
    INVALID_STRING: "Invalid characters used",
    AUTHENTICATION_FAILED: "Authentication failed",
    DEXCOM_SESSION_PROBLEM: "Problem with Dexcom session",
    ACCESS_DENIED: "Access denied",
    SESSION_EXPIRED: "Session has expired",
    ACCOUNT_LOCKED: "Account is locked due to too many failed attempts",
    ACCOUNT_DISABLED: "Account is disabled",
    TOO_MANY_REQUESTS: "Too many requests, please try again later",
    NOT_VERIFIED: "Account not verified",
    INVALID_REQUEST: "Invalid request parameters",
    INVALID_EDIT_PARAMS:
        "Invalid request parameters, need to update at least 1 field",
    RESOURCE_NOT_FOUND: "Requested resource not found",
    OPERATION_NOT_PERMITTED: "Operation not permitted",
    DATABASE_ERROR: "Database error occurred",
    INVALID_FORMAT: "Invalid data format",
    NETWORK_ERROR: "Network error, please check your connection",
    INTERNAL_ERROR: "Internal server error",
    SERVICE_UNAVAILABLE: "Service temporarily unavailable",
    REQUEST_TIMEOUT: "Request timed out",
    INVALID_GLUCAGON_LOCATION: "Invalid glucagon location",
    INVALID_GLUCAGON_TYPE: "Invalid glucagon type",
    INVALID_ALLERGIES: "Invalid allergies",
    INVALID_MEDICATIONS: "Invalid medications",
    INVALID_DIAGNOSES: "Invalid diagnoses",
    INVALID_CRISIS_TEXT: "Invalid crisis text",
    UPDATE_FAILED: "User update failed",
    INVALID_LOW_ALARM: "Invalid low alarm value",
    NO_FIELDS_UPDATED: "No fields have been updated",
};
