const { tmasterapikey } = require('./config.json');
const axios = require('axios');

const ticketmast_root_url = "https://app.ticketmaster.com/discovery/v2/";

//ticketmaster API calls
function ticketmast_test(){
  // Make a request for a user with a given ID
axios.get(ticketmast_root_url+"events.json?"+"apikey="+tmasterapikey+"&size=1")
  .then(function (response) {
    // handle success
     console.log("response");
    console.log(response.data._embedded);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
    console.log("done with ticketmaster call")
  });
}