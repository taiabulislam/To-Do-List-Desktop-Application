
const { contextBridge } = require("electron");

contextBridge.exposeInMainWorld("myApp", {
  platform: process.platform
});
