function getElement(id) {
  return document.getElementById(id);
}

function signIn() {
  var userEmail = "";
  var login = getElement("email").value.toString();
  var password = getElement("password").value.toString();
  if (login.indexOf('@') > 0)
  {
    userEmail = "email";
  }
  else
  {
    userEmail = "usuario";
  }
  window.location.href("Controllers/Pessoa/GetPessoa.php?" + userEmail + "=" + login + "&senha=" + password);
}

function signUp() {
  var user = getElement("user").value.toString();
  var email = getElement("email").value.toString();
  var password = getElement("password").value.toString();
  window.location.href("Controllers/Pessoa/Inserir.php?usuario" +  + "=" + user + "&senha=" + password + "&email=" + email);
}

