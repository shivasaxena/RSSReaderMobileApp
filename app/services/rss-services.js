var httpModule = require('http');
var parseString = require('nativescript-xml2js').parseString;

function RSSFeadLoader() {
    var feeds = [];
    this.loadData = function (context) {

        httpModule.getString("https://opensourceforu.com/feed").then((r) => {
            parseString(r, function (err, result) {
                feeds = result.rss.channel[0].item;
                context.feeds = feeds;
                return feeds;
            });
        }, (e) => {
            console.log("Error loading RSS Feed");
        });
    }
}

module.exports = RSSFeadLoader;