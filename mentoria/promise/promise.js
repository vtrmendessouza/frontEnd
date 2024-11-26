
const soma = (a, b) => {
    return Number(a + b);
  }
  
  const DOIS_SEGUNDOS = 1000 * 2;
  
  const somaDoBancoDeDadosPromesa = new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
  
          const resultado = soma(4, 7); // operação super complexa com o banco de dados

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
  
  