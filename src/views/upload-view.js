export const generateUploadForm = async () => {
  return `<div id="uploadForm">
            <div id="spinner" class="spinner hidden"></div>
                <form id="myUploadForm">
                <label for="arquivo">Choose a file:</label>
                    <input type="file" id="file" name="file">
                    <button type="submit">Upload</button>
                </form>
            </div>`;
};

export const displayConfirmation = async (arg) => {
    if (arg === "success") {
        document.querySelector("form#myUploadForm").innerHTML = 
        `<h3>Upload completed!</h3>
          <button id="confirm">OK</button>
        `;
    } else {
        document.querySelector("form#myUploadForm").innerHTML = 
        `<h3>Upload failed!</h3>
          <button id="confirm">OK</button>
        `;
    }
};