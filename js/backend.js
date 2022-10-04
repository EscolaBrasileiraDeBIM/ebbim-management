function signIn() {
  var user = document.getElementById("user").value.toString();
  var password = document.getElementById("password").value.toString();
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "../../ebbim-api/Controllers/Login/Login.php", true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onreadystatechange = function () {
    if (xhr.readyState == "4") //Request finished and response is ready
    {
        if (xhr.status == "200") {
            alert("Success");
            document.write(xhr.responseText);
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