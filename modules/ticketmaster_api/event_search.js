const { tmasterapikey } = require('../../config.json');
const axios = require('axios');

const ticketmast_root_url = "https://app.ticketmaster.com/discovery/v2/";


//ticketmaster API calls
function ticketmast_test(city = ""){

/*
  Filters needed:
  city - String
  classificationName - Array, ie: sports
  classificationId - Array, id for name
  the following refer to event beginnings, they act as <> since the array function seems broken.
  startDateTime - String
  endDateTime - String
*/

  var event_search_url = ticketmast_root_url;
  if (city == ""){
    event_search_url += "events.json?"+"apikey="+tmasterapikey+"&size=2&city=Boston&localStartDateTime=2023-08-25T23:10:00Z";
  }
  else{
    event_search_url += "events.json?"+"apikey="+tmasterapikey+"&size=1&city="+city;
  }
  
  var level_one;

  // Make a request for a user with a given ID
return axios.get(event_search_url)
  .then(function (response) {
    // handle success
    level_one = response.data._embedded.events;
    var dates = level_one[0].dates;
    var classifications = level_one[0].classifications;
    var level_two = level_one[0]._embedded;
    var event_name = level_one[0].name;
     console.log("Ticket master responded");

    //console.log(level_one);
    //console.log(classifications);
    //console.log(dates);
    //console.log(level_two);

     //format data here
    
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
    console.log("done with ticketmaster call")
     return level_one;
  });



}

module.exports= {
  search_events : ticketmast_test,
}