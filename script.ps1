Write-Output 'Iniciando conversión...'

Set-Location -Path $PSScriptRoot

$input_ret_all = @(Get-ChildItem -Path src\img\input\* -Name)
$input_list=@()

For($i=0; $i -lt $input_ret_all.Length; $i++){
    $last_dot_pos = $input_ret_all[$i].lastIndexOf(".")
    $ext = $input_ret_all[$i].Substring($last_dot_pos)

    if(($ext -eq '.png') -or ($ext -eq '.jpg') -or ($ext -eq '.webp') -or ($ext -eq '.jpeg')){
        $input_list+=$input_ret_all[$i]
    }
}

$output_return = Get-ChildItem -Path src\img\output\*.png -Name
$output_list = @($output_return)
$output_last = 0

if ($output_list.Length -gt 0){

    For($i=0; $i -lt $output_list.Length; $i++){
        $act = $output_list[$i]
        Rename-Item -Path "src\img\output\$act" -NewName "i$i.png"

        $output_last++
    }

}

if($input_list.Length -gt 0){
    For($i=0; $i -lt $input_list.Length; $i++){
        $act=$input_list[$i]
        
        $loc="src\img\input\$act"
        $dest="src\img\output\i"+$output_last+".png"

        Move-Item -Path $loc -Destination $dest
    
        $output_last++
    }
}

$output_list_final_len = @(Get-ChildItem -Path src\img\output\*.png -Name).Length

if($output_list_final_len -gt 0){
    Start-Process ".\index.html"
    Write-Output "Abriendo aplicación con $output_list_final_len imágenes..."
} else {
    Write-Output "Hay $output_list_final_len imágenes en la carpeta. Porfavor, añade al menos una."
}
# Read-Host -Prompt "Apreta Enter para salir"
