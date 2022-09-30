function getElement(id) {
  return document.getElementById(id);
}

function signIn() {
  var login = getElement("user").value.toString();
  var password = getElement("password").value.toString();
  window.location.href("Controllers/Login/Login.php?login=" + login + "&senha=" + password);
}