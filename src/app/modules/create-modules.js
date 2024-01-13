/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const fs = require('fs/promises');
const path = require('path');

// Define the file extensions
const extensions = [
  'interface.ts',
  'model.ts',
  'validation.ts',
  'controller.ts',
  'service.ts',
  'router.ts',
];

// Define the folder name
const folder = 'EnrolledCourse';

// Function to create files in a folder
async function createFiles(folder) {
  // Loop through each extension and create the corresponding file
  for (const extension of extensions) {
    await fs.writeFile(
      path.join(__dirname, `${folder}/${folder}.${extension}`),
      '',
    );
  }
}

// Loop through each folder and create files
async function main() {
  try {
    await fs.mkdir(path.join(__dirname, folder));
    await createFiles(folder);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error) {
    console.error(
      `Error creating files for folder ${folder}: ${error.message}`,
    );
  }
}

main();
