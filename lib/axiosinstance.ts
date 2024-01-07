import { api } from '@/configs/site'
import axios from 'axios'

const instance = axios.create({
  baseURL: api,
  timeout: 20000
})

export default instance
