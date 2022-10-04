function signIn() {
  var user = document.getElementById("user").value.toString();
  var password = document.getElementById("password").value.toString();
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "https://sistema.ebbim.com.br/ebbim-api/Controllers/Login/Login.php", true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  data = JSON.parse('{"login":"' + user +'", "senha":"' + password +'"}');
  xhr.send(data);
}