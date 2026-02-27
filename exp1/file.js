const fs = require('fs');
if(!fs.existsSync('./docs')) {
fs.mkdir('./docs', (err) => {
    if (err) console.log(err.message);
    else console.log('folder created');
});
} else {
    console.log('folder already exists');
}

fs.writeFile('./docs/info.txt', 'This is some information.', (err) => {
    if (err) console.log(err.message);  
    else console.log('file created');
});
if(fs.existsSync('./docs/info.txt')){
fs.readFile('./docs/info.txt', (err,data) => {
    if (err) console.log(err.message);  
    else console.log(data.toString());
});}
else {
    console.log('file already exists');
}
if(fs.existsSync('./docs/info.txt'))
    fs.unlink('./docs/info.txt', (err) => {
        if (err) console.log(err.message);  
        else console.log('file deleted');   
        });
else {
    console.log('file does not exist');
}
if(fs.existsSync('./docs'))
fs.rmdir('./docs', (err) => {
    if (err) console.log(err.message);  
    else console.log('folder deleted');   
    });
else {
    console.log('folder does not exist');
}



