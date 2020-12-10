import axios from 'axios';
import { GET_POST } from './types';
import { POST_SERVER } from '../components/Config.js';

export function getPostContent(dataToSubmit) {

      const request = axios.post('/api/posts/getposts', dataToSubmit)
      .then(res => res.data)

      return {
        type : GET_POST,
        payload: request
      }
    }
