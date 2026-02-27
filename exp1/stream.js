const fs=require('fs');
const read=fs.createReadStream('./docs/info.txt',{encoding:'utf8'})
const write=fs.createWriteStream('./docs/info_copy.txt');


read.on('data',(buffer)=>{
    console.log('-----new buffer-----');
    console.log(buffer);
});

read.on('data',(buffer)=>{
    write.write('\n buffer\n')
    write.write(buffer);
});
