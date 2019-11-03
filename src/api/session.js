import axios from 'axios'
import config from '../../config'

const session = axios.create({
  baseURL: config.backendUrl,
})

export default session
