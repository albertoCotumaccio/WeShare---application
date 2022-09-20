# Coding part

## useful commands

We used expo to work on the code, currently the sdk is at version 45, should it update use the command ``` expo update``` or ``` expo update sdk```

We strongly suggest using Visual Studio Code as your IDE and the Git Lens plugin for Visual Studio, we have been very comfortable with this setup

## Run app
To run our project, navigate to the directory and you can use both yarn and npm (we suggest yarn to fix all possible incompatibilities between the various installed libs )

Immediately after cloning the repo you need to run one of the following commands (depending on the handler used) to align the libraries: ```yarn``` or ```npm install```

Then run ```expo start``` to start the expo server and run the app on a device.
 

## Build apk
currently to build the app there are two tools, the native expo and the new EAS tool. We strongly suggest you use the latter since expo build will be discontinued on January 4, 2023 (184 days away). If you would still like to try both tools, just run ```expo build:android``` or use the following instructions: 

    - from terminal run ```npm install -g eas-cli```
    - create a profile with your personal settings for the apk
    - create an account on expo (https://expo.dev/signup)
    - from terminal type ```eas build -p android --profile [NAMEPROFILE]```
