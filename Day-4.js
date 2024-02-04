const path=require('path')
function resolvePath(relativePath) { 
    // Implementation 
    console.log('Resolved Path: ' ,path.resolve(relativePath))
}

    
resolvePath('../projects/Nodejs30days/file.txt'); 
// Expected Output: Resolved Path: /Users/username/project/folder/file.txt

resolvePath('nonexistent-folder/file.txt'); 
// Expected Output: Resolved Path: /Users/username/nonexistent-folder/file.txt