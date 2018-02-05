/*
function attachLinks(messageView) {
  var url = 'https://mail.google.com/mail/#all/' + messageView.getMessageID();
  // TODO: or https://mail.google.com/mail/h/ouilk5cfmn2l/?th=MESSAGE_ID&v=c ?
  var threadView = messageView.getThreadView();
  attachThreadLink(threadView);
}
*/

function getUserSuffix(url) {
  var res = /^https\:\/\/inbox\.google\.com\/(u\/\d\/)/.exec(url);
  return res ? res[1] : '';
}

function attachThreadLink(threadView) {
  threadView.getThreadIDAsync().then(function(threadId) {
    console.log('[google-inbox-permalinks] getThreadIDAsync => ', arguments);
    if (!threadId) return;
    var userSuffix = getUserSuffix(window.location.href);
    var link = document.createElement('a');
    link.href = 'https://mail.google.com/mail/' + userSuffix + '#all/' + threadId;
    link.target = '_blank';
    link.appendChild(document.createTextNode('Permalink'));
    // note: threadView.getSubject() contains junk in the French version of Google Inbox
    var div = document.createElement('div');
    //div.style = 'text-align: center;';
    div.appendChild(link);
    threadView.addSidebarContentPanel({
      el: div,
      title: 'Permalinks',
      iconUrl: chrome.extension.getURL('link.png'),
    });
  }).catch(function() {
    console.log('[google-inbox-permalinks] getThreadIDAsync => error:', arguments);
  });
}

InboxSDK.load('2', 'sdk_inbox-permalink_77495e9cd5').then(function(sdk){
  //sdk.Conversations.registerMessageViewHandler(attachLinks);
  sdk.Conversations.registerThreadViewHandler(attachThreadLink);
});
