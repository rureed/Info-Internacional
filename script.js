$('.carousel').carousel();
 


$(window).on( "load", function() {
 
});

$("#search").on("click", function(event){
  event.preventDefault();

  var country = $("#countryInput").val().trim().toLowerCase();
  if (country) {
        $("#countryInput").val("");
    } 
    getCountryInfo(country);
}) 

function getCountryInfo(country){
  var settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://restcountries-v1.p.rapidapi.com/all",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "restcountries-v1.p.rapidapi.com",
		"x-rapidapi-key": "52dbb116femsh414adea3d2d39b0p1baee8jsn399515d8751e"
	}
}
$.ajax(settings).done(function (response) {
  
  //console.log(response);
    for (var i = 0; i < response.length; i++) {
      var countryMatch = (response[i].name).toLowerCase();

      if (country === countryMatch){
        var capital = response[i].capital;
        var timezone = response[i].timezones[0];


        //call weather API and picture API with capital
        //call timezone function with timezone
      }
    }
    getPictures(capital);
    getWeather(capital);
    showTimezone(timezone);

});
  
  
  //getForecast(capital);
 
}

//searched for picture based on the capital
function getPictures(capital){
    var queryURL = "https://api.unsplash.com/search/photos?query=" + capital + "&per_page=20&client_id=tLFvPdAvAFpRTR2LhyEwk38gT8ALPvluLPQTUjttXfc"

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response){
      //console.log(response);
      
      var picList = response.results;
      
      showPictures(picList);
    })
}

//shows pictures in a carousel
function showPictures(picList){
 // console.log(picList);
  var count = 1;
  for (var i = 0; i < 20; i++){
    var picWidth = picList[i].width;
    var picHeight = picList[i].height;
    if(picWidth > picHeight){
      var picURL = picList[i].urls.regular;
      $("#pic-" + count).attr("src", picURL );
      count++;
    }
  }
}

//openweathermap API 

  function getWeather(capital) { 
    $("#errorMadeArea").hide();   
    var currentQueryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + capital + "&APPID=62fca606199df2afea0a32e25faffdc5";

    $.ajax({
        url: currentQueryURL,
        method: "GET"
    }).then(function(response){
      console.log(response);
       showWeather(response);
       
        
    }).catch(function(){
        $("#errorMadeArea").show();
    });
}
$("#errorMadeArea").hide();   

  


function showWeather(response){
    //Setting all the main current weather
    //console.log(response);
    $("#capitalCity").text(response.name)
    var currentDate = moment().format("MM/DD/YY"); 
    $("#date").text("(" + currentDate + ")");
    var icon = response.weather[0].icon;
    var iconURL = "http://openweathermap.org/img/w/" + icon + ".png";
    $("#mainIcon").attr("src", iconURL);
    var mainTemp = ((response.main.temp - 273.15) * 1.80 + 32).toFixed(0); 
    $("#temp").text(mainTemp);   
}


function getForecast(){

  showForecast();
}

function showForecast(){

}

function showTimezone(timezone){
  var timezone = timezone.split("");
  timezone.splice(0,3);
  timezone.splice(3,3);
 
 
  
  console.log(timezone);
  


  var currentTime = moment().format('LTS');
  $("#currentTimeZone").text(currentTime);
  
  //console.log(currentTime);
  
} 

function showDateTime (){
  $("#dateTime").text(moment().format('MMMM Do YYYY, h:mm:ss a'));
}
showDateTime();

 