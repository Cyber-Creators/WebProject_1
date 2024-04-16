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
