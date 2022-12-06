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
        document.getElementById("inputCpfCnpj").value = data.cpfCnpj;
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
      searchEmail(id);
    }
    else
    {
      alert("Erro");
    }
  })
}

function searchEmail(id) {
  fetch('https://sistema.ebbim.com.br/ebbim-api/Controllers/Email/GetEmailsAA.php?idaa=' + id).then((response) => {
    if (response.ok)
    {
      response.json().then(function(data) {
        i = 0;
        data.forEach(email => {
          htmlEmail = '<div class="mb-3 row"> <div class="divInputEmail"> <div class="form-floating"><input type="text" class="form-control" id="inputEmail' + email.id + '" placeholder="Thor@gmail.com" value="' + email.email +'" aria-describedby="floatingInputHelp" onfocus="showBtnEdit(this.id)" onfoCcusout="hideBtnEdit(this.id, event)" /> <label for="inputEmail ' + email.id + '">E-mail</label> <button class="btn btn-outline-primary btnEdit" id="btnEditEmail' + email.id + '" type="button" onclick="editPessoa(this.id)" onfocusout="hideBtnEdit(this.id, event)"><i class="tf-icons bx bxs-edit iconEdit"></i></button> </div> </div> <div class="divInputPrincipal py-3"> <div class="form-check"> <input name="default-radio-1" class="form-check-input" type="radio" id="inputPrincipal' + email.id + '" value="1" checked="" onchange="editPessoa(this.id)"> </div> </div> </div>';
          /* <div class="mb-3 row">
            <div class="divInputEmail">
              <div class="form-floating">
                <input
                  type="text"
                  class="form-control"
                  id="inputEmail"
                  placeholder="Thor@gmail.com"
                  aria-describedby="floatingInputHelp"
                  onfocus="showBtnEdit(this.id)"
                  onfocusout="hideBtnEdit(this.id, event)"
                />
                <label for="inputEmail">E-mail</label>
                <button class="btn btn-outline-primary btnEdit" id="btnEditEmail" type="button" onclick="editPessoa(this.id)" onfocusout="hideBtnEdit(this.id, event)"><i class="tf-icons bx bxs-edit iconEdit"></i></button>
              </div>
            </div>
            <div class="divInputPrincipal py-3">
              <div class="form-check">
                <input name="default-radio-1" class="form-check-input" type="radio" id="inputPrincipal" value="" id="defaultRadio2" checked="" onchange="editPessoa(this.id)">
              </div>
            </div>
          </div> */
          document.getElementById("divCard").innerHTML+=htmlEmail;
          i++;
        });
      })
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

function showBtnEdit(inputId) {
  btnId = "btnEdit" + inputId.slice(5);
  document.getElementById(btnId).style.display="block";
}

function hideBtnEdit(inputId, event) {
  console.log("log");
  if (!inputId.startsWith("btn"))
  {
    console.log("1 if");
    btnId = "btnEdit" + inputId.slice(5);
  }
  if (!event.relatedTarget || event.relatedTarget.id != btnId)
  {
    console.log("2 if");
    document.getElementById(btnId).style.display="none";
  }
}

function editPessoa(objectId) {
  idPessoa = document.getElementById("inputId").value.toString();
  if (idPessoa)
  {
    objectType = document.getElementById(objectId).type;
    if (objectType == 'button')
    {
      inputId = "input" + objectId.slice(7);
      valor = document.getElementById(inputId).value;
      campo = objectId.slice(7).toLowerCase();
      campoSql = "";
      switch (campo) {
        case "nome":
          campoSql = "nm_pessoa";
          break;
        case "apelido":
          campoSql = "nm_apelido";
          break;
        case "razaosocial":
          campoSql = "nm_razao_social";
          break;
        case "empresa":
          campoSql = "nm_empresa";
          break;
        case "cpfcnpj":
          campoSql = "cd_cpf_cnpj";
          break;
        case "ie":
          campoSql = "cd_inscricao_estadual";
          break;
        case "im":
          campoSql = "cd_inscricao_municipal";
          break;
        case "rg":
          campoSql = "cd_rg";
          break;
        case "comentario":
          campoSql = "ds_comentario";
          break;  
        default:
          campoSql = "";
      }
    }
    else
    {
      inputId = objectId;
      if (objectType == 'checkbox')
      {
        valor = + document.getElementById(inputId).checked;
      }
      else
      {
        valor = document.getElementById(inputId).value;
      }
      campo = inputId.slice(5).toLowerCase();
      campoSql = "";
      switch (campo) {
        case "pj":
          campoSql = "ic_pf";
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
          break;
        case "estrangeiro":
          campoSql = "ic_estrangeiro";
          break;
        case "masculino": case "feminino": case "outros":
          campoSql = "ic_genero";
          break;
        case "fornecedor":
          campoSql = "nm_fornecedor";
          break;
        case "datanascimento":
          campoSql = "dt_nascimento";
          break;
        default:
          campoSql = "";
      }
    }
    fetch('https://sistema.ebbim.com.br/ebbim-api/Controllers/Pessoa/ChangePessoa.php', {
    method: "POST",
    body: new URLSearchParams({
      'id': idPessoa,
      'campo': campoSql,
      'novoValor': valor
    }),
    headers: {"Content-type": "application/x-www-form-urlencoded"}
    }).then((response) => {
      if (response.ok)
      {
        if (objectType == 'button')
        {
          alert("Atulizado o campo de " + campo + " para " + valor);
        }
      }
      else
      {
        alert("Erro");
      }
    })
  }
}