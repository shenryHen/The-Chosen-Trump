function walk(rootNode)
{
    // Find all the text nodes in rootNode
    var walker = document.createTreeWalker(
        rootNode,
        NodeFilter.SHOW_TEXT,
        null,
        false
    ),
    node;

    // Modify each text node's value
    while (node = walker.nextNode()) {
        handleText(node);
    }
}

function handleText(textNode) {
  textNode.nodeValue = replaceText(textNode.nodeValue);
}

function replaceText(v)
{
    //Donald Tr
    v = v.replace(/\bDonald Trump\b/g, "The Chosen One");
    //v = v.replace(/\bTrump\b/g, "The Chosen One");

    // The Great Recession
    v = v.replace(/\bGreat Recession\b/g, "Time of Shedding and Cold Rocks");
    v = v.replace(/\bgreat recession\b/g, "time of shedding and cold rocks");

    return v;
}

// The callback used for the document body and title observers
function observerCallback(mutations) {
    var i;

    mutations.forEach(function(mutation) {
        for (i = 0; i < mutation.addedNodes.length; i++) {
            if (mutation.addedNodes[i].nodeType === 3) {
                // Replace the text for text nodes
                handleText(mutation.addedNodes[i]);
            } else {
                // Otherwise, find text nodes within the given node and replace text
                walk(mutation.addedNodes[i]);
            }
        }
    });
}

// Walk the doc (document) body, replace the title, and observe the body and title
function walkAndObserve(doc) {
    var docTitle = doc.getElementsByTagName('title')[0],
    observerConfig = {
        characterData: true,
        childList: true,
        subtree: true
    },
    bodyObserver, titleObserver;

    // Do the initial text replacements in the document body and title
    walk(doc.body);
    doc.title = replaceText(doc.title);

    // Observe the body so that we replace text in any added/modified nodes
    bodyObserver = new MutationObserver(observerCallback);
    bodyObserver.observe(doc.body, observerConfig);

    // Observe the title so we can handle any modifications there
    if (docTitle) {
        titleObserver = new MutationObserver(observerCallback);
        titleObserver.observe(docTitle, observerConfig);
    }
}
walkAndObserve(document);

/*function walk(rootNode){
	console.log("regular walking");
	var walker = document.createTreeWalker(
		rootNode,
		NodeFilter.SHOW_TEXT,
		null,
		false
	),

	node;

	while (node = walker.nextNode){
		console.log("has next node");
		handleText(node);
	}
}

function handleText(textNode) {
	textNode.nodeValue = replaceText(textNode.nodeValue);
	console.log(textNode.nodeValue);
}

function replaceText(v) {
	console.log("replaceTexting");
	v = v.replace(/\bTrump\b/g, "the Great American Patriot");
	v= v.replace(/\bTrump(?:(s)\b(')|s\b)/g, "The Chosen One$2$1");
 	
 	console.log(v);
 	return v;
}

function observerCallback(mutations) {
    var i;

    mutations.forEach(function(mutation) {
        for (i = 0; i < mutation.addedNodes.length; i++) {
            if (mutation.addedNodes[i].nodeType === 3) {
                // Replace the text for text nodes
                handleText(mutation.addedNodes[i]);
            } else {
                // Otherwise, find text nodes within the given node and replace text
                walk(mutation.addedNodes[i]);
            }
        }
    });
}

function walkAndObserve(doc) {
	console.log("walking and observing");
	var observerConfig = {
		characterData: true,
		childList: true,
		subtree: true
	},
	bodyObserver;

	walk(doc.body);

    bodyObserver = new MutationObserver(observerCallback);
	bodyObserver.observe(doc.body, observerConfig);

}

walkAndObserve(document);*/