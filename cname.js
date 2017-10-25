// 用于序列化重命名图片
var fs = require("fs");
var path = require("path");
var args = process.argv.splice(2);
var fileDirectory = args[0];
var re = /\.(jpg|png|gif|jpeg)$/i;
var start = args[1] || 0;
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
            var fileName = (i + parseInt(start)) + file.match(re)[0];
            var newFilePath = path.join(fileDirectory, fileName);

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
        }
    }
}else{
    console.log(fileDirectory +' is null.');
}
