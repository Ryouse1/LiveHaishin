// thin client wrapper to call backend functions for Daily room/token
import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE || ''

export async function createRoom(roomName, properties = {}) {
  const url = `${API_BASE}/createDailyRoom`
  const res = await axios.post(url, { roomName, properties })
  return res.data
}

export async function createToken(roomName, userId, isOwner = false) {
  const url = `${API_BASE}/createDailyToken`
  const res = await axios.post(url, { roomName, userId, isOwner })
  return res.data
}
