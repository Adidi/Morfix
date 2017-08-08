
let div = document.getElementById('morfixExtensionPopup');
if(!div){
    div = document.createElement("div");
    div.id = 'morfixExtensionPopup';
    document.body.appendChild(div);
}
let timeoutid;
document.addEventListener('click', function(){

    chrome.storage.sync.get('adiel', data => {
        console.log(data);
    });
    // xhttp('get', 'http://www.axonize.com', null, function(data){
    //     console.log(data);
    // })



    var selection = window.getSelection().toString();

    if(selection){
        div.innerText = selection;
        div.classList.add('open');

        if(timeoutid){
            clearTimeout(timeoutid);
        }

        timeoutid = setTimeout(() => {
            timeoutid = null;
            div.classList.remove('open');
            div.innerText = '';
        },2000);
    }
},false);

function xhttp(method, url, data, callback ){
    var xhttp = new XMLHttpRequest();
    var method = method ? method.toUpperCase() : 'GET';

    xhttp.onload = function() {
        callback(xhttp.responseText);
    };
    xhttp.onerror = function() {
        // Do whatever you want on error. Don't forget to invoke the
        // callback to clean up the communication port.
        callback(null);
    };
    xhttp.open(method, url, true);
    if (method.toUpperCase() === 'POST') {
        xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    }
    xhttp.send(data);
    return true; // prevents the callback from being called too early on return
}