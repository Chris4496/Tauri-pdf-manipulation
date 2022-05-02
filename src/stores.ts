import { writable } from 'svelte/store';

export const selectedFolderPath = writable('');

export const folderError = writable('');

export const selectedFilePath = writable('');

export const selectedCsvFilePath = writable('');

export const selectedFileLength = writable(0);

export const headerSelection = writable([]);

export const csvContent = writable([]);