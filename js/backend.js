function getElement(id) {
  return document.getElementById(id);
}

function signIn() {
  var user = getElement("user").value.toString();
  var password = getElement("password").value.toString();
  window.location.href("Controllers/Pessoa/GetPessoa.php?usuario=" + user + "&senha=" + password);
}