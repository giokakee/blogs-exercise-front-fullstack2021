import React from 'react'


const LoginForm = ({
    handleLogin,
    username,setUsername,
    password,setPassword,
    registerVisible,loginVisible,cancel
}) => {
    return(
        <form onSubmit={handleLogin} className='loginForm'>
         <div className='loginUsername'>
            <input required className='loginUsername-input'  name='username' value={username} onChange={({target}) => setUsername(target.value)} />
         <label className='loginUsername-label'>
             <span className='loginUsername-span' >username</span>
         </label>
         </div>
            <div className='loginPassword'>
                <input required className='loginPassword-input' type='password' name='password' value={password} onChange={({target}) => setPassword(target.value)} />
                <label className='loginPassword-label'>
                    <span className='loginPassword-span'>password</span>
                </label>
            </div>
            <br />
              <button type='submit' >Login</button>
              <div style={{display:registerVisible? '': loginVisible? '': 'none'}}><button className='cancel' onClick={cancel}>Cansel</button></div>

        </form>
    )
}

export default LoginForm