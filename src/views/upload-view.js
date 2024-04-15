export const generateUploadForm = async () => {
  return `<div id="uploadForm">
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
