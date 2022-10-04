function signIn() {
  var user = document.getElementById("user").value.toString();
  var password = document.getElementById("password").value.toString();
  fetch('https://sistema.ebbim.com.br/ebbim-api/Controllers/Login/Login.php', {
  method: "POST",
  body: JSON.stringify({
    login: user,
    senha: password
  }),
  headers: {"Content-type": "application/json; charset=UTF-8"}
  })
}