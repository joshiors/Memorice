const {readdir, rename} = require("fs");

function imagenes(){

    readdir('img/input', (err, files) => {
        for(let i=0; i<files.length; i++){
            rename(`img/input/${files[i]}`, `img/output/i${i}.png`, err => {
                if (err) throw err;
                console.log('Renombramiento completado!');
              });
        }
    });
}

imagenes();