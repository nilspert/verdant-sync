# VerdantSync

**VerdantSync** is a React Native application designed for managing and monitoring IoT (Internet of Things) devices that are using [VerdantSync IoT](https://github.com/nilspert/verdant-sync-iot) plant irrigation and monitoring project.

## Key Features

- **User Authentication**: Easily create accounts and sign in securely using Google Firebase.
- **Devices Dashboard**: View and manage devices registered to Google Firebase.
- **Device Information**: Displays detailed device info, including sensor readings like air temperature, humidity, soil moisture, water tank level, and more.
- **Event Logs**: Check events generated by device, categorized as INFO, WARNING, or ERROR.
- **Settings**: Access app settings.
- **User-Specific WiFi Configuration**: Set WiFi SSID for devices you own.
- **Device Authorization**: Authorize or deauthorize devices; only authorized devices can send sensor data to Google Firebase.
- **Encrypted Data**: All data is stored as Hexadecimal String using AES encryption. Fetched data is decrypted in application side.

## Getting Started

1. Clone this repository to your local machine.
2. Install dependencies using `npm install` or `yarn install`.
3. Configure your Firebase project and obtain the necessary details.
4. Copy `.env.example` as `.env.development` and fill in the Firebase configuration details
5. Update `.env.development` with your Firebase configuration.
6. Start the app with `npm start` or `yarn start`.

## Dependencies

- [React Native](https://reactnative.dev/)
- [Firebase](https://firebase.google.com/)
- [React Navigation](https://reactnavigation.org/)
- [React Native Paper](https://callstack.github.io/react-native-paper/)
- [React Native AES Crypto](https://www.npmjs.com/package/react-native-aes-crypto)
- [React Hook Form](https://react-hook-form.com/)

## Building the App

The build process is streamlined with Expo Application Services (EAS) and eas-cli.

- Log in to your Expo account with `eas login`.
- Finish the local setup and start build with command `yarn build`
- Finished build apk can be downloaded from eas website using the link provided in
eas-cli or by signing in to website separately.

### Environment Variables

Store environment variables as secrets in Expo Application Services (EAS) for builds.

1. Import secrets from `.env.development`:

```
   eas secret:push --scope project --env-file .env.development
```

2. Verify secrets:

```
   eas secret:list
```

### Android Build

Initiate the build using `yarn build`. This generates an APK available in the Expo Application Services 'Builds' section.

## License

This project is open-source and is licensed under the [MIT License](LICENSE).
