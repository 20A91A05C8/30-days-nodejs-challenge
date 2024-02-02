const fs=require('fs')

function writeToFile(filePath, content) {
    // Implementation
    fs.writeFile(filePath,content,(err,data)=>{
        if(err)console.log('Error: '+err.message)
        else console.log('Data written to '+filePath)
    })
}
writeToFile('./output1.txt','sample content.')

writeToFile('nonexistent-folder/output.txt', 'Content in a non-existent folder.')



//writeToFile('test-files/output1.txt', 'Sample content.');
// Expected Output: Data written to output1.txt
//writeToFile('test-files/nonexistent-folder/output.txt', 'Content in a non-existent folder.');
// Expected Output: Error writing to file: ENOENT: no such file or directory...