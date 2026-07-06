
import { onClick } from "./functions/EventFunctions.js";
import { initializeTableSorting,  addFileListToTable, initializeTableButtons  } from "./functions/TableFunctions.js";
import { showLoginModal } from "./functions/NewModalMethods.js";
import { getFileList } from "./functions/RequestFunctions.js";
import { performTests } from "./functions/TestFunctions.js";
import { handleAutoLogin, handleLogout } from "./functions/LoginFunctions.js";
import {uploadFile} from "./functions/UploadFunctions.js";
import {initApiAddressCache} from "./functions/CustomFunctions.js";




document.addEventListener('DOMContentLoaded', () => {   

(async () => {
  addFileListToTable(await getFileList());
  handleAutoLogin();
  initializeTableSorting();
  initializeTableButtons();
  performTests();
  await initApiAddressCache();
})()

const loginButton = document.querySelector("#login-btn");
const logoutButton = document.querySelector("#logout-btn");



onClick(loginButton, () => {
  showLoginModal();
  });

  onClick(logoutButton, async() => {
    handleLogout();

  });









});