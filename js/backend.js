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
      searchTelefone(id);
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
        divAdicionarEmail = document.getElementById("divCard").innerHTML;
        document.getElementById("divAdicionarEmail").remove();
        data.forEach(email => {
          htmlEmail = '<div class="mb-3 row"> <div class="divInputEmail"> <div class="form-floating"><input type="text" class="form-control" id="inputEmail' + email.id + '" placeholder="Thor@gmail.com" value="' + email.email +'" aria-describedby="floatingInputHelp" onfocus="showBtnEdit(this.id)" onfocusout="hideBtnEdit(this.id, event)" /> <label for="inputEmail ' + email.id + '">E-mail</label> <button class="btn btn-outline-primary btnEdit btnAdd btnRemove" id="btnRemoveEmail' + email.id + '" type="button" onclick="removeEmail(this.id)"><i class="tf-icons bx bx-minus iconEdit"></i></button> <button class="btn btn-outline-primary btnEdit" id="btnEditEmail' + email.id + '" type="button" onclick="editEmail(this.id)" onfocusout="hideBtnEdit(this.id, event)"><i class="tf-icons bx bxs-edit iconEdit"></i></button> </div> </div> <div class="divInputPrincipal py-3"> <div class="form-check"> <input name="default-radio-1" class="form-check-input" type="radio" id="inputPrincipal' + email.id + '" value="1" checked="" onchange="editEmail(id)"> </div> </div> </div>';
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
                <input name="default-radio-1" class="form-check-input" type="radio" id="inputPrincipal" value="" id="defaultRadio2" checked="">
              </div>
            </div>
          </div> */
          document.getElementById("divCard").innerHTML+=htmlEmail;
          i++;
        });
        document.getElementById("divCard").innerHTML+=divAdicionarEmail;
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
  btnId2 = "btnRemove" + inputId.slice(5);
  document.getElementById(btnId).style.display="block";
  document.getElementById(btnId2).style.display="block";
}

