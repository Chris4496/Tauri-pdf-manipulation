import { readBinaryFile, readTextFile, writeBinaryFile, FsBinaryFileOption, readDir } from "@tauri-apps/api/fs";
import { open } from "@tauri-apps/api/dialog";
import { PDFDocument } from "pdf-lib";
import { downloadDir } from "@tauri-apps/api/path";
import Papa from 'papaparse';


function range(start: number, stop: number, step: number = 1): number[] {
    if (typeof stop == 'undefined') {
        // one param defined
        stop = start;
        start = 0;
    }

    if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
        return [];
    }

    var result = [];
    for (var i = start; step > 0 ? i < stop : i > stop; i += step) {
        result.push(i);
    }

    return result;
};

export async function selectPdfFile() {

  const file = await open({
    filters: [
      { name: "PDF", extensions: ["pdf"] },
    ],
    multiple: false,
  });

  if (Array.isArray(file)) return;

  return file
}


export async function selectCsvFile() {

  const file = await open({
    filters: [
      { name: "CSV", extensions: ["csv"] },
    ],
    multiple: false,
  });

  if (Array.isArray(file)) return;

  return file
}


export async function readPdfContent(file: string) {
    const content = await readBinaryFile(file);
    const pdfDoc = await PDFDocument.load(content);
    return pdfDoc;
}


export async function getPdfLength(file: string) {
    const pdfDoc = await readPdfContent(file);
    return pdfDoc.getPageCount();
}


export async function readCsvContent(file: string) {
    const content = await readTextFile(file);
    const csvDoc = await Papa.parse(content, { header: true });
    return csvDoc;
}


export async function selectDir() {

    const dir = await open({
        directory: true,
        multiple: false,
    });

    if (Array.isArray(dir)) return;

    return dir
}


export async function readDirPaths(path: string) {
    const files = await readDir(path)
    const file_paths = files.map(file => file.path)
    return file_paths
}


export async function processDirPaths(paths: string[]) {
    const pdf_paths = paths.filter(path => path.endsWith(".pdf"))
    // sort by the number in the path using regex
    const sorted_paths = pdf_paths.sort((a, b) => {
        const a_num = parseInt(a.match(/\d+/g)[0])
        const b_num = parseInt(b.match(/\d+/g)[0])
        return a_num - b_num
    })

    const pdfDocs = await Promise.all(sorted_paths.map(path => readPdfContent(path)))

    return pdfDocs
}


export async function sameLength(pdfDocs: PDFDocument[]) {
    const length = pdfDocs[0].getPageCount()
    const same = pdfDocs.every(pdfDoc => pdfDoc.getPageCount() === length)
    return same
}




export async function saveFile(pdfDoc: Uint8Array, fileName: string) {
    const binaryOptions: FsBinaryFileOption = {
        contents: pdfDoc,
        path: await downloadDir() + fileName,
    }
    await writeBinaryFile(binaryOptions);
}




export async function seperateByStudents(pdfDoc: PDFDocument, numberOfStudents: number) {
    const page_count = pdfDoc.getPageCount();
    const pages_per_student = Math.ceil(page_count / numberOfStudents);


    for (let i = 0; i < page_count; i += pages_per_student) {
        const newPdfDoc = await PDFDocument.create();

        const pages_to_copy = range(i, i + pages_per_student);

        const pages = await newPdfDoc.copyPages(pdfDoc, pages_to_copy);

        for (const page of pages) {
            newPdfDoc.addPage(page);
        }

        const pdfBytes = await newPdfDoc.save();

        await saveFile(pdfBytes, `student_${i}.pdf`);

    }
}


export async function seperateByPages(pdfDoc: PDFDocument, numberOfPages: number) {
    const page_count = pdfDoc.getPageCount();

    for (let i = 0; i < numberOfPages; i++) {
        const newPdfDoc = await PDFDocument.create();

        const pages_to_copy = range(i, page_count, numberOfPages);

        console.log(pages_to_copy);

        const pages = await newPdfDoc.copyPages(pdfDoc, pages_to_copy);

        for (const page of pages) {
            newPdfDoc.addPage(page);
        }

        const pdfBytes = await newPdfDoc.save();

        await saveFile(pdfBytes, `all_page_${i+1}.pdf`);

    }
}


export async function combineByPages(pdfDocs: PDFDocument[], numberOfStudents: number) {
    // const pages_per_student = pdfDocs.length;

    for (let i = 0; i < numberOfStudents; i++) {
        const newPdfDoc = await PDFDocument.create();

        for (const pdfDoc of pdfDocs) {
            const [page] = await newPdfDoc.copyPages(pdfDoc, [i]);
            newPdfDoc.addPage(page);
        }

        const pdfBytes = await newPdfDoc.save();

        await saveFile(pdfBytes, `student_${i}.pdf`);
    }


}
