/*
var text = '{"name":"John Johnson","street":"Oslo West 16","phone":"555 1234567"}'

var obj = JSON.parse(text);


console.log(obj.name);
console.log(obj.street);
console.log(obj.phone);
*/
var XMLHttpRequest = require('w3c-xmlhttprequest').XMLHttpRequest;
var xmlhttp = new XMLHttpRequest();
var url = "test.json";

xmlhttp.onreadystatechange = function() {
if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
    var myArr = JSON.parse(xmlhttp.responseText);
    myFunction(myArr);
    }
}

xmlhttp.open("GET", url, true);
xmlhttp.send();
