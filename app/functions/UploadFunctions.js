import { show, hide, changeInnerTextContent, changeInnerHTML, showLoggedOnly } from "./PageAppearance.js";
import { getSetting } from "./CoreFunctions.js";
import { getSessionToken, showFeedback } from "./CustomFunctions.js"; 
import { addRowToTable } from "./TableFunctions.js";
const uploadAlertField = document.getElementById('upload-alert-field');
const uploadSuccessLine = document.getElementById('upload-success-line');
const fileInput = document.getElementById("file-upload");
const uploadForm = document.getElementById("upload-form");
   
    if (uploadForm) {
        uploadForm.addEventListener("submit", uploadFile);
        fileInput.addEventListener("change",showFileList);

    }



export async function uploadFile(e) {
    e.preventDefault();
   const amountVerif = verifyFileAmount();
   if(amountVerif){
    const fileList = returnFileList();
    
     const formData = new FormData();
       formData.append("request","upload_files");
        formData.append("token",getSessionToken());
     for (let file of fileList) {
        
        formData.append("files[]", file);
       
      
     }
     showLoadingSpinner(); 
     try {
        
        const uploadAddress =await getSetting("api_address");
        const response = await fetch(uploadAddress, {
            method: "POST",
            body: formData
            // DO NOT set Content-Type — browser sets it with boundary automatically
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }

        const result = await response.json();
        

 
       showUploadSuccess(result.message || "");
       if(result.error){
            showUploadAlert(result.error);
       }
       if(result.message != ""){
           console.log("DEB5555 Upload result:", result.data.uploaded_files);
           const uplodedFileArray = result.data.uploaded_files;
           if (uplodedFileArray && uplodedFileArray.length > 0) {
               uplodedFileArray.forEach(file => {
                    const fileSizeKB = file[1] + " KB";
                   addRowToTable(file[0], fileSizeKB, file[2]);
               });
           }
           showLoggedOnly();
       }
       

    } catch (err) {
        console.error(err);
        show(uploadAlertField, 'block');
        changeInnerTextContent(uploadAlertField, "Upload failed: " + err.message);
    }
   }
    
}

function returnFileList(){
    
    const fileList = fileInput.files;
    return fileList;
}
function hideAlertsAndList(){
    hide(uploadAlertField);
    hide(uploadSuccessLine);
    
}

function showFileList(){
    hideAlertsAndList();
    if(verifyFileAmount()){
        const fileList = returnFileList();
        const listLength = fileList.length;
      
        
        const listText ='';
        const nameArray = [];
         for(let i = 0; i < listLength; i++){
            nameArray.push(fileList[i].name);
        }
        const stringList = nameArray.join(', ');
        showUploadSuccess("Following files were selected: " + stringList+".");   
        
        //"Following files were selected: " + stringList+"."

    }
    console.log("DEB543 show file list");

}

function verifyFileAmount(){
    const fileList = returnFileList();
    const listLength = fileList.length;
    if(listLength === 0){
        console.warn("WRN231 No files were selected.");
        showUploadAlert("No files selected. Please select at least one file");
        return false;
    }
    if(listLength > 5){
        console.warn("WRN232 Too many files were selected.");
        show(uploadAlertField, 'block');
        changeInnerTextContent(uploadAlertField,"Too many files selected. Please select up to 5 files.");
        return false;
    
    }
    console.log("DEB5623 Correct amount selected");
    hideAlertsAndList();
    return true;

}

function showLoadingSpinner(){
    show(uploadSuccessLine,'block');
    changeInnerHTML(uploadSuccessLine, '<div class="d-flex align-items-center gap-2">'+
        '<div class="spinner-border spinner-border-sm" role="status"></div>'+
        '<span>Uploading...</span>'+
      '</div>    ');
}

function showUploadAlert(message){
    show(uploadAlertField, 'block');
    changeInnerTextContent(uploadAlertField, message);
}

function showUploadSuccess(message){
    show(uploadSuccessLine, 'block');
    changeInnerTextContent(uploadSuccessLine, message);
}