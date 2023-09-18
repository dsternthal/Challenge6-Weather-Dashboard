var apiKey = "43307f36c133c1b4d80feb3644b2ab3e"
var titleEl = document.getElementById("title")
var tempEl = document.getElementById("temp")
var windEl = document.getElementById("wind")
var humidityEl = document.getElementById("humidity")
var searchBtn = document.getElementById("search-btn")
var cityInput = document.getElementById("city-input")
var fivedayForecastEl=document.getElementById("fiveday-forecast")



  function searchCity(){
    var cityName = cityInput.value

    displayWeather(cityName)
  }

  function displayWeather(cityName){
    var url="https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid="+apiKey+"&units=imperial"

    fetch(url)
    .then(function(response){
        return response.json()
    })
    .then(function(currentData){
        console.log(currentData)
        titleEl.innerHTML=currentData.name + dayjs.unix(currentData.dt).format(" (MM/DD/YYYY)") + "<img src'https://openweathermap.org/img/wn/"+currentData.weather[0].icon+"@2x.png'>"
        
        tempEl.innerHTML="Temp: "+currentData.main.temp + " F"
        windEl.innerHTML="Wind: "+currentData.wind.speed+" MPH"
        humidityEl.innerHTML="Humidity: "+currentData.main.humidity+"%"

    })

    var forecastUrl="https://api.openweathermap.org/data/2.5/forecast?q="+cityName+"&appid="+apiKey+"&units=imperial"

    fetch(forecastUrl)
    .then(function(response){
        return response.json()
    })
    .then(function(forecastData){
        console.log(forecastData)
        //grab 12:00PM each day for 5 days
        var forecastArr=forecastData.list
        for (let i = 3, j=1; i < forecastArr.length; i=i+8, j++) {
            console.log(forecastArr[i])
            var cardTitle=document.getElementById("card-title"+j)
            cardTitle.textContent=dayjs.unix(forecastArr[i].dt).format(" (MM/DD/YYYY)")
            var temp = document.getElementById("temp"+j)
            temp.textContent="Temp: "+forecastArr[i].main.temp

            var wind = document.getElementById("wind"+j)
            wind.textContent="Wind: "+forecastArr[i].wind.speed+" MPH"

            var humidity = document.getElementById("humidity"+j)
            humidity.textContent="Humidity: "+ forecastArr[i].main.humidity + "%"

            var icon = document.getElementById("icon"+j).src=`https://openweathermap.org/img/wn/${forecastArr[i].weather.icon}@2x.png`
        }
    })
  }

  searchBtn.addEventListener("click", searchCity)