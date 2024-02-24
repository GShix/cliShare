const commander = require('commander')
const program = new commander.Command();
const fs = require('fs');
const sendEmail = require('./services/sendEmail');
program
.option("-t, --to <to>","recipient email address")
.arguments("<files...>")
.on("--help",()=>{
    console.log("")
    console.log("Examples")
    console.log(
        "$clishare -t recipientemail@gmail.com file1.txt file2.txt"
    )
    console.log("")
})

program.parse(process.argv)
// console.log(program)
const recipientEmail= program._optionValues.to
if(!recipientEmail){
    console.error("Error: Pleae provide the recipient email address.")
    process.exit(1)
}
console.log(program.args)

let files = []
for(let i = 0;i<program.args.length;i++){
    const fileName = program.args[i]
    const fileContent = fs.readFileSync(fileName)
    files.push(
        {
            filename:fileName,
            content:fileContent
        }
        ) 
}
    // console.log(files)

    const data = {
        gmail:recipientEmail,
        subject: "File shared through CLI Share",
        message:"This file is sent through clishare",
        files
    }

    sendEmail(data)
    .then((res)=>{
        console.log("File sent successfully")
    })
    .catch((err)=>{
        console.log(err.message)
        process.exit(1)
    })