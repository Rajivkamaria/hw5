// Goal: Implement a weather application using data from an external API
// - Signup for an api key @ https://weatherapi.com
// - The API takes three inputs (querystring parameters)
//   - key = your API key
//   - q = a location query (e.g. Chicago)
//   - days = number of days of forecast data to return, between 1-10
// - Example: https://api.weatherapi.com/v1/forecast.json?key=YOUR-API-KEY&q=Chicago&days=3
// - The basic recipe (algorithm) is included; write the rest of the recipe in the comments!
// - Lab: Follow the provided recipe and the "mock-up" provided in the hard-coded HTML; respond 
//        to the user filling out the location on the form by fetching the weather API and 
//        displaying the city/state, e.g. if the user enters "chicago" on the form, show "Current
//        Weather for Chicago, Illinois".
// - Homework: Complete the application by accepting a number of days; show the current weather 
//             conditions and forecast based on the number of days entered by the user.

window.addEventListener('DOMContentLoaded', async function() {
  
  // Get a reference to the "get weather" button
  let weatherButton = document.querySelector(`.get-weather`)

  // When the "get weather" button is clicked:
  weatherButton.addEventListener(`click`, async function(event){

    // - Ignore the default behavior of the button
    event.preventDefault()
    
    // - Get a reference to the element containing the user-entered location and days
    let location = document.querySelector(`#location`)
    let days = document.querySelector(`#days`)
    
    // - Get the user-entered location and days from the elements' value
    let locationDetail = location.value
    let dayDetail = days.value
    
    // - Check to see if the user entered values in both fields; if so:
    if (locationDetail.length>0 && dayDetail.length>0) {
      
      // - Construct a URL to call the WeatherAPI.com API based on the values
      let url = `https://api.weatherapi.com/v1/forecast.json?key=663b1ce3b2e54644b16153852212704&q=${locationDetail}&days=${dayDetail}`
      
      // - Fetch the url, wait for a response, store the response in memory
      let response = await fetch(url)
      
      // - Ask for the json-formatted data from the response, wait for the data, store it in memory
      let json = await response.json()
      
      // - Write the json-formatted data to the JavaScript console
      console.log(json)
      
      // - Store the interpreted location, current weather conditions, the forecast as three separate variables
      let locationData = json.location
      let weatherCurrent = json.current
      let weatherForecast = json.forecast
      
      // Select the 'current' div and insert information related to the location, weather, icon, and days requested for forecast
      let currentHeading = document.querySelector(`.current`)
      
      // This will modify the inner contents of that current div
      currentHeading.innerHTML = `
        <div class="text-center space-y-2">
          <div class="font-bold text-3xl">Current Weather for ${locationData.name}, ${locationData.region}</div>
          <div class="font-bold">
            <img src="https:${weatherCurrent.condition.icon}" class="inline-block">
            <span class="temperature">${weatherCurrent.feelslike_f}</span>° 
            and
            <span class="conditions">${weatherCurrent.condition.text}</span>
          </div>
          <div class="font-bold text-3xl">${dayDetail} Day Forecast</div>
        </div>
      `

      // Go into a loop that will loop for the number of days which were entered by the user
      for (let i=0;i<dayDetail;i++){
      let forecastDetail = document.querySelector(`.forecast`)
      let weatherLoop = weatherForecast.forecastday[i]
      
      // Insert the appropriate HTML which represents what the user entered for # of days
      forecastDetail.insertAdjacentHTML(`beforeend`,`<div class="text-center space-y-8">
      <div>
        <img src="https:${weatherLoop.day.condition.icon}" class="mx-auto">
        <h1 class="text-2xl text-bold text-gray-500">${weatherLoop.date}</h1>
        <h2 class="text-xl">High ${weatherLoop.day.maxtemp_f}°F – Low ${weatherLoop.day.mintemp_f}°F</h2>
        <h2 class="text-xl">High ${weatherLoop.day.maxtemp_c}°C – Low ${weatherLoop.day.mintemp_c}°C</h2>
        <p class="text-gray-500">${weatherLoop.day.condition.text}</h1>
      </div>`)}
}})})