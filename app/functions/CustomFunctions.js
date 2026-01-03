import { hide, show, showLoggedOnly, hideUnloggedOnly } from "./PageAppearance.js"; 
import { hideModal } from "./PageAppearance.js"; 
import { getSetting, downloadFile } from "./CoreFunctions.js";   


export function handleLogIn(){
    showLoggedOnly();
    hideUnloggedOnly();
    hideModal("my_modal");
}

export async function generateDownloadLink(filename){
    const apiAddress = await getSetting("api_address");
    if (!apiAddress) {
        console.error("API address is not defined in settings.");
        return null;
    }
    const fileURL = `${apiAddress}?request=download&file=${encodeURIComponent(filename)}`;
    console.log("Generated download link (DEB765): ", fileURL);
    return fileURL;  
}

export async function downloadFileFromAPI(filename){
    
    const apiAddress = await getSetting("api_address");
    const fileLink = await generateDownloadLink(filename);
    if (!fileLink) {
        return;
    }
    await downloadFile(fileLink, filename);  
}

export async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        console.log('DEB653 Copied successfully!');
        // Optional: Show user feedback, e.g., alert('Copied!');
    } catch (err) {
        console.error('Failed to copy: ', err);
    }
}

export async function generateAndCopyDownloadLink(filename){
    const link = await generateDownloadLink(filename);
    if (link) {
        await copyToClipboard(link);
        
    }
}
