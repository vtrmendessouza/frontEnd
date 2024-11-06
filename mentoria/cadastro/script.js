function login(){
    const user = document.getElementById("user").value;
    //console.log(user);
    const password = document.getElementById("password").value;
    //console.log(parseFloat(password) + parseFloat(user));
}
const $buttom = document.getElementById("login");
$buttom.addEventListener("click", login);