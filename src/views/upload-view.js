export const generateUploadForm = async () => {
  return `<div id="spinner" class="spinner hidden"></div>
            <div id="uploadForm">
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
        
        document.querySelector("div#container").innerHTML = 
        `<div id="complete">
            <h3>Upload completed!</h3>
            <button id="confirm">OK</button>
         </div>
        `;
    } else {
        document.querySelector("div#container").innerHTML = 
        `<div id="complete">
            <h3>Upload failed!</h3>
            <button id="confirm">OK</button>
        </div>
        `;
    }
};