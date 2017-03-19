SitePointPostOptions = {


};
SitePointPostOptions.properties = {};
SitePointPostOptions.properties.areCodeBlocksShown = false;

SitePointPostOptions.run = function(type, options) {

    SitePointPostOptions[type].call(this, options);

}



SitePointPostOptions.speakPost = function() {
    //TODO: speak post
    var postContents = $(app.properties.pageContents[0]).find(".ArticleCopy").find("p,h1,h2,h3,h4,h5,h6");
    if (!postContents.length) {
        alert("There is probably no post open to speak aloud.");
    }
    postContents = postContents.text();
    SitePointPostOptions.speakText(postContents);
}

SitePointPostOptions.stopSpeaking = function() {
    navigator.tts.stop(function() { /*success callback*/ }, function() { /*err callback*/ });
    navigator.tts.interrupt("", function() { /*success callback*/ }, function() { /*err callback*/ });


    navigator.tts.shutdown(function() {
        /*successfully shut down tts*/

    }, function() { /*err*/ })


}

SitePointPostOptions.viewCodeBlocks = function() {
    //TODO: filter only code blocks;
    if (SitePointPostOptions.properties.areCodeBlocksShown) {
        app.properties.ref.insertCSS({
            code: ".ArticleCopy > *:not(pre) { display:block !important;}"
        })
        SitePointPostOptions.properties.areCodeBlocksShown = false;
        return;
    }
    app.properties.ref.insertCSS({
        code: ".ArticleCopy > *:not(pre) { display:none !important;}"
    })
    SitePointPostOptions.properties.areCodeBlocksShown = true;
}

SitePointPostOptions.speakTitles = function() {
    //TODO: Speak only the tiles of the pages
    var titlesContents = $(app.properties.pageContents[0]).find("h1,h2,h3,h4,h5,h6");
    if (!titlesContents.length) {
        alert("There is probably no title out there to speak aloud!");
    }
    titlesContents = titlesContents.text();
    SitePointPostOptions.speakText(titlesContents);
}

SitePointPostOptions.randomArticle = function() {
    //TODO: show a random article

    var articles = $(app.properties.pageContents[0]).find(".article .article_title a");
    if (!articles.length) {
        alert("You are probably not on a SitePoint page with a list of articles!");
    }
    var randomIndex = Math.floor(Math.random() * articles.length);
    var linkToFollow = articles[randomIndex].getAttribute("href");
    app.properties.ref.addEventListener("exit", function() {
        setTimeout(function() {
            app.properties.ref = null;
            app.openPage(linkToFollow);
        }, 2000)

    })
    app.properties.ref.close();
}
  SitePointPostOptions.logoClick = function() {
    cordova.ThemeableBrowser.open("http://sitepoint.com", "_system");
  }

SitePointPostOptions.speakText = function(text) {
    var speechProgress = 0;
    navigator.tts.startup(startSpeech, function() {
        alert("We cannot speak the post aloud right now.")
    });

    function startSpeech(result) {

        if (result == 2 || result == 1) {
            navigator.tts.getLanguage(function() {}, function() {});

            speechPartOfText();

        }
    }

    function speechPartOfText() {
      var slice = text.slice(speechProgress, speechProgress + 100);
      if (speechProgress > text.length) {
        return;
      }
          navigator.tts.speak(slice, function() {
              speechProgress+=100;
              speechPartOfText();
          });
    }
}
