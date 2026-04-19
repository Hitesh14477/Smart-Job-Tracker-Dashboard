import axios from 'axios'

const api = axios.create({
  baseURL: 'https://dummyjson.com',
  timeout: 8000,
})

export async function fetchDummyJobs() {
  const { data } = await api.get('/products?limit=6')
  return data.products || []
}

export default api