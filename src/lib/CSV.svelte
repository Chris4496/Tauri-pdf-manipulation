<script lang="ts">
  import Footer from "./Footer.svelte";
  import UploadField from "./UploadField.svelte";
  import NameSelection from "./NameSelection.svelte";
  import { selectedCsvFilePath, headerSelection, csvContent } from "../stores";

  let csvFilePath = "";

  selectedCsvFilePath.subscribe((path) => {
    csvFilePath = path;
  });

  function resetStores() {
    selectedCsvFilePath.set("");
    headerSelection.set([]);
    csvContent.set([]);
  }
</script>

<h1 class="font-bold text-2xl text-gray-700">CSV name list</h1>

{#if csvFilePath}
  <div class="basis-1/5">
    <div class="flex py-4 w-fit">
      <span
        class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md"
      >
        Selected CSV
      </span>
      <p
        class="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 flex-1 min-w-0 text-sm border-gray-300 p-2.5 truncate overflow-hidden"
        placeholder="Selected File"
      >
        {csvFilePath}
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
  <div class="basis-4/5">
    <NameSelection />
  </div>
{:else}
  <UploadField text="Select A CSV" selectable="csv" />
{/if}
