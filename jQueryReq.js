$(document).ready(function () {
  var spreadsheetID = "188g1nCkGeexKQJ1IFxJLs8bEGszqQwqotOHV0CW9uys/1";
  var spreadsheetURL = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/public/values?alt=json";
  var template = Handlebars.compile($("#post-template").html());

  console.log(spreadsheetURL)

  $.getJSON(spreadsheetURL, function(data) {
    for(entry of data.feed.entry){
      var context = {};
      context.title = entry.gsx$title.$t;
      context.content = "<p>" + entry.gsx$content.$t + "</p>";
      console.log(context)
      var temp = template(context);
      console.log(temp);
      $("#bloggrid").append(temp);
    }
  })

})
