$(document).ready(function(){
	$('#submit').click(search);
	$('#city').keydown(function(e) {
  		if(e.which == 13) {
			search();
  		}
});	

var days = ["SUN","MON","TUE","WED","THU","FRI","SAT","SUN","MON","TUE","WED","THU","FRI","SAT"];
var date = new Date();
var day = date.getDay();

//Search City
function search() {
	searchCity = $('#city').val();
	//Keep the CSS in check
	$('#day tr, #temperature tr, #weatherIcon tr').empty();
	getWeatherData(searchCity);
}

//Get URL params using jQuery
var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

//Get requested forecast data
function getWeatherData(city) {
		//Get data for 7 day forecast
		$.get('http://api.openweathermap.org/data/2.5/forecast/daily?appid=7442bb3b7ed17730ac15ba1322ff7c79&q=' + city + '&units=metric')
			.done(function(weeklyData) {
				var avgPressure = 0;
				var sumPressure = 0;
				//The URL prefix for fetching the weather icons
				var iconURL = "http://openweathermap.org/img/w/";

				for (i = 0; i < 7; i++) {
					var dailyMin = weeklyData.list[i].temp.min;
					//Round up to the nearest digit
					var calDailyMin = Math.round( dailyMin * 10 ) / 10;

					var dailyMax = weeklyData.list[i].temp.max;
					//Round up to the nearest digit
					var calDailyMax = Math.round( dailyMax * 10 ) / 10;

					//Icon number
					var icon = weeklyData.list[i].weather[0].icon;

					//Sum up the pressure for 7 days and calculate the avg
					var sumPressure = sumPressure + weeklyData.list[i].pressure;
					calAvgPressure = (sumPressure/7);

					//Round up the avg pressure to the second digit
					avgPressure = Math.ceil(calAvgPressure * 10) / 10;
					
					//Popluate weekly forecast
					$("#day tr").append(
						"<td class=\"days\">" + days[day + i] + "</td>"
					);
					$("#temperature tr").append("<td class=\"forecastTemps\">" + calDailyMin +" ~ "+ calDailyMax +" c"+ "</td>");														   
					$("#weatherIcon tr").append("<td class=\"icons\">"+"<img src=" + iconURL + icon +".png></td>");
				}
				document.getElementById("avgPressure").innerHTML = "The average pressure for the next 7 day (including today) in " + city + " is" + " " + avgPressure;
			})
}
	if($('#city').length>0){
		var searchCity = getUrlParameter('city');
	}
	else{
		alert("Please enter a valid city");
	}
	
})