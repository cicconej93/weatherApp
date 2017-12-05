var local = document.getElementById("location");
var fah = document.getElementsByClassName("fah");
var cel = document.getElementsByClassName("cel");
var weatherIc = document.getElementById("icon");
var temp = document.getElementById("temp");
var amer = true;


if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
  	var lat = parseInt(position.coords.latitude);
  	var lon = parseInt(position.coords.longitude); 

    var json = new XMLHttpRequest();
    var goog = new XMLHttpRequest();

    json.open('GET', 'http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&APPID=7fad087f3c986ea53258a2ba356545ba');
    goog.open('GET', 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+lon+'&key=AIzaSyBbtt9EOwyUinuWUCcdqI6GSlJri1SFngQ');

    json.onload = function(){
    	var data = JSON.parse(json.responseText);
    	var googData = JSON.parse(goog.responseText);
    	var iconNum = data.weather[0].id;
    	console.log(iconNum);
    	var tempNum = data.main.temp * (9/5) - 459.67 | 0;
    	
    	console.log(data);

    	displayWeather(iconNum, tempNum);
    };

    goog.onload = function(){
    	var googData = JSON.parse(goog.responseText);
    	var loc = googData.results[1].formatted_address;
    	displayLocal(loc);
    }
   
    
    goog.send();
    json.send();
    
  });



}


function convert(){
	if(amer){
		temp.innerText = (temp.innerText - 32) * 5/9 | 0;
		temp.innerHTML = temp.innerText + '<i class="wi wi-celsius"></i>';
		amer = false;
		cel[0].style.opacity = 0;
		fah[0].style.opacity = 1;
	} else {
		temp.innerText = temp.innerText * 9/5 + 32| 0;
		temp.innerHTML = temp.innerText + '<i class="wi wi-fahrenheit"></i>';
		amer = true;
		cel[0].style.opacity = 1;
		fah[0].style.opacity = 0;
	}
}





function displayWeather(ic, te){
	
	weatherIc.innerHTML = '<i class="wi wi-owm-' + ic + '"></i>';
	temp.innerHTML = te + '<i class="wi wi-fahrenheit"></i>';
	cel[0].innerHTML = '<i class="wi wi-celsius" onclick="convert()">';
	
}

function displayLocal(loc){
	local.innerHTML = loc;
}