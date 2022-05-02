<script lang="ts">
  import { headerSelection, csvContent } from "../stores";

  let content: any = [];
  let headerRef = [];

  $: headerRef = $headerSelection.reduce(
    (acc, header) => ({
      ...acc,
      [header.value]: header.selected,
    }),
    {}
  );

  csvContent.subscribe((csv) => {
    content = csv[0];
  });
</script>

<div class="flex flex-col py-10">
  <h1 class="font-bold text-xl text-gray-700">Select headers:</h1>
  {#each $headerSelection as header}
    <label class="inline-flex items-center mt-3">
      <input
        type="checkbox"
        class="form-checkbox h-5 w-5 text-gray-600 rounded-sm"
        bind:checked={header.selected}
      /><span class="ml-2 text-gray-700">{header.value}</span>
    </label>
  {/each}
  <h1 class="font-bold text-xl text-gray-700 my-4">File name preview:</h1>
  <div class="flex">
    {#each Object.entries(content) as [key, value]}
      {#if headerRef[key]}
        <p class="text-gray-700 font-mono mr-2 text-xl">{value}</p>
      {/if}
    {/each}
    {#if Object.values(headerRef).every((value) => !value)}
      <div class="flex flex-col">
        <p class="text-gray-700 font-mono mr-2 text-xl">No headers selected</p>
        <p class="text-gray-700 font-mono mr-2 text-xl">
          Using default name: Student_X
        </p>
      </div>
    {/if}
  </div>
</div>