function hideBtnEdit(inputId, event) {
  if (!inputId.startsWith("btn"))
  {
    btnId = "btnEdit" + inputId.slice(5);
    btnId2 = "btnRemove" + inputId.slice(5);
  }
  if (!event.relatedTarget || (event.relatedTarget.id != btnId && event.relatedTarget.id != btnId2))
  {
    document.getElementById(btnId).style.display="none";
    document.getElementById(btnId2).style.display="none";
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

function addEmail() {
  var email = document.getElementById("inputEmail").value.toString();
  var idaa = document.getElementById("inputId").value.toString();
  var principal = 0;
  if (document.getElementById("inputPrincipal").checked)
  {
    principal = 1;
  }
  fetch('https://sistema.ebbim.com.br/ebbim-api/Controllers/Email/Inserir.php', {
  method: "POST",
  body: new URLSearchParams({
    'email': email,
    'idaa': idaa,
    'principal': principal
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

function editEmail(objectId) {
  objectType = document.getElementById(objectId).type;
  if (objectType == 'button')
  {
    id = objectId.slice(12);
    inputId = "input" + objectId.slice(7);
    valor = document.getElementById(inputId).value;
    campo = "nm_email";
    fetch('https://sistema.ebbim.com.br/ebbim-api/Controllers/Email/ChangeEmail.php', {
    method: "POST",
    body: new URLSearchParams({
      'id': id,
      'campo': campo,
      'novoValor': valor
    }),
    headers: {"Content-type": "application/x-www-form-urlencoded"}
    }).then((response) => {
      if (response.ok)
      {
        if (objectType == 'button')
        {
          alert("Email atualizado para " + valor);
        }
      }
      else
      {
        alert("Erro");
      }
    })
  }
  else
  {
    idPrincipal = objectId.slice(14);
    valor = 0;
    campo = "ic_principal";
    array = Array.from(document.getElementById("inputPrincipalAB00006").parentElement.parentElement.parentElement.parentElement.children).forEach(el => {
      id = el.children[1].children[0].children[0].id.slice(14);
      if (id)
      {
        if (id == idPrincipal)
        {
          valor = 1;
        }
        fetch('https://sistema.ebbim.com.br/ebbim-api/Controllers/Email/ChangeEmail.php', {
        method: "POST",
        body: new URLSearchParams({
          'id': id,
          'campo': campo,
          'novoValor': valor
        }),
        headers: {"Content-type": "application/x-www-form-urlencoded"}
        })
        valor = 0;
      }
    })
  }
}

function removeEmail(objectId) {
  id = objectId.slice(14);
  fetch('https://sistema.ebbim.com.br/ebbim-api/Controllers/Email/DeletarEmail.php', {
  method: "POST",
  body: new URLSearchParams({
    'id': id
  }),
  headers: {"Content-type": "application/x-www-form-urlencoded"}
  }).then((response) => {
    if (response.ok)
    {
      document.getElementById(objectId).parentElement.parentElement.parentElement.remove();
      alert("Removido");
    }
    else
    {
      alert("Erro");
    }
  })
}

function addTelefone() {
  var ddi = document.getElementById("inputDdi").value.toString();
  var ddd = document.getElementById("inputDdd").value.toString();
  var telefone = document.getElementById("inputTelefone").value.toString();
  var idaa = document.getElementById("inputId").value.toString();
  fetch('https://sistema.ebbim.com.br/ebbim-api/Controllers/Telefone/Inserir.php', {
  method: "POST",
  body: new URLSearchParams({
    'ddi': ddi,
    'ddd': ddd,
    'numero': telefone,
    'idaa': idaa
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

function searchTelefone(id) {
  fetch('https://sistema.ebbim.com.br/ebbim-api/Controllers/Telefone/GetTelefoneAA.php?idaa=' + id).then((response) => {
    if (response.ok)
    {
      response.json().then(function(data) {
        i = 0;
        divAdicionarTelefone = document.getElementById("divCard2").innerHTML;
        document.getElementById("divAdicionarTelefone").remove();
        data.forEach(telefone => {
          htmlTelefone = '<div class="mb-3 row" id="divAdicionarTelefone"> <div class="input-group"> <div class="form-floating formMini"> <input type="text" class="form-control" id="inputDdi' + telefone.id +  '" value="' + telefone.ddi + '" placeholder="55" aria-describedby="floatingInputHelp" /> <label for="inputDdi">DDI</label> </div> <div class="form-floating formMini"> <input type="text" class="form-control formCenter" id="inputDdd' + telefone.id +  '" value="' + telefone.ddd + '" placeholder="11" aria-describedby="floatingInputHelp" /> <label for="inputDdd">DDD</label> </div> <div class="form-floating formMain"> <input type="text" class="form-control formRight" id="inputTelefone' + telefone.id +  '" value="' + telefone.numero + '" aria-describedby="floatingInputHelp" onfocus="showBtnEdit(this.id)" onfocusout="hideBtnEdit(this.id, event)"/> <label for="inputTelefone">Telefone</label> <button class="btn btn-outline-primary btnEdit btnAdd btnRemove" id="btnRemoveTelefone' + telefone.id + '" type="button" onclick="removeTelefone(this.id)"> <i class="tf-icons bx bx-minus iconEdit"></i> </button> <button class="btn btn-outline-primary btnEdit" id="btnEditTelefone' + telefone.id + '" type="button" onclick="editTelefone(this.id)" onfocusout="hideBtnEdit(this.id, event)"> <i class="tf-icons bx bxs-edit iconEdit"></i> </button> </div> </div> </div>';
          /* <div class="mb-3 row" id="divAdicionarTelefone">
              <div class="input-group">
                <div class="form-floating formMini">
                  <input
                    type="text"
                    class="form-control"
                    id="inputDdi"
                    placeholder="55"
                    aria-describedby="floatingInputHelp"
                  />
                  <label for="inputDdi">DDI</label>
                </div>
                <div class="form-floating formMini">
                  <input
                    type="text"
                    class="form-control formCenter"
                    id="inputDdd"
                    placeholder="11"
                    aria-describedby="floatingInputHelp"
                  />
                  <label for="inputDdd">DDD</label>
                </div>
                <div class="form-floating formMain">
                  <input
                    type="text"
                    class="form-control formRight"
                    id="inputTelefone"
                    placeholder="996827771"
                    aria-describedby="floatingInputHelp"
                  />
                  <label for="inputTelefone">Telefone</label>
                  <button class="btn btn-outline-primary btnEdit btnAdd btnRemove" id="btnRemoveTelefone' + telefone.id + '" type="button" onclick="removeTelefone(this.id)">
                    <i class="tf-icons bx bx-minus iconEdit"></i>
                  </button>
                  <button class="btn btn-outline-primary btnEdit" id="btnEditTelefone' + telefone.id + '" type="button" onclick="editTelefone(this.id)" onfocusout="hideBtnEdit(this.id, event)">
                    <i class="tf-icons bx bxs-edit iconEdit"></i>
                  </button>
                </div>
              </div>
            </div> */
          document.getElementById("divCard2").innerHTML+=htmlTelefone;
          i++;
        });
        document.getElementById("divCard2").innerHTML+=divAdicionarTelefone;
      })
    }
    else
    {
      alert("Erro");
    }
  })
}

function editTelefone(objectId) {
  objectType = document.getElementById(objectId).type;
  id = objectId.slice(15);
  inputId = "input" + objectId.slice(7);
  valor = document.getElementById(inputId).value;
  fetch('https://sistema.ebbim.com.br/ebbim-api/Controllers/Telefone/ChangeTelefone.php', {
  method: "POST",
  body: new URLSearchParams({
    'id': id,
    'campo': 'cd_telefone',
    'novoValor': valor
  }),
  headers: {"Content-type": "application/x-www-form-urlencoded"}
  }).then((response) => {
    if (response.ok)
    {

      alert("Telefone atualizado para " + valor);
    }
    else
    {
      alert("Erro");
    }
  })
}

function removeTelefone(objectId) {
  id = objectId.slice(17);
  fetch('https://sistema.ebbim.com.br/ebbim-api/Controllers/Telefone/DeletarTelefone.php', {
  method: "POST",
  body: new URLSearchParams({
    'id': id
  }),
  headers: {"Content-type": "application/x-www-form-urlencoded"}
  }).then((response) => {
    if (response.ok)
    {
      document.getElementById(objectId).parentElement.parentElement.parentElement.remove();
      alert("Removido");
    }
    else
    {
      alert("Erro");
    }
  })
}