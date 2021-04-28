import axios from 'axios';
const baseUrl = '/api/login'

let testUrl = 'http://localhost:3001/api/login';


const LoginUser = async (userInfo) => {
    try{
        let login  = await axios.post(baseUrl, userInfo)
            return login.data
    } catch(err){
        return console.log(err.message)
    }
}



export default LoginUser