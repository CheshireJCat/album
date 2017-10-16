// 用于序列化重命名图片
var fs = require("fs");
var path = require("path");
var args = process.argv.splice(2);
var fileDirectory = args[0];
var start = args[1];
var re = /\.(jpg|png|gif|jpeg)$/i;
var data = [];
if (fs.existsSync(fileDirectory)) {
    var files = fs.readdirSync(fileDirectory);
    var l = files.length;
    var res = 0;
    var img = 0;
    var notImg = 0;
    files.forEach(function(file,i) {
        var filePath = path.join(fileDirectory,file);
        if (re.test(file)) {
            file = file.toLowerCase();
            var fileName = (parseInt(start) + i) + file.match(re)[0];
            var newFilePath = path.join(fileDirectory, fileName);
            data.push({s:fileName,t:''});
            fs.rename(filePath, newFilePath, function(err) {
                if (err) throw err;
                res++;
                img++;
                complete();
                // console.log(filePath + ' ok~');
            });
        }else{
            res++;
            notImg++;
            complete();
            // console.log(file +' is not a image');
        }
    });
    function complete(){
        if(res == l){
            console.log(img + ' images has been rename, ' + notImg + ' files is not image.');
            console.log(data);
            fs.writeFile('res.json', JSON.stringify(data), function(){
                console.log('complete!');
            });
        }
    }
}else{
    console.log(fileDirectory +' is null.');
}
