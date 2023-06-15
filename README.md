# Chat Server

Contacts :<br/>
Oleh Muzychuk<br/>
<a href="mailto:olehmuz87@gmail.com">Email</a><br/>
<a href="https://t.me/alegmuz" target="_blank">Telegram</a>

# Tech Stack

Front-end: TypeScript, React, Redux toolkit

Back-end: TypeScript, Nest.js, MongoDB(CosmosDB), Mongoose, Swagger UI, Passport, Jest
TypeScript, Nest.js, MongoDB(CosmosDB), Mongoose, Swagger UI, Passport, Jest

Azure: Web App, Cosmos DB

<a href="https://itfin-react.azurewebsites.net/" target="_blank">Azure link(Front-end)</a>
<a href="https://itfin-back.azurewebsites.net/" target="_blank">Azure link(API)</a>

<a href="https://miro.com/app/board/uXjVMAa76Ek=/?share_link_id=503285943783" target="_blank">Description of the architecture and infrastructure used in the project.</a>

### Link to front-end Project
<a href="https://github.com/Olehmuz/timetracker-front-end" target="_blank">ITFIN-clone front-end repository</a>

# How to run a project on localhost 
### To start server
Install dependencies `npm ci`
Start with `npm run dev`
### Environment variable that you have to provide

* PORT : The port on which the application will run
* MONGODB_URI : MongoDB URI that gives access to your database
* SECRET_JWT_ACCESS_TOKEN : Secret phrase for your access token
* SECRET_JWT_REFRESH_TOKEN : Secret phrase for your refresh token
* SALT : Salt for bcrypt

# Decomposition of project tasks
### Main functionality

- [x] Tracking system
- [x] Salary calculator
- [x] Vacation calculator
### Layout 

- [x] Profile page
- [x] Crew page
- [x] About page
- [x] Tracktime page
- [x] Header component

### Authorization
- [x] FireBase Auth 
- [x] Registration , login , logout functionality in auth service
- [x] Auth routes on server
- [x] Client-side connection with OAuth
- [x] Client-side auth handling
### Database

- [x] FireBase Realtime Database for user information

### Tests

- [x] Jest setup
- [x] Pages unit tests
	- [x] AuthPage tests 
	- [x] ChatsPage tests

- [x] Postman collection for main API routes
### AWS

- [x] AWS Ec2 instance setup
- [x] Run Nginx server for reverse proxy to handle ssl certificates with Docker
- [x] CloudWatch(Aplication Insights)
- [x] Deploy API to AWS
	- [x] CI/CD for backend
- [x] Deploy Client-side to AWS
	- [x] CI/CD for front-end
