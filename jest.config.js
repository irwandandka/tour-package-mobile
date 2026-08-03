module.exports = {
  preset: "jest-expo",
  moduleNameMapper: {
    "^@app/(.*)$": "<rootDir>/src/app/$1",
    "^@features/(.*)$": "<rootDir>/src/features/$1",
    "^@navigation/(.*)$": "<rootDir>/src/navigation/$1",
    "^@shared/(.*)$": "<rootDir>/src/shared/$1",
    "^@i18n/(.*)$": "<rootDir>/src/i18n/$1",
    "^@store/(.*)$": "<rootDir>/src/store/$1",
  },
  transformIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)",
  ],
};
