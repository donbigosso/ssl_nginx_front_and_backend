import { hideModal, showModal, scrollToDown, changeButtonText } from "./PageAppearance.js";
import { addFileListToTable, addRowToTable, deleteRow } from "./TableFunctions.js";
import { onClick } from "./EventFunctions.js";
import { downloadFile } from "./CoreFunctions.js";
import {downloadFileFromAPI} from "./CustomFunctions.js";

import  {getFileList} from "./RequestFunctions.js";



export function changeTestResultText(text){
    const testField = document.querySelector('.test-results');
    testField.textContent = text;
}

export async function getMockFileList(){
  try {
    const mockFiles = await fetch('../junk/mock_file_data.json');
    if (!mockFiles.ok) {
      throw new Error(`HTTP error! status: ${mockFiles.status}`);
    }
    const fileList = await mockFiles.json();
    return fileList;
  }
  catch (error) {
    console.error("Error fetching mock file list:", error.message);
    return [];
  }
}


export function performTests(){
  
    const testButton = document.querySelector("#testBtn");
    const testButton2 = document.querySelector("#testBtn2");
    changeButtonText(testButton, "Delete row 5");
    changeButtonText(testButton2, "Download a file");
    const fileToDownloadPath="http://192.168.0.122:8082/api_engine.php?request=download&file=YouTube Music.html";
    const downloadedFileName = "donbigosso_download.txt";

    onClick(testButton, () => {
      deleteRow(5);
       
    });
      onClick(testButton2, async () => {
       downloadFileFromAPI("file11.txt");
    }); 
    
}