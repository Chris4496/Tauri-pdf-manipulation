<script lang="ts">
  export let pages: number[];
  $: [firstPage, secondPage, thirdPage] = pages;
</script>

<div>
  <p class="m-1 text-qxl font-bold tracking-tight text-gray-900">
    All Pages {firstPage}:
  </p>
  <div
    class="block w-[6rem] h-[8.2rem] bg-white rounded-lg border border-gray-200 shadow-md"
  >
    <h5 class="m-1 text-qxl font-bold tracking-tight text-gray-900">
      Page {firstPage}
    </h5>
    <h5 class="m-1 text-qxl font-bold tracking-tight text-gray-900">
      Page {secondPage}
    </h5>
    <h5 class="m-1 text-qxl font-bold tracking-tight text-gray-900">
      Page {thirdPage}
    </h5>
    <h5 class="m-1 text-qxl font-bold tracking-tight text-gray-900">...</h5>
  </div>
</div>
