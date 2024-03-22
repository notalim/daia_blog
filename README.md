# <img src="./client/src/assets/images/daia_dark_purple_logo.png" alt="Daia Logo" width="25"/> DAIA: Smarter Sugar Sharing 

Daia is a mobile application that allows for short-term sharing of blood sugar levels, with a focus on ease of use, customizability, and universality. The app, intended for those with diabetes (Type I and II), allows individuals to easily share their glucose levels with others through sessions, which is important to ensure that emergency medication can be administered if a serious blood sugar dip were to occur.

## Description

This project extends the capabilities of the Daia mobile application onto the web, providing a user-friendly platform for short-term sharing of blood sugar levels. It ensures that critical blood sugar information is accessible to caregivers, healthcare professionals, and emergency responders through any web browser.

## Getting Started

* Make sure to create a `.env` file in the `server` folder with the following fields, and populate them with your own services:
  * TWILIO_ACCOUNT_SID
  * TWILIO_AUTH_TOKEN
  * TWILIO_VERIFY_SERVICE_SID
  * ENCRYPTION_SECRET_KEY
  * MONGO_URL

* Then, create another `.env` file to be populated in the `client` folder with the following fields:
  * VITE_EMAIL_SERVICE_ID
  * VITE_EMAIL_TEMPLATE_ID
  * VITE_EMAIL_USER_ID

### Installing

* Clone the repo
```
gh repo clone notalim/daia_blog
```

### Executing program

* Run the build script for the client
```
./build.sh
```
* Start the server (in a separate terminal)
```
cd server
npm i
npm start
```

## Authors

Contributors' names and emails

[Alim Kassymo](mailto:akassymo@stevens.edu)

[Aidan Giordano](mailto:agiordan@stevens.edu)

[Dev Patel](mailto:dpatel7@stevens.edu)

[Federico Yacoubian](mailto:fyacoubi@stevens.edu)

[Jesal Gandhi](mailto:jesalgandhi9988@gmail.com)

[Sarang Hadagali](mailto:shadagal@stevens.edu)
