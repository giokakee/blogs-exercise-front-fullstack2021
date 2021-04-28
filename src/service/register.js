import axios from 'axios';

const baseUrl = '/api/users';
let testUrl = 'http://localhost:3001/api/users';

const RegisterUser = async (userInfo) => {
    
    try{
        let response  = axios.post(baseUrl, userInfo)
        return response
    } catch(err){
        return 'registered error'
    }
}

export default RegisterUser