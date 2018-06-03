var observableModule = require("data/observable");
var frame = require("ui/frame");
var webViewModule = require("ui/web-view");
var xmlModule = require("tns-core-modules/xml");
var actionBarModule = require("ui/action-bar");
var pageModule = require("ui/page");
var stackLayoutModule = require("ui/layouts/stack-layout");
var rssFeedLoader = require("../services/rss-services");

function MainViewModel() {
  var viewModel = observableModule.fromObject({
    feeds:[],
    onItemTap: function (args) {
      let url = args.view.url;
      console.log('Item with index: ' + args.index + ' tapped');
      frame.topmost().navigate({
        context: { url: url },
        create: generateWebRenderingPage,
        transition: {
          name: "slide",
          duration: 250,
          curve: "easeIn"
        }
      });
    }

  });

  var loader = new rssFeedLoader();
  loader.loadData(viewModel); 
  return viewModel;
}

module.exports = MainViewModel;

function generateWebRenderingPage() {

  var webView = new webViewModule.WebView();
  webView.src = this.context.url;

  var stackLayout = new stackLayoutModule.StackLayout();
  stackLayout.addChild(webView);

  var navigationBtn = new actionBarModule.NavigationButton();
  navigationBtn.on('tap',function () {
    frame.topmost().goBack();
  });
  navigationBtn.android.systemIcon="ic_menu_back";
  navigationBtn.text="back";

  var actionBar = new actionBarModule.ActionBar();
  actionBar.navigationButton =navigationBtn;

  var page = new pageModule.Page();
  page.content = stackLayout;
  page.actionBar = actionBar;
 
  return page;
}

