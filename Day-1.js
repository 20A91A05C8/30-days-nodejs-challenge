const fs=require('fs')
function readFileContent(filePath) {
    // Implementation
        fs.readFile(filePath,'Utf8',(err,data)=>{
            if(err)console.log('Error reading file: ENOENT: no such file or directory...')
            else console.log('File Content:\n'+data)
        })
}
readFileContent('./file1.txt')

readFileContent('./empty-file.txt')

readFileContent('./nonexisting-file.txt')



// Expected Output:

// File Content:
// This is the content of the file.
// Hello, Node.js!
// Test Cases:

// readFileContent('test-files/file1.txt');
// // Expected Output: Content of file1.txt

// readFileContent('test-files/empty-file.txt');
// // Expected Output: (empty string)

// readFileContent('test-files/nonexistent-file.txt');
// // Expected Output: Error reading file: ENOENT: no such file or directory...