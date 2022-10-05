function signIn() {
  var user = document.getElementById("user").value.toString();
  var password = document.getElementById("password").value.toString();
  fetch('https://sistema.ebbim.com.br/ebbim-api/Controllers/Login/Login.php', {
  method: "POST",
  body: new URLSearchParams({
    'login': 'gabriel.val',
    'senha': 'teste'
  }),
  headers: {"Content-type": "application/x-www-form-urlencoded"}
  }).then((response) => alert(response)).then((data) => alert(data));
}