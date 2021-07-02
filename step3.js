const axios = require("axios");
const fs = require("fs");

//passes in the path to be read, if there's an error then show error, otherwise handle output
function cat(path,out){
    fs.readFile(path,"utf8", function(err,data){
        if (err){
            console.log("ERROR:",err);
            process.exit(1);
        } else {
            handleOutput(data,out);
        }
    })
}

//get resp from axios and pass to handleoutput, catch error
async function webCat(url,out){
    try{
        let resp = await axios.get(url);
        handleOutput(resp.data,out)
    } catch(err){
        console.log(`Error fetching ${url}:`,err);
        process.exit(1)
    } 
}

//if there is an out defined, then write to new file & don't console.log anything. else just console.log what was given from webCat or cat
function handleOutput(text,out){
    if(out){
        fs.writeFile(out,text,"utf8", err => {
            if(err){
                console.log(`Error writing to ${out}: ${err}`)
                process.exit(1)
            }
        })
    } else{
        console.log(text)
    }
}

//declare path & out 
let path;
let out;

//if --out then they want the function to run w/o output  
if (process.argv[2] === "--out"){
    out = process.argv[3];
    path = process.argv[4];
} else {
    path = process.argv[2];
}

//which function to run based on type of path provided
if(path.slice(0,4) === "http"){
    webCat(path,out);
} else {
    cat(path,out);
}


