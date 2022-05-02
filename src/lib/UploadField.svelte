<script lang="ts">
  import {
    selectPdfFile,
    selectDir,
    selectCsvFile,
    getPdfLength,
    readCsvContent,
    readDirPaths,
    processDirPaths,
    sameLength,
  } from "../pdftools";
  import {
    selectedFilePath,
    selectedFileLength,
    selectedFolderPath,
    selectedCsvFilePath,
    headerSelection,
    csvContent,
    folderError,
  } from "../stores";

  export let selectable: string = "";
  export let text: string = "";

  async function handleFileSelect() {
    const content = await selectPdfFile();
    if (content == null) return;

    const length = await getPdfLength(content);
    selectedFilePath.set(content);
    selectedFileLength.set(length);
  }

  async function handleFolderSelect() {
    folderError.set("");
    const content = await selectDir();
    if (content == null) return;

    selectedFolderPath.set(content);

    const paths = await readDirPaths(content);
    // check if paths is empty
    if (paths.length == 0) {
      folderError.set("No pdf files found in the folder");
      console.log("No pdf files found in the folder");
      return;
    }

    const pdfDocs = await processDirPaths(paths);

    if (!(await sameLength(pdfDocs))) {
      folderError.set("The length of the files in the folder is not the same");
      console.log("The length of the files in the folder is not the same");
      return;
    }
  }

  async function handleCSVSelect() {
    const content = await selectCsvFile();
    if (content == null) return;

    const csv = await readCsvContent(content);

    selectedCsvFilePath.set(content);
    csvContent.set(csv.data);

    const headers = Object.keys(csv.data[0]).map((header) => ({
      value: header,
      selected: true,
    }));

    console.log(headers);
    console.log(csv.data);

    headerSelection.set(headers);
  }
</script>

<div
  class="flex flex-col flex-grow border-4 border-gray-400 border-dashed bg-white rounded mt-4 items-center justify-center"
>
  <label
    class="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue-500 rounded-lg shadow-lg tracking-wide uppercase border border-blue-500 cursor-pointer hover:bg-blue-500 hover:text-white"
  >
    <svg
      class="w-8 h-8"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
    >
      <path
        d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z"
      />
    </svg>
    <span class="mt-2 text-base leading-normal">{text}</span>
    {#if selectable === "file"}
      <button class="hidden" on:click={handleFileSelect} />
    {:else if selectable === "folder"}
      <button class="hidden" on:click={handleFolderSelect} />
    {:else if selectable === "csv"}
      <button class="hidden" on:click={handleCSVSelect} />
    {/if}
    <button />
  </label>
</div>
