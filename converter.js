var fs = require('fs');

    var data = fs.readFileSync('source.txt', 'utf8');

    var dataArr=data.split("\n");
let res=[];
    dataArr.forEach(function(item){
      let matches= item.match(/^(d(ie|as|er))\s+([a-zA-ZÀ-ž]+)/i);

      if (matches)
      {
          let s="";
          if (matches[1]=='der')
          {
              s="m";
          }
          if (matches[1]=='die')
          {
              s="f";
          }
          if (matches[1]=="das")
          {
              s="n";
          }
          let resObj={
              "type" : "nomen",
              "word":matches[3],
              "sex":s,
          };
          res.push(resObj);
      }

    });



fs.writeFile ("input.json", JSON.stringify(res), function(err) {
        if (err) throw err;
    }
);
