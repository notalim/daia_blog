#!/bin/bash

# a medium build script to install all dependencies and start the server and client

get_usage() {
    cat << EOF
    Usage: $(basename $0) [-hkb]
    -h: Display help
    -k: Kill all Daia background processes
    -b: Run Daia server in background
    -i: Install all dependencies
EOF
}

server_prolouge() {
    cd client
    npm install

    cp ../server/services/validation.js ../client/src/services/
    cp ../server/services/errorTypes.js ../client/src/services/
}

run_install() {
    server_prolouge
    npm install
    npm install @mui/material @mui/styled-engine-sc styled-components
    npm install @mui/icons-material
    npm install @emailjs/browser
}

if [ $# -eq 0 ]; then
    server_prolouge
    npm run dev
fi
while getopts ":hkbi" option; do
    case ${option} in
    h) get_usage;;
    k) kill $(ps aux | grep 'daia' | grep -v 'grep' | awk '{print $2}');;
    b) server_prolouge
        npm run dev &;;
    i) run_install
        npm run dev;;
    *) get_usage;;
    esac
done

exit


# cd ../server
# npm install

# npm start