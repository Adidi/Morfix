
document.addEventListener('DOMContentLoaded', function(){
    var btn = document.getElementById('btn');

    btn.addEventListener('click', function(){
        chrome.storage.sync.get('history', data => {
            alert(JSON.stringify(data));
        });

        xhttp('get', 'http://www.axonize.com', null, function(data){
            document.getElementById('d').innerHTML = data;
        })

    });
}, false);

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