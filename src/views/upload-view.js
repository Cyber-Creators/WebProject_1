export const generateUploadForm = async () => {
  return `<div id="uploadForm">
            <div id="spinner" class="spinner hidden"></div>
                <form id="myUploadForm">
                <label for="arquivo">Choose a file:</label>
                    <input type="file" id="file" name="file">
                    <button class="btn2" type="submit">
                    <strong>SEND</strong>
                        <div id="container-stars">
                            <div id="stars"></div>
                                </div>
                                    <div id="glow">
                                    <div class="circle"></div>
                                        <div class="circle"></div>
                                    </div>
                    </button>
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