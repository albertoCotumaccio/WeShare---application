## NFC application with React Native

Mobile application based on NFC technology, exchanging your own contact with other users. This project was carried out for the Human Computer Interaction exam. Master degree in Computer Science at Sapienza - June 2022

<img src="App/assets/images/logo.png" align="left" width="192px" height="192px"/>
<img align="left" width="0" height="192px" hspace="10"/>

Share quickly your contact with other people by simply clicking a button and placing phones nearby. Ability to customize your profile, creating more than one, always ready when needed. Keep track of all the people you met. 📱
The implementation of the project was not completed due to time issues. A possible presecution of it is not excluded.

<br>
<p align="center">
<strong>This project includes:</strong>
<a href="https://github.com/albertoCotumaccio/WeShare---application/tree/main/App">APPLICATION CODE</a> • <a href="https://github.com/albertoCotumaccio/WeShare---application/tree/main/Documents">DOCUMENTATION</a> • <a href="https://github.com/albertoCotumaccio/WeShare---application/blob/main/LICENSE.md">LICENSE</a>
</p>
<br>


## Getting Started

### Introduction

* We used expo framework to work on the code, currently the sdk is at version 45, to update it use the command ```expo update``` or ```expo update sdk```.
* We strongly suggest using Visual Studio Code as your IDE and the Git Lens plugin for Visual Studio, we have been very comfortable with this setup.

### Installing

* To run our project, navigate to the directory and you can use both ```yarn``` and ```npm``` (we suggest yarn to fix all possible incompatibilities between the various installed libs ).
* Immediately after cloning the repo you need to run one of the following commands (depending on the handler used) to align the libraries: ```yarn or npm install```
* Then run ```expo start``` to start the expo server and run the app on a device.

### Build APK

* currently to build the app there are two tools, the native expo and the new EAS tool. We strongly suggest you use the latter since expo build will be discontinued on January 4, 2023. If you would still like to try both tools, just run ```expo build:android``` or use the following instructions:

```
- from terminal run npm install -g eas-cli
- create a profile with your personal settings for the apk
- create an account on expo (https://expo.dev/signup)
- from terminal type eas build -p android --profile [NAMEPROFILE]
```

## Help

Feel free to contact me with any questions


## Authors :thumbsup:

> Those who participated in the creation of the project are listed here

* [Alberto Cotumaccio](https://it.linkedin.com/in/alberto-cotumaccio-8b8443229?trk=people-guest_people_search-card)
* Giovanni Montobbio
* Matteo Basile
* Alessandro Di Patria
* Daniele Ciammaroni


## License

This project is licensed under the MIT License - see the LICENSE.md file for details
