const personPromise = fetch("https://randomuser.me/api/");

let email = "";

personPromise.then((response) => {
  const jsonPromise = response.json();
  jsonPromise.then((person) => {
    email = person.results[0].email;
  })
});


if (email.includes(".com")) {
  alert("deu certo")
} else {
  alert("deu errado")
}




