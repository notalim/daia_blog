#!/bin/bash

# a short build script to install all dependencies and start the server and client

cd client
npm install

cp ../server/services/validation.js ../client/src/services/
cp ../server/services/errorTypes.js ../client/src/services/

npm run dev &

cd ../server
npm install

npm start