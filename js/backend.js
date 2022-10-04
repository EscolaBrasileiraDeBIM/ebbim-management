function signIn() {
  var user = document.getElementById("user").value.toString();
  var password = document.getElementById("password").value.toString();
  alert(user + " " + password);
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
}