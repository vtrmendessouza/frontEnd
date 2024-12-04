const soma = (a, b) => {
    return Number(a + b);
  }
  
  //será usado para simular o atraso na "consulta ao banco de dados".
  const DOIS_SEGUNDOS = 1000 * 2;
  
  //Cria uma Promise que representa a operação assíncrona de "consulta ao banco de dados".
  const somaDoBancoDeDadosPromesa = new Promise((resolve, reject) => {

      //Simula o atraso de 2 segundos antes de resolver a Promise.
      setTimeout(() => {
        try {
          
          const resultado = soma(4, 7); // operação super complexa com o banco de dados

          //Resolve a Promise principal retornando um objeto que contém outra Promise (com a chave json). 
          resolve({
            json: new Promise((resolve, reject) => {
                // ...
                resolve()
            })
          });
        } catch(err) {
          reject("TESTE REJECT")
        }
      }, DOIS_SEGUNDOS)
  });
  
  function tratarErro(erro) {
      document.querySelector("body").innerHTML = erro;
  }
  
  somaDoBancoDeDadosPromesa.then((resultado) => {
    console.log(resultado);
    document.querySelector("body").innerHTML = `<b>${resultado} </b>`;
  }).catch(tratarErro)