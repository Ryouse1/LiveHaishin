const axios = require('axios')
const functions = require('firebase-functions')

const DAILY_API_BASE = 'https://api.daily.co/v1'
const DAILY_TOKEN = functions.config().daily?.api_key || process.env.DAILY_API_KEY

exports.createDailyRoom = async (req, res) => {
  const { roomName, properties } = req.body
  try{
    const resp = await axios.post(`${DAILY_API_BASE}/rooms`, {
      name: roomName,
      ...properties
    }, {
      headers: { Authorization: `Bearer ${DAILY_TOKEN}` }
    })
    res.status(200).json(resp.data)
  } catch(err){
    console.error(err.response?.data || err.message)
    res.status(500).json({ error: err.message, detail: err.response?.data })
  }
}

exports.createDailyToken = async (req, res) => {
  const { roomName, userId, isOwner } = req.body
  try{
    const resp = await axios.post(`${DAILY_API_BASE}/meeting-tokens`, {
      properties: {
        room_name: roomName,
        user_id: userId,
        is_owner: !!isOwner
      }
    }, {
      headers: { Authorization: `Bearer ${DAILY_TOKEN}` }
    })
    res.status(200).json(resp.data)
  } catch(err){
    console.error(err.response?.data || err.message)
    res.status(500).json({ error: err.message, detail: err.response?.data })
  }
}
