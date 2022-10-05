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
  }).then((response) => resultado = response.status);
  if (resultado == 201)
  {
    alert("Login realizado com sucesso")
  }
  else
  {
    alert("Usuário ou senha incorretos, tente novamente")
  }
}