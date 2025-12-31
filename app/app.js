
import { onClick } from "./functions/EventFunctions.js";
import {modalClicks, showLoginModal} from "./functions/ModalFunctions.js";
import { initializeTableSorting,  addFileListToTable, initializeTableButtons  } from "./functions/TableFunctions.js";
import { showUnloggedOnly, hideLoggedOnly } from "./functions/PageAppearance.js";
import { getFileList } from "./functions/RequestFunctions.js";


document.addEventListener('DOMContentLoaded', () => {

(async () => {
  addFileListToTable(await getFileList());
})()

const loginButton = document.querySelector("#login-btn");
const logoutButton = document.querySelector("#logout-btn");


onClick(loginButton, () => {
   showLoginModal();
  });

  onClick(logoutButton, () => {
    showUnloggedOnly();
    hideLoggedOnly();
  });

initializeTableSorting();
initializeTableButtons();






});