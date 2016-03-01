

function onClickHandler(info, tab) {
  var url = 'http://www.morfix.co.il/' + info.selectionText;
  chrome.tabs.create({url: url,active: true});
}

chrome.contextMenus.onClicked.addListener(onClickHandler);

chrome.contextMenus.create({
  id: 'morfixSearch',
  title: 'Translate "%s"',
  contexts:['selection']
});
