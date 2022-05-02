<script lang="ts">
  import Footer from "./Footer.svelte";
  import UploadField from "./UploadField.svelte";
  import { selectedFolderPath, folderError } from "../stores";
</script>

<h1 class="font-bold text-2xl text-gray-700">Merge</h1>

{#if $selectedFolderPath}
  <div class="basis-1/5">
    <!-- <p class="text-gray-700">
      Selected File: {filePath}
    </p> -->
    <div class="flex py-4 w-fit">
      <span
        class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md"
      >
        Selected Folder
      </span>
      <p
        class="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 flex-1 min-w-0 text-sm border-gray-300 p-2.5 truncate overflow-hidden"
        placeholder="Selected File"
      >
        {$selectedFolderPath}
      </p>
    </div>
    <!-- folder error warning-->
    {#if $folderError}
      <p class="text-red-500 text-sm">
        {$folderError}
      </p>
    {/if}
    <!-- Button for reselecting file-->
    <button
      class="w-fit bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
      on:click={() => {
        selectedFolderPath.set("");
      }}
    >
      Select a new folder
    </button>
  </div>
  <div class="basis-1/2">Middle Show</div>
  <div class="basis-1/4">Last row</div>
{:else}
  <UploadField text="Select A Folder" selectable="folder" />
{/if}
