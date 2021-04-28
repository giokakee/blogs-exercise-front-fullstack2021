import React from 'react'

const RegisterForm = ({
    handleRegister,
    name,setName,
    username,setUsername,
    password,setPassword,
    registerVisible,loginVisible,cancel
}) => {
    return(
            <form onSubmit={handleRegister}>
        
            <div className='registerName'>
             <input required className='registerName-input' type='text' name='name' value={name} onChange={({target})=> setName(target.value)} />
                <label className='registerName-label'>
                    <span className='registerName-span'>name</span>
                 </label>
            </div>
            <div className='registerUsername'>
              <input required className='registerUsername-input' name='username' value={username} onChange={({target}) => setUsername(target.value)} />
                <label className='registerUsername-label'>
                    <span className='registerUsername-span'>username</span>
                </label>
            </div>
              <div className='registerPassword'>
                  <input required className='registerPassword-input' type='password' name='password' value={password} onChange={({target}) => setPassword(target.value)} />
                <label className='registerPassword-label'>
                    <span className='registerPassword-span'>password</span>
                </label>
             </div>  
       
        <button type='submit' > Register</button>          
              
        <div style={{display:registerVisible? '': loginVisible? '': 'none'}}><button className='cancel' onClick={cancel}>Cansel</button></div>
        </form>

    )
}



export default RegisterForm