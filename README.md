# Chat Server

Contacts :<br/>
Oleh Muzychuk<br/>
<a href="mailto:olehmuz87@gmail.com">Email</a><br/>
<a href="https://t.me/alegmuz" target="_blank">Telegram</a>

# Tech Stack

Front-end: JavaScript, React, Socket.io

Back-end: NodeJS, Swagger UI, Jest


AWS: EC2 ubuntu

<a href="https://frontend.persprojchat.space/" target="_blank">AWS link(Front-end)</a>
<a href="https://backend.persprojchat.space/" target="_blank">AWS link(API)</a>

<a href="https://miro.com/welcomeonboard/YUJtdUhiUkhJVmdWV1pmaW1yVFdRdVBwQmpuTzNkRFg3U2MxTmZTZzB4WUZyVGdZOVhja1JqSDJCZHFVcGZ3N3wzMDc0NDU3MzQ4MjYwNzAyOTY3fDI=?share_link_id=809390771141" target="_blank">Diagram.</a>

### Link to front-end Project
<a href="https://github.com/illiachumak/chatFrontEnd" target="_blank">Chat front-end repository</a>

# How to run a project on localhost 
### To start server
Install dependencies `npm ci`
Start with `npm run dev`


# Decomposition of project tasks
### Main functionality

- [x] Tracking system
- [x] Salary calculator
- [x] Vacation calculator
### Layout 

- [x] Auth page
- [x] Chat page
- [x] About page
- [x] Profile page
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
