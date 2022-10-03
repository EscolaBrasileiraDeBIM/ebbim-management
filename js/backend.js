function getElement(id) {
  return document.getElementById(id);
}

function signIn() {
  var user = getElement("user").value.toString();
  var password = getElement("password").value.toString();
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "https://sistema.ebbim.com.br/ebbim-api/Controllers/Login/Login.php", true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        var res = JSON.parse(xhr.response);
        console.log(res);
    }
};
  xhr.send(JSON.stringify({
      login: user,
      senha: password
  }));

  //window.location.href("Controllers/Login/Login.php?login=" + login + "&senha=" + password);
}