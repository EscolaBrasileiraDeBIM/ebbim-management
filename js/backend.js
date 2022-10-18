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
    document.getElementById("divApelido").style.display="none";
    document.getElementById("divRg").style.display="none";
    document.getElementById("divGenero").style.display="none";
    document.getElementById("divDataNascimento").style.display="none";

    document.getElementById("divRazaoSocial").style.display="block";
    document.getElementById("divIm").style.display="block";
    document.getElementById("divIe").style.display="block";
  }
  else
  {
    document.getElementById("divApelido").style.display="block";
    document.getElementById("divRg").style.display="block";
    document.getElementById("divGenero").style.display="block";
    document.getElementById("divDataNascimento").style.display="block";

    document.getElementById("divRazaoSocial").style.display="none";
    document.getElementById("divIm").style.display="none";
    document.getElementById("divIe").style.display="none";
  }
}

function addPessoa() {
  var nome = document.getElementById("inputNome").value.toString();
  var pf;
  if (!document.getElementById("inputPJ").checked)
  {
    pf = 1;
  }
  var genero = "";
  if (document.getElementById("inputMasculino").checked)
  {
    genero = "Masculino";
  }
  else if (document.getElementById("inputFeminino").checked)
  {
    genero = "Feminino";
  }
  else if (document.getElementById("inputOutros").checked)
  {
    genero = "Outros";
  }
  fetch('https://sistema.ebbim.com.br/ebbim-api/Controllers/Pessoa/Inserir.php', {
  method: "POST",
  body: new URLSearchParams({
    'nome': nome,
    'pf': pf,
    'genero': genero
  }),
  headers: {"Content-type": "application/x-www-form-urlencoded"}
  }).then((response) => {
    if (response.ok)
    {
      response.json().then(function(data) {
        alert("Adicionado");
      });
    }
    else
    {
      alert("Erro");
    }
  })
}