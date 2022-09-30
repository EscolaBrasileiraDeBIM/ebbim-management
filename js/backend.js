function getElement(id) {
  return document.getElementById(id);
}

function signIn() {
  var user = getElement("user").value.toString();
  var password = getElement("password").value.toString();
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "Controllers/Login/Login.php", true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({
      login: user,
      senha: password
  }));

  //window.location.href("Controllers/Login/Login.php?login=" + login + "&senha=" + password);
}