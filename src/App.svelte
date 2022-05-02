<script lang="ts">
  import "./app.css";

  import {
    selectPdfFile,
    readPdfContent,
    seperateByStudents,
    seperateByPages,
    selectDir,
    readDirPaths,
    processDirPaths,
    combineByPages,
    selectCsvFile,
    readCsvContent,
  } from "./pdftools";

  import Navbar from "./lib/Navbar.svelte";
  import Footer from "./lib/Footer.svelte";
  import Seperate from "./lib/Seperate.svelte";
  import MainFrame from "./MainFrame.svelte";

  let docUrl = "";

  async function handleSBP() {
    const content = await selectPdfFile();
    const pdfDoc = await readPdfContent(content);
    await seperateByPages(pdfDoc, 9);
  }

  async function handleSBS() {
    const content = await selectPdfFile();
    const pdfDoc = await readPdfContent(content);
    await seperateByStudents(pdfDoc, 5);
  }

  async function handleCombine() {
    const dir = await selectDir();
    const paths = await readDirPaths(dir);
    const processed_paths = await processDirPaths(paths);
    console.log(processed_paths);
    await combineByPages(processed_paths, 5);
  }

  async function handleUpload() {
    const content = await selectPdfFile();
    // docUrl = await getDocURL(content);
  }

  async function handleCsv() {
    const content = await selectCsvFile();
    const csvDoc = await readCsvContent(content);
    console.log(csvDoc);
  }
</script>

<main class="flex flex-row min-h-screen bg-gray-100 text-gray-800">
  <Navbar />
  <MainFrame />
</main>

<style>
</style>
