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
  }).then((response) => {
    if (response.ok)
    {
      response.json().then(function(data) {
        localStorage.setItem('id', data.id)
        localStorage.setItem('nome', data.nome)
        localStorage.setItem('apelido', data.apelido)
        window.location.assign("https://sistema.ebbim.com.br/html/index.html")
      });
    }
    else
    {
      alert("Usuário ou senha incorretos, tente novamente")
    }
  })
}