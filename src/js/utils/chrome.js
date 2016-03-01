
export default {
  openTab(url, active = true){
    if(url){
      chrome.tabs.create({url: url,active: active});
    }
  },

  executeScript(code){
    return new Promise((resolve,reject) => {
      chrome.tabs.executeScript({code: code},result => resolve(result) );
    });
  }
}

