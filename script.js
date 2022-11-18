const {readdir, rename} = require("fs");

function imagenes(){

    readdir('src/img/output', (err, filesout) => {
        const cantOutput = filesout.length <= 1 ? 0 : filesout.length-1;

        readdir('src/img/input', (err, files) => {

            for(let i=0; i<files.length; i++){
                let i1=cantOutput;

                if(files[i].includes('.md') === false){
                    rename(`src/img/input/${files[i]}`, `src/img/output/i${i+i1}.png`, err => {
                        if (err) throw err;
                        console.log('Renombramiento completado!');
                    });
                }
            }
    
        });
    });
}

imagenes();