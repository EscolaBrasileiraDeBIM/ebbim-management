function signIn() {
  var user = document.getElementById("user").value.toString();
  var password = document.getElementById("password").value.toString();
  fetch('https://sistema.ebbim.com.br/ebbim-api/Controllers/Login/Login.php', {
  method: "POST",
  body: new URLSearchParams({
    'login': user,
    'senha': password
  }),
  headers: {"Content-type": "application/x-www-form-urlencoded"}
  }).then(function(response) {
    response.json().then(function(data) {
      console.log(data.apelido);
    });
  })
}