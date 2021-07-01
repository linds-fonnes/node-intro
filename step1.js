const fs = require("fs")

function cat(path){
    fs.readFile(path,"utf8", function(err,data){
        if (err){
            console.log("ERROR:",err);
            process.exit(1)
        }
        console.log(data)
    })
}

cat(process.argv[2])

module.exports = {cat}