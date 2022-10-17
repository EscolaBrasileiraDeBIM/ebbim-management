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
      document.getElementById("alert-error-login").style.display="block";
    }
  })
}

function btnAlertClose() {
  document.getElementById("alert-error-login").style.display="none";
}

/* function getData() {
  document.getElementById("usernameSpan").innerText = localStorage.getItem('nome');
} */

function changePJ() {
  if (document.getElementById("inputPJ").checked)
  {
    document.getElementById("divRg").style.display="none";
    document.getElementById("divGenero").style.display="none";
    document.getElementById("divDataNascimento").style.display="none";
  }
  else
  {
    document.getElementById("divRg").style.display="block";
    document.getElementById("divGenero").style.display="block";
    document.getElementById("divDataNascimento").style.display="block";
  }
}