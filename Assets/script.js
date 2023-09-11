var apiKey = "43307f36c133c1b4d80feb3644b2ab3e"
var titleEl = document.getElementById("title")
var tempEl = document.getElementById("temp")
var windEl = document.getElementById("wind")
var humidityEl = document.getElementById("humidity")
var searchBtn = document.getElementById("search-btn")
var cityInput = document.getElementById("city-input")



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
        titleEl.innerHTML=currentData.name+dayjs.unix(currentData.dt).format("MM/DD/YYYY")
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
        for (let i = 3; i < forecastArr.length; i=i+8) {
            console.log(forecastArr[i])
        }
    })
  }

  searchBtn.addEventListener("click", searchCity)