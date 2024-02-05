const path=require('path')
function checkFileExtension(filePath, expectedExtension) {
    // Implementation
    let actualpath=path.extname(filePath)
    if(actualpath==expectedExtension)
    console.log('File has the expected extension:',actualpath )
    else
    console.log(`File does not have the expected extension. Expected: ${expectedExtension}, Actual: ${actualpath}`)
}

checkFileExtension('test-files/file1.txt', '.txt');
// Expected Output: File has the expected extension: .txt

checkFileExtension('test-files/image.png', '.jpg');
// Expected Output: File does not have the expected extension. Expected: .jpg, Actual: .png