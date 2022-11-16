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
  var apelido = document.getElementById("inputApelido").value.toString();
  var empresa = document.getElementById("inputEmpresa").value.toString();
  var documento = document.getElementById("inputCpfcnpj").value.toString();
  var rg = document.getElementById("inputRg").value.toString();
  var dataNascimento = document.getElementById("inputDataNascimento").value.toString();
  var fornecedor = document.getElementById("inputFornecedor").value.toString();
  var comentario = document.getElementById("inputComentario").value.toString();
  var razaoSocial = document.getElementById("inputRazaoSocial").value.toString();
  var ie = document.getElementById("inputIe").value.toString();
  var im = document.getElementById("inputIm").value.toString();
  var pf = 1;
  var estrangeiro = 1;
  if (document.getElementById("inputPJ").checked)
  {
    pf = null;
  }
  if (document.getElementById("inputEstrangeiro").checked)
  {
    estrangeiro = null;
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
    'apelido': apelido,
    'razaoSocial': razaoSocial,
    'estrangeiro': estrangeiro,
    'genero': genero,
    'pf': pf,
    'cpfCnpj': documento,
    'ie': ie,
    'im': im,
    'fornecedor': fornecedor,
    'empresa': empresa,
    'comentario': comentario,
    'rg': rg,
    'dataNascimento': dataNascimento
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

function removePessoa() {
  var id = document.getElementById("inputId").value.toString();
  fetch('https://sistema.ebbim.com.br/ebbim-api/Controllers/Pessoa/DeletarPessoa.php', {
  method: "POST",
  body: new URLSearchParams({
    'id': id
  }),
  headers: {"Content-type": "application/x-www-form-urlencoded"}
  }).then((response) => {
    if (response.ok)
    {
      alert("Removido");
    }
    else
    {
      alert("Erro");
    }
  })
}

function searchPessoa() {
  var id = document.getElementById("inputId").value.toString();
  fetch('https://sistema.ebbim.com.br/ebbim-api/Controllers/Pessoa/GetPessoa.php?id=' + id).then((response) => {
    if (response.ok)
    {
      response.json().then(function(data) {
        document.getElementById("inputNome").value = data.nome;
        document.getElementById("inputApelido").value = data.apelido;
        document.getElementById("inputEmpresa").value = data.empresa;
        document.getElementById("inputCpfcnpj").value = data.cpfCnpj;
        document.getElementById("inputRg").value = data.rg;
        document.getElementById("inputDataNascimento").value = data.dataNascimento;
        document.getElementById("inputFornecedor").value = data.fornecedor;
        document.getElementById("inputComentario").value = data.comentario;
        document.getElementById("inputRazaoSocial").value = data.razaoSocial;
        document.getElementById("inputIe").value = data.ie;
        document.getElementById("inputIm").value = data.im;
        document.getElementById("inputPJ").checked = !isTrue(data.pf);
        document.getElementById("inputEstrangeiro").checked = isTrue(data.estrangeiro);
        if (data.genero)
        {
          if (data.genero = "Masculino")
          {
            document.getElementById("inputMasculino").checked = true;
          }
          else if (data.genero = "Feminino")
          {
            document.getElementById("inputFeminino").checked = true;
          }
          else
          {
            document.getElementById("inputOutros").checked = true;
          }
        }
        alert("Encontrado");
      });
    }
    else
    {
      alert("Erro");
    }
  })
}

function isTrue(valor) {
  if (valor == 1)
  {
    return true;
  }
  else
  {
    return false;
  }
}

function editPessoa(campo) {
  var valor = document.getElementById("inputId").value.toString();
  fetch('https://sistema.ebbim.com.br/ebbim-api/Controllers/Pessoa/DeletarPessoa.php', {
  method: "POST",
  body: new URLSearchParams({
    'id': id
  }),
  headers: {"Content-type": "application/x-www-form-urlencoded"}
  }).then((response) => {
    if (response.ok)
    {
      alert("Removido");
    }
    else
    {
      alert("Erro");
    }
  })
}

function showBtnEdit(inputId) {
  btnId = "btn" + inputId.slice(5);
  btnId.style.display="block";
}

function hideBtnEdit(inputId) {
  btnId = "btnEdit" + inputId.slice(5);
  console.log(inputId + " " + btnId);
  btnId.toString().style.display="none";
}