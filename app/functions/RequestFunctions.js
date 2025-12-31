import { fetchAPIdataWGetParams } from "./CoreFunctions.js ";
export async function getFileList() {
    const apiResponse = await fetchAPIdataWGetParams({ request: 'list_files' });
    const success = apiResponse.success;
    if (success) {
        const fileList = apiResponse.data.files;
        if(fileList.length === 0){
            console.warn("No files available from the API.");
        }
        else {
        // console.log("File List:", fileList);
        return fileList;}
        
        
    } else {
        console.error(apiResponse.error);
        return [];
    }

}