//Faz uma requisição à API https://randomuser.me/api utilizando fetch().
async function getPersonData() {
  
  try {
    
    //O uso de await garante que o código espere a resposta antes de continuar.
    //Converte a resposta obtida da API em formato JSON.
    const response = await fetch("https://randomuser.me/api");
    
    //O resultado é armazenado na variável json.
    const json = await response.json();
    
    //Um elemento <h1> para exibir o primeiro nome da pessoa.
    const h1 = document.createElement("h1");
    //Atribui o primeiro nome da pessoa ao conteúdo HTML do elemento <h1>.
    h1.innerHTML = json.results[0].name.first;

    //Um elemento <h2> para exibir o email da pessoa.
    const h2 = document.createElement("h2");
    //h2.innerHTML = json.results[0].email;
    h2.innerHTML = json.results[0].email;

    //Insere os elementos <h1> e <h2> no corpo da página HTML.
    document.querySelector("body").append(h1);
    document.querySelector("body").append(h2);

    //Captura erros que possam ocorrer durante a execução do try.
  } catch (erro) {

    //Exibe o erro no console do navegador
    console.error(erro);
    alert("Tente novamente mais tarde!")
  }

  }

  //Essa é a função principal, que controla o fluxo do programa:
  async function main() {

    //Exibe "teste 1" no console.
    console.log("teste 1");

    //Chama a função getPersonData() e espera ela ser concluída antes de continuar.
    await getPersonData();

    //Exibe "teste 3" no console, mas apenas após getPersonData() terminar.
    console.log("teste 3")
  }

//Executa a função principal main().
main()