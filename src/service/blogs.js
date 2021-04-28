import axios from 'axios';
const baseUrl = '/api/blogs';


let token = null;

const setToken = newToken => {
    token = `bearer ${newToken}`
  };



const getAll = async () => {
    let response = await axios.get(baseUrl)
    return response.data
};

const create = async newObject => {
    const config = {
      headers: { Authorization: token },
    }
  
    const response = await axios.post(baseUrl, newObject, config)
    return response.data
  };
  const deleteBlog = async (id, userId) => {
     return await axios.delete(`${baseUrl}/${id}/${userId}`)
  }

  const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
  }

  const findOne = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`)
    return response.data
  }

  const unlike = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}/unlike`, newObject)
    return request.then(response => response.data)
  }
  

  const forExport = {getAll, create, setToken, deleteBlog, update, findOne, unlike}

export default forExport