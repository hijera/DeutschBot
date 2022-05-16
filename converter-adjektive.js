var fs = require('fs');

var data = fs.readFileSync('source.txt', 'utf8');

var dataArr=data.split("\n");
let res=[];
dataArr.forEach(function(item){
    let matches= item.match(/^([a-za-zA-ZÀ-ž]+)\s+([а-я].*?)$/im);

    if (matches)
    {
        let resObj={
            "type" : "adjektive",
            "word":matches[1],
            "translation":matches[2],
        };
        res.push(resObj);
    }

});



fs.writeFile ("adjektive-output.json", JSON.stringify(res), function(err) {
        if (err) throw err;
    }
);
