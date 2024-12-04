//A função fetch retorna uma Promise, que representa a requisição à API. 
//A Promise será resolvida quando os dados forem recebidos.
const personPromise = fetch("https://randomuser.me/api/");

let email = "";

//Converte a resposta obtida da API para JSON com response.json(), que também retorna uma Promise.
personPromise.then((response) => {
  const jsonPromise = response.json();

  //Extrai o campo email do objeto retornado (person.results[0].email) e o armazena na variável email.
  jsonPromise.then((person) => {
    email = person.results[0].email;
  })
});

//A variável email é verificada imediatamente após a chamada de fetch.
if (email.includes(".com")) {
  alert("deu certo")
} else {
  alert("deu errado")
}