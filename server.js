// Import packages 
const axios = require("axios");
const express = require('express');
const path = require('path');

const app = express();

async function makeRequest(randomId) {
  // Configure request
  const config = {
    method: "get", // request method (get, post, ...)
    url: `https://pokeapi.co/api/v2/pokemon/${randomId}`, // API link
  };
  const response = await axios(config);
  return response.data;
}

  // To connect with view engine page
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));

app.get("/", async (request, response) => {
  let  data = []; // To store responsed data.

/* 
Send random ids to function and
Store it in array for display in view page
*/
  for (let i = 0; i < 3; i++) { 
    let randomId = Math.floor((Math.random() * 100) + 1);
     data[i] = makeRequest(randomId);
  }

   data = await Promise.all( data); 
   // Send multiple requests in parallel using Promise.all
   // Promise.all() waits for all the requests to complete, and
   // returns an array of resolved data in the same order as the promises passed to it.

response.render("index", {
    title: "Pokemon API",
    pokemon: [
      {
        name:  data[0].name,
        order:  data[0].order,
      },
      {
        name:  data[1].name,
        order:  data[1].order,
      },
      {
        name:  data[2].name,
        order:  data[2].order,
      },
    ],
  });
});


app.listen(3000, () => {
  console.log("Server started on port 3000");
  console.log("http://localhost:3000");
});
