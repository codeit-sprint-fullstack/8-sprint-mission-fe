import axios from 'axios'


const fallback = location.hostname === 'localhost'
  ? 'http://localhost:4000/api'
  : `${location.origin}/api`

const baseURL = (import.meta.env.VITE_API_BASE || fallback).replace(/\/+$/, '')

const api = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
})

console.log('API BASE =', api.defaults.baseURL)

export default api