const { defineConfig } = require('cypress')
require('dotenv').config()

module.exports = defineConfig({
  video: false,
  screenshotOnRunFailure: false,
  e2e: {
    setupNodeEvents (on, config) {
      on('task', {
        log (message) {
          console.log(message)
          return null
        }
      })
      require('@cypress/code-coverage/task')(on, config)
      return config
    },
    env: {
      codeCoverage: {
        exclude: ['cypress/**/*.*'],
      }
    },
    defaultCommandTimeout: 4000,
    includeShadowDom: true,
    viewportHeight: 1160,
    viewportWidth: 1500
  }
})
