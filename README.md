# Verdant Sync

This is a simple React Native app demonstrating how to monitor and irrigate plants with IoT.

## Features

- Sign up / sign in with email and password

## Getting Started

1. Clone this repository to your local machine.
2. Install the required dependencies using `npm install` or `yarn install`.
3. Set up your Firebase project and obtain your configuration details.
4. Copy the `.env.example` as `.env.development`
5. Update the `.env.development` file with your Firebase configuration.
6. Run the app using `npm start` or `yarn start`.

## Dependencies

- React Native
- Firebase
- React Navigation
- React Native Paper

## Build

Build is made with Expo Application Services (EAS)

Login to your expo account with following command `eas login`

### Environment variables
Environment variables are stored to Expo Application Services (EAS) as secrets for builds.

1. Import secrets from .env.development
`eas secret:push --scope project --env-file .env.development`

2. You can check secrets with
`eas secret:list`

### Android build

Start build with `eas build --platform android --profile production`

## License

This project is open-source and licensed under the [MIT License](LICENSE).
