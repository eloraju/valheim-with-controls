import axios from 'axios';

const instance = axios.create({decompress: false})

export default instance;