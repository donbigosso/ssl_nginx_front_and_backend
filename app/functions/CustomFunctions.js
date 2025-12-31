import { hide, show, showLoggedOnly, hideUnloggedOnly } from "./PageAppearance.js"; 
import { hideModal } from "./PageAppearance.js"; 
import { getSetting, downloadFile } from "./CoreFunctions.js";   


export function handleLogIn(){
    showLoggedOnly();
    hideUnloggedOnly();
    hideModal("my_modal");
}

export async function downloadFileFromAPI(filename){
    const apiAddress = await getSetting("api_address");
    if (!apiAddress) {
        console.error("API address is not defined in settings.");
        return;
    }
    const fileURL = `${apiAddress}?request=download&file=${encodeURIComponent(filename)}`;
    await downloadFile(fileURL, filename);  
}