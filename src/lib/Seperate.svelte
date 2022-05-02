<script lang="ts">
  import Footer from "./Footer.svelte";
  import UploadField from "./UploadField.svelte";
  import CounterInput from "./CounterInput.svelte";
  import Page from "./Page.svelte";
  import { selectedFilePath, selectedFileLength } from "../stores";
  import { calcFirstThreePages } from "../utils";
  import { readPdfContent, seperateByPages } from "../pdftools";

  let filePath = "";
  let studentCount: number = 5;
  let previewPages: number[][] = [];
  let pdfLength = 0;

  selectedFilePath.subscribe((path) => {
    filePath = path;
  });

  selectedFileLength.subscribe((length) => {
    pdfLength = length;
  });

  $: previewPages = calcFirstThreePages(studentCount, pdfLength);

  function resetStores() {
    selectedFilePath.set("");
    selectedFileLength.set(0);
  }

  async function handleSubmit() {
    const pdfDoc = await readPdfContent(filePath);
    await seperateByPages(pdfDoc, pdfLength / studentCount);
    document.location.hash = "#success";
    resetStores();
  }
</script>

<h1 class="font-bold text-2xl text-gray-700">Seperate</h1>

{#if filePath}
  <div class="basis-1/5">
    <div class="flex py-4 w-fit">
      <span
        class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md"
      >
        Selected File
      </span>
      <p
        class="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 flex-1 min-w-0 text-sm border-gray-300 p-2.5 truncate overflow-hidden"
        placeholder="Selected File"
      >
        {filePath}
      </p>
    </div>
    <!-- Button for reselecting file-->
    <button
      class="w-fit bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
      on:click={resetStores}
    >
      Select a new file
    </button>
  </div>
  <div class="basis-1/2">
    <h1 class="font-bold text-xl text-gray-700">Preview:</h1>
    <div class="flex flex-wrap">
      {#each previewPages as pages}
        <Page {pages} />
      {/each}
    </div>
  </div>
  <div class="basis-1/4 flex flex-col justify-between">
    <CounterInput bind:count={studentCount} />
    <button
      class="bg-green-600 hover:bg-green-700 text-white font-bold h-fit px-4 py-2 rounded-full"
      on:click={handleSubmit}
    >
      Confirm
    </button>
  </div>
{:else}
  <UploadField text="Select A PDF" selectable="file" />
{/if}
