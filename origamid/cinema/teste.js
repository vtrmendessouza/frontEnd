function somar(primeiroNumero, segundoNumero){
    const result = primeiroNumero + segundoNumero;
    return result;
}
function imprimir(callback){
    const text = "message";
    callback(text);
}
function imprimirMelhorado(texto){
    console.log("ℹ️");
    console.log(texto);
}
imprimir(imprimirMelhorado);
