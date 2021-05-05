// Goal: Implement a weather appl using data from an ext API
// - Signup for an api @ https://weatherapi.com
// - API takes 3 inputs (querystring parameters)
//   - key = API key
//   - q = location query (e.g. NYC)
//   - days = # days data to return - 1-10
// - https://api.weatherapi.com/v1/forecast.json?key=YOUR-API-KEY&q=Chicago&days=3
// - Lab: Follow provided recipe and "mock-up" provided in HTML; 
// respond to the user filling out the location on the form by fetching the weather API and 
//        displaying the city/state, e.g. if the user enters "chicago" on the form, show "Current
//        Weather for Chicago, Illinois".
// - Homework: Complete the application by accepting a number of days; show the current weather 
//             conditions and forecast based on the number of days entered by the user.

window.addEventListener('DOMContentLoaded', async function() {
  
    // Select "get weather" button
    let weatherButton = document.querySelector(`.get-weather`)
  
    // Then do something when clicked:
    weatherButton.addEventListener(`click`, async function(event){
  
      // - Kill the function
      event.preventDefault()
      
      // - Select location and days
      let location = document.querySelector(`#location`)
      let days = document.querySelector(`#days`)
      
      // - Grab their values
      let locationDetes = location.value
      let dayDetes = days.value
      
      // - If value entered, then...
      if (locationDetes.length>0 && dayDetes.length>0) {
        
        // - Make URL for WeatherAPI.com API, based on the values
        let url = `https://api.weatherapi.com/v1/forecast.json?key=663b1ce3b2e54644b16153852212704&q=${locationDetes}&days=${dayDetes}`
        
        // - Get the url, wait for response
        let response = await fetch(url)
        
        // - Ask for the json-formatted data, wait for it
        let json = await response.json()
        console.log(json)
        
        // - Store  location, current weather, forecast
        let location.data = json.location
        let weather.current = json.current
        let weather.forecast = json.forecast
        
        // Select 'current' 
        let Heading = document.querySelector(`.current`)
        
        // Edit elements within
        Heading.innerHTML = `
          <div class="text-center space-y-2">
            <div class="font-bold text-3xl">Current Weather for ${location.data.name}, ${location.data.region}</div>
            <div class="font-bold">
              <img src="https:${weather.current.condition.icon}" class="inline-block">
              <span class="temperature">${weather.current.feelslike_f}</span>° 
              and
              <span class="conditions">${weather.current.condition.text}</span>
            </div>
            <div class="font-bold text-3xl">${dayDetes} Day Forecast</div>
          </div>
        `
          // Loop through number of days entered by user
        for (let i=0;i<dayDetes;i++){
        let forecast.detes = document.querySelector(`.forecast`)
        let weather.loop = weather.forecast.forecastday[i]
        
        // Insert appropriate HTML for # of days user entereds
        forecastdetes.insertAdjacentHTML(`beforeend`,`<div class="text-center space-y-8">
        <div>
          <img src="https:${weather.loop.day.condition.icon}" class="mx-auto">
          <h1 class="text-2xl text-bold text-gray-500">${weather.loop.date}</h1>
          <h2 class="text-xl">High ${weather.loop.day.maxtemp_f}°F – Low ${weather.loop.day.mintemp_f}°F</h2>
          <h2 class="text-xl">High ${weather.loop.day.maxtemp_c}°C – Low ${weatherloop.day.mintemp_c}°C</h2>
          <p class="text-gray-500">${weather.loop.day.condition.text}</h1>
        </div>`)}
  }})})