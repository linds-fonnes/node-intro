const axios = require("axios");
const fs = require("fs");

function cat(path){
    fs.readFile(path,"utf8", function(err,data){
        if (err){
            console.log("ERROR:",err);
            process.exit(1);
        }
        console.log(data);
    })
}

async function webCat(url){
    try{
        let resp = await axios.get(url);
        console.log(resp.data);
    } catch(err){
        console.log(`Error fetching ${url}:`,err);
    } 
}

function handleOutput(new_text,path){
    fs.writeFile(path,new_text,"utf8", err => {
        if(err){
            console.log(`Error writing to ${path}`, err)
            process.kill(1)
        }
        console.log("it worked")
    })
}

let arg = process.argv[2];

if(arg.slice(0,4) === "http"){
    webCat(arg);
} else if (arg === "--out"){
    let txt = process.argv[3]
    let file = process.argv[4]
    handleOutput(txt,file)
}
else {
    cat(arg);
}


