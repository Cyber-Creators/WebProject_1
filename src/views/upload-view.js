export const generateUploadForm = async () => {

    return `<div id="uploadForm">
                <form id="myUploadForm">
                    <input type="file" id="file" name="file">
                    <button type="submit">Upload</button>
                </form>
            </div>`;

};