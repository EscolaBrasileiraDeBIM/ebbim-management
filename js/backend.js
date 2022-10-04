function signIn() {
  var user = document.getElementById("user").value.toString();
  var password = document.getElementById("password").value.toString();
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "https://sistema.ebbim.com.br/ebbim-api/Controllers/Login/Login.php", true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onreadystatechange = function () {
    if (request.readyState == "4") //Request finished and response is ready
    {
        if (request.status == "200") {
            alert("Success");
            document.write(request.responseText);
        }
        else {
            alert("Problem retrieving data");
            console.log(this.responseXML);
        }
    }
};
  xhr.send(JSON.stringify({
      "login": user,
      "senha": password
  }));
}