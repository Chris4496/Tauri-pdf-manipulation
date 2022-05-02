<script lang="ts">
  import Seperate from "./lib/Seperate.svelte";
  import Merge from "./lib/Merge.svelte";
  import CSV from "./lib/CSV.svelte";
  import Footer from "./lib/Footer.svelte";
  import Success from "./lib/Success.svelte";

  let page: string = document.location.hash;
  window.onpopstate = function (event) {
    page = document.location.hash;
  };
</script>

<div
  class="flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in"
>
  <div class="flex flex-col flex-grow p-4">
    {#if page === "#seperate"}
      <Seperate />
    {:else if page === "#merge"}
      <Merge />
    {:else if page === "#csv"}
      <CSV />
    {:else if page === "#success"}
      <Success />
    {:else}
      404: Page not Found
    {/if}
  </div>
  <Footer />
</div>
