# U&I Team - A Video Chat Web Application
U&I team is a virtual platform which allows two people to connect with each other. They can have video as well as chat conversations. U&I Team provides various features to make thier exchange more interactive.

[Visit Website](https://cryptic-ravine-00904.herokuapp.com "U&I Team")

[Watch Video Demo](https://youtu.be/TJxPAqfR6TI)

# Features
 **Video call:** Allow users to connect with each other face to face, giving real time experience as if sitting in the same room.

**Chat call:**  Allows to send messages and emojies giving users proficient way to explain what the feel.

**Authentication:** Users have to authenticate before starting new meeitng or chat.

**Date and Time:** Date and time on landing page of website shows current time and date and gets updated every second.

**Screen Sharing:**  Allows you to convey any information in your device with your partner at any time even from a good distance without any expenditure of energy and time with the help of screen sharing feature.

**In Meeting Recording:** Allows to record the meeting. Maling it easier to review later and never missing an important point.

**In-Meeting Chat:** this feature allows you to send any piece of text in just one click. So use in meeting chat and write what you can't speak.

**Meeting Timer:** Shows how much time in the meeting has passed. Manage your schedule perfectly without having to lose any precioys moment.

**Continue Chat after video call:** The website was added with this feature in the adapt phase which required to continue chat after the call.


# Use of Agile Methodology
I devided my project into **4 SPRINTS**. 

- _First sprint_ involved setting up basic ui structure and tackling the most required feature of project that is getting two people to connect with each other to have video conversation.
- _Second sprint_ was revolved around adding additional functionalities to video chat that are mute/unmute, camera on/off, screen sharing, video recording.
- _Third sprint_ included adding chat only functionality by creating data channels between two users to send each other chat messages.
- _Fourth and last sprint_ had extentsion of chat functionality to send mssages during and after video conversation, fixing up bugs and ui updation.


# Technology Stack
 <p float="left">   
   <img src="https://ik.imagekit.io/48vhb7pknty/ejs_pz6VKZxC2.png" width="60" height="60"> 
   
   <img src="https://cdn2.iconfinder.com/data/icons/designer-skills/128/code-programming-javascript-software-develop-command-language-256.png" width="60" height="60">   

   <img src="https://cdn3.iconfinder.com/data/icons/popular-services-brands/512/node-256.png" width="60" height="60">  
   
   <img src="https://miro.medium.com/max/800/1*9AbbVli10NreTXCpiVYEOQ.png" width="80" height="60">  

   <img src="https://ik.imagekit.io/48vhb7pknty/socketIO_T2sdQyznI.png" width="60" height="60">   

   <img src="https://ik.imagekit.io/48vhb7pknty/webRTC_Rq_XT4cWvK.png" width="60" height="60">  

   <img src="https://ik.imagekit.io/48vhb7pknty/passport_t91H6v4nL.png" width="60" height="60">
   
   <img src="https://ik.imagekit.io/48vhb7pknty/mongo_GOU-9AvOM.png" width="60" height="60"> 

   <img src="https://img.icons8.com/color/64/000000/git.png" width="60" height="60"> 

   <img src="https://ik.imagekit.io/48vhb7pknty/git_J9FDXTySH.png" width="60" height="60"> 
   <p>


# Testing

To test or run the code on your device complete the following steps: 

1. Clone the repository or download zip code folder.
2. Install Node if you don't have it already. Just go to [this](https://nodejs.org/en/) site and follow instructions.
3. Head over to the cloned project directory on your system and in terminal run following commands.
    ```
    $ npm i
    $ npm i -g nodemon
    $ nodemon server.js
    ```
    Instead of installing nodemon you can also run ```
    $ node server.js ``` as well. 

    (_It is preffered to use nodemon as it tracks any changes to project and we don't have to restart server again and again_)
4. This should have started the server on localhost, just go to your preferred browser and type ```localhost:3000```. (_recommended brouser: chrome_)