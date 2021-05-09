cadena ="anulnalaluapaisajemontanaguaamoraromacomidaluzazulsillagatobotellacamarayosoypalindromocasaverdebanderaventanacangrejolarutanosaportootropasonaturaliniciaracaestoseralodoodolaresdonasbarcosmarcieloaviontierrapaisbicicletaestonoespalindromojugarseverlasalrevesusandounradarenelojorejero"


function palindromoPrueba(cadena){
    let indice = 0;
    const numeroMinimo = 4;
    let acumularIndice = numeroMinimo;
    
    while (indice <= cadena.length - numeroMinimo) {
        let cadenaIzquierda = cadena.substring(indice, indice + acumularIndice);
        let cadenaDerecha = cadenaIzquierda.split("").reverse().join("");
                
        if (cadenaIzquierda == cadenaDerecha) {
            console.log('Palindromo: ', cadenaIzquierda);
            acumularIndice++;
        }
        
        if ((indice + acumularIndice) >= (cadena.length)) {
            indice++;
            acumularIndice = numeroMinimo;
        } else {
            acumularIndice++;
        }
    }
}