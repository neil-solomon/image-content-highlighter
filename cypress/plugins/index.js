/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */

module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  /* This command is copied from a tutorial and worked in downloading things to the excelDownloads folder.
    But now whenever this is uncommented cypress breaks and can't launch chrome.
  */
  // on("before:browser:launch", (browser = {}, launchOptions) => {
  //   const downloadDirectory = path.join(__dirname, "..", "excelDownloads");
  //   if (browser.family === "chromium") {
  //     launchOptions.preferences.default["download"] = {
  //       default_directory: downloadDirectory,
  //     };
  //   }
  //   return launchOptions;
  // });
};
