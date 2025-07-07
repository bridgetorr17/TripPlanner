This project was used for MVC backend practice - ZERO FRONT END WORK! (almost, lol). The idea is to be able to make trips and share them with friends, who can also edit the trip. 
Users can make accounts, login with authentication, make trips, add friends to those trips, and view both shared and single trips. 
Additionally, there is an "AI feature" that will consider the current route of your trip and insert a suggestion. Gemini-2.5-flash API was used for this. 

I used node.js as the javascript backend runtime environment, and leveraged router and controller files to organize the API request. 

Mongoose Schema are used for the database modeling, which includes a Users, Trips, and Sessions. 

Finally, ejs was used for the dynamic views. I want to change this to react in the future. 
