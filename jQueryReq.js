$(document).ready(function () {
  var spreadsheetID = "188g1nCkGeexKQJ1IFxJLs8bEGszqQwqotOHV0CW9uys/1";
  var spreadsheetURL = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/public/values?alt=json";
  var template = Handlebars.compile($("#post-template").html());

  console.log(spreadsheetURL)

  function generateTimestamp(time) {
    var strarray = time.split(/[/:\s]/);
    console.log(strarray);
    var mon = {"01":"January", "02":"Feburary", "03":"March", "04":"April",
      "05":"May", "06":"June", "07":"July", "08":"August",
      "09":"September", "10":"October", "11":"November", "12":"December"};
    strarray[1] = mon[strarray[1]];
    strarray[0] = parseInt(strarray[0]);
    strarray[5] = (parseInt(strarray[3]) / 12 > 1)?"PM": "AM";
    strarray[3] = parseInt(strarray[3])%12;
    return strarray[1] + " " + strarray[0] + " at " + strarray[3] + ":" + strarray[4] + " " + strarray[5];
  }

  $.getJSON(spreadsheetURL, function(data) {
    for(entry of data.feed.entry){
      var context = {};
      context.title = entry.gsx$title.$t;
      context.content = "<p>" + entry.gsx$content.$t + "</p>";
      context.timestamp = generateTimestamp(entry.gsx$timestamp.$t)
      console.log(context)
      var temp = template(context);
      console.log(temp);
      $("#insertionpoint").prepend(temp);
    }
  })

})
