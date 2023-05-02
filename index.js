const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

app.get('/', (req, res) => {
  res.json({
    message: "Hello World!"
  });
});

app.post("/authenticate", async (req, res) => {
  const { username } = req.body;
  
  try{
    const resp = await axios.put(
        "https://api.chatengine.io/users/",
        {username: username, secret: username, first_name: username},
        {headers:{"private-key": "6e0a070f-e6f0-4cea-88e9-c2a91828eb12"}}
    )
    return res.status(resp.status).json(resp.data)
  } catch(e){
    return res.status(e.response.status).json(e.response.data)
  }

  return res.json({ username: username, secret: "sha256..." });
});

app.listen(3001);
