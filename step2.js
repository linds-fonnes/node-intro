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

let arg = process.argv[2];

if(arg.slice(0,4) === "http"){
    webCat(arg);
} else {
    cat(arg);
}
