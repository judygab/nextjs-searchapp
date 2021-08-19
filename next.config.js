// require('dotenv').config()

module.exports = {
  env: {
    apiKey: process.env.API_KEY,
  },
  serverRuntimeConfig: {
    // Will only be available on the server side
    apiKey: process.env.API_KEY, // Pass through env variables
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    apiKey: process.env.API_KEY,
  },
}
