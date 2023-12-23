import os
import shutil

def imagenes():
    src_input='src/img/input/'
    src_output='src/img/output/'
    
    #eliminamos los 'readme.md'
    for file in os.listdir(src_input):
        if file=='readme.md':
            os.remove(f'{src_input}/readme.md')

    for file in os.listdir(src_output):
        if file=='readme.md':
            os.remove(f'{src_output}/readme.md')

    input_list=os.listdir(src_input)
    output_list=os.listdir(src_output)

    #ordenamos las imágenes preexistentes en "output" (de existir):
    cant_pre=0
    if(len(output_list)>0):
        i=0
        while i<len(output_list):
            os.rename(f'{src_output}{output_list[i]}', f'{src_output}i{i}.png')
            i+=1
        
        cant_pre=len(output_list)

    #renombramos imágenes en "input" y movemos a "output":
    i=0
    i_id=cant_pre
    while i<len(input_list):
        os.rename(f'{src_input}{input_list[i]}', f'{src_input}i{i_id}.png')
        shutil.move(f'{src_input}i{i_id}.png', src_output)
        print(f'Renombramiento de "{input_list[i]}" con éxito')
        i+=1
        i_id+=1

    res=True
    
    if(len(os.listdir(src_input))>0):    
        res=f"{input_list} ---> {os.listdir(src_input)}"
    else:
        res='La conversión no pudo realizarse completamente...'

    return res

imagenes()