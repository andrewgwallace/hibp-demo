require('dotenv').config()
const express = require('express');
const unirest = require('unirest');
const cors = require('cors');
const app = express()
const PORT = 3000

app.use(cors());

try {
  app.get('/breaches/:account', async (req, res) => {
    const request = unirest("GET", `https://haveibeenpwned.com/api/v3/breachedaccount/${req.params.account}?truncateResponse=false`)
    request.query(req.params.account)
    request.headers({
      "hibp-api-key": process.env.HIBP_KEY,
      "useQueryString": true,
      "user-agent": "JupiterOne",
    })
    request.end(async response => {
      if(response.error) {
        await res.json(response.error)
      }
      if (response.status === 200) {
        await res.json(response.body)
      }
    })
  })
} catch (err) {
  console.log("There was an error", err);
}


app.listen(PORT, () => {
  console.log(`Express server listening on localhost:${PORT}`)
})