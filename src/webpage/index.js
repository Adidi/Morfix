
let div = document.getElementById('morfixExtensionPopup');
if(!div){
    div = document.createElement("div");
    div.id = 'morfixExtensionPopup';
    document.body.appendChild(div);
}
let timeoutid;
document.addEventListener('click', function(){
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