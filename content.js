function attachLinks(messageView) {
	var url = 'https://mail.google.com/mail/#all/' + messageView.getMessageID();
	// TODO: or https://mail.google.com/mail/h/ouilk5cfmn2l/?th=MESSAGE_ID&v=c ?
	var threadView = messageView.getThreadView();
	var div = document.createElement('div');
	var link = document.createElement('a');
	link.href = url;
	link.target = '_blank';
	link.innerHTML = 'Permalink to this email';
  div.style = 'text-align: center;';
	div.appendChild(link);
	var res = threadView.addSidebarContentPanel({
		el: div,
		title: 'Permalink: ' + url,
		iconUrl: chrome.extension.getURL('link.png'),
	});
}

InboxSDK.load('2', 'sdk_inbox-permalink_77495e9cd5').then(function(sdk){
	sdk.Conversations.registerMessageViewHandler(attachLinks);
});
