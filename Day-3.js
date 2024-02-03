const {exec}= require('child_process');

function executeCommand(command) {
    // Implementation
    exec(command,(error,stdout,stderr)=>{
        if(error)console.log(`Error executing command: ${error.message}`)
        else if(stderr)console.log(`Error:, ${stderr}`)
        else console.log(stdout)
    })
}

executeCommand('dir');
// Expected Output: (output of ls -la)
executeCommand('echo "Hello, Node.js!"');
// Expected Output: Hello, Node.js!