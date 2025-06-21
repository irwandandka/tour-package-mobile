import 'dotenv/config';

export default {
  expo: {
    name: process.env.APP_NAME,
    slug: process.env.APP_SLUG,
    scheme: process.env.APP_SCHEME,
    extra: {
      API_KEY: process.env.API_KEY,
      API_URL: process.env.API_BASE_URL,
    },
    ios: {
      bundleIdentifier: process.env.IOS_BUNDLE_ID, // samain dengan yang kamu isi di GCP
    },
  },
};