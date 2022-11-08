const {readdir, rename} = require("fs");

function imagenes(){

    readdir('src/img/input', (err, files) => {
        for(let i=0; i<files.length; i++){
            rename(`src/img/input/${files[i]}`, `src/img/output/i${i}.png`, err => {
                if (err) throw err;
                console.log('Renombramiento completado!');
              });
        }
    });
}

imagenes();