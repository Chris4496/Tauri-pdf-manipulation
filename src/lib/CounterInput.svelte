<script lang="ts">
  export let count: number;

  function increment() {
    count++;
  }

  function decrement() {
    if (count <= 1) return;
    count--;
  }
</script>

<div class="custom-number-input h-10 w-32">
  <label
    for="custom-input-number"
    class="w-full text-gray-700 text-sm font-semibold"
    >Num Of Students
  </label>
  <div
    class="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1"
  >
    <button
      class=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
      on:click={decrement}
    >
      <span class="m-auto text-2xl font-thin">-</span>
    </button>
    <input
      type="number"
      class="outline-none focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700"
      bind:value={count}
    />
    <button
      class="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
      on:click={increment}
    >
      <span class="m-auto text-2xl font-thin">+</span>
    </button>
  </div>
</div>

<style>
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .custom-number-input input:focus {
    outline: none !important;
  }

  .custom-number-input button:focus {
    outline: none !important;
  }
</style>
