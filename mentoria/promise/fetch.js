async function getPersonData() {
  try {
    const response = await fetch("https://randomuser.me/api");
    const json = await response.json();

    const h1 = document.createElement("h1");
    h1.innerHTML = json.results[0].name.first;

    const h2 = document.createElement("h2");
    h2.innerHTML = json.results[0].email;

    document.querySelector("body").append(h1);
    document.querySelector("body").append(h2);
  } catch (erro) {
    console.error(erro);
    alert("Tente novamente mais tarde!")
  }

}

async function main() {
  console.log("teste 1");
  await getPersonData();
  console.log("teste 3")
}

main()