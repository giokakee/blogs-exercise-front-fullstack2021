import {  useEffect, useState } from 'react'
import './App.css'
import './login.css'
import './register.css'
import './mobile.css'
import RegisterForm from './forms/registerForm'
import LoginForm from './forms/loginForm'
import LoginUser from './service/login'
import RegisterUser from './service/register'
import BlogService from './service/blogs'
import { AiFillHeart } from 'react-icons/ai'
import { AiOutlineHeart } from 'react-icons/ai'
import { FaBloggerB } from 'react-icons/fa'
import { GrLogout } from 'react-icons/gr'
import { GrLogin } from 'react-icons/gr'



function App() {
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginVisible, setLoginVisible] =useState(false)
  const [registerVisible, setRegisterVisible] = useState(false)
  const [showButtons, setShowButtons] =useState(true)
  const [showForms, setShowForms] = useState(true)
  const [userLogined, setUserLogined] = useState(false)
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [succesMessage, setSuccesMessage] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [title, setTitle] = useState('')
  const [newBlog, setNewBlog] = useState('')
  const [author, setAuthor] = useState('')
  const [createTitleVisible, setCreateTitleVisible] = useState(false)
  const [createBlogVisible, setCreateBlogVisible] =useState(false)
  const [allBlogs, setAllBlogs] = useState(true)

  useEffect(() => {
    fetch()
  },[])
  useEffect(() => {
    setTimeout(() => {
      startingPosition()
    },18000000)
  },[user])


  let blogsToShow = allBlogs ? blogs: blogs.filter(filt => filt.user.username===user.username)
  blogsToShow.sort((a,b) => {
    return b.likes-a.likes
  })

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      BlogService.setToken(user.token)
      setShowForms(false)
     setUserLogined(true)
     }
  }, []) 
  const fetch = async () => {
   try{
    let data = await BlogService.getAll()
    setBlogs(data)
   }catch(err){
     console.log(err.message, '  this is fucking error message')
   }
  };

  const startingPosition = () => {
    setLoginVisible(false);
    setRegisterVisible(false) ;
    setShowButtons(true);
    setShowForms(true);
    setUserLogined(false);
    setUser(null);
    setErrorMessage('');
    setName('');
    setUsername('');
    setPassword('');
    setNewBlog('');
    setTitle('');
    setAuthor('');
    window.localStorage.clear();
  };

  

  const handleRegister = async (event) => {
    event.preventDefault();
   
    try{
      let user = {name,username,password};
      if(!username || !name) {
        setTimeout(() => {
          setErrorMessage(null)
        },3000)
        return(
          setErrorMessage('Please fill out fields')
        )
      }
      if(password.length <=5 ){
        setTimeout(() => {
          setErrorMessage(null)
        },3000)
        return(
          setErrorMessage('Password must be minimum 5 characters')
        )
      }
     await RegisterUser(user);
     startingPosition()
      setTimeout(() => {
          setSuccesMessage(null)
      }, 3000)
        setSuccesMessage('You registered succesfuly')
    }catch(err){
      setTimeout(() => {
        setErrorMessage(null)
      },3000)  
      setErrorMessage('This username already exists')

      setName('');
     setUsername('');
      setPassword('');
    }

    
  };

  const login = () => {
    return(
      <LoginForm 
      registerVisible={registerVisible}
      loginVisible={loginVisible}
      cancel={cancel}
      username={username}
      password={password}
      handleLogin={handleLogin}
      setUsername={setUsername}
      setPassword={setPassword} 
      />
    );
  };

  const handleLogin = async (event) => {
    event.preventDefault();
   try{
     let user= await LoginUser({username,password});
     setUsername(''); setPassword('');
    if(user === undefined){
      setTimeout(() => {
        setErrorMessage(null)
      },3000)
      return(
        setErrorMessage('Invalid username or password')
      )
    }
    setShowForms(false)
    setUserLogined(true)

    BlogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      ) 
     
      setUser(user)
      setUsername('')
      setPassword('')

   }catch(err){
      setUsername(''); setPassword('');
   }
  };

  const register  = () => {
    return(
      <RegisterForm 
      registerVisible={registerVisible}
      loginVisible={loginVisible}
         cancel={cancel}
        name={name}
        username={username}
        password={password}
        handleRegister={handleRegister}
        setName={setName}
        setUsername={setUsername}
        setPassword={setPassword} />
    );
  };

  const addBlog = async () => {
    let newObj = {
      blog: newBlog,
      title:title,
      author:author
    }
    try{
      await BlogService.create(newObj)
      fetch();
      setTitle('');
      setNewBlog('');
      setAuthor('');
      setCreateTitleVisible(false)
      setCreateBlogVisible(false)
      setSuccesMessage('added successfully')
      setTimeout(() => {
        setSuccesMessage(null)
      })
    }catch(err){
      if(err.message === 'Request failed with status code 404'){
        setErrorMessage('Time expired')
        setTimeout(() => {
          setErrorMessage(null)
        },3000)
       
      }
      setTitle('');
      setNewBlog('');
      setAuthor('');
      setErrorMessage('Please fill out fields')
      setTimeout(() => {
        setErrorMessage(null)
      },3000)
    }
  }

  let showRegister = () => {
    setRegisterVisible(true);
    setLoginVisible(false);
    setShowButtons(false);
  };
  let showLogin = () => {
    setLoginVisible(true);
    setRegisterVisible(false);
    setShowButtons(false);
  };
  let cancel = () => {
    startingPosition()
  };
  const handleDelete = async (id, token) => {
    if (!window.confirm("Do you really want to delete?"))return 
    try{
     await BlogService.deleteBlog(id, token)
      fetch()
    }catch(err){
      setTimeout(() => {
        setErrorMessage(null)
      },3000)
      setErrorMessage('error')
    }
  }
  

  


  let editDelete = (blog) => {
    if(user){
      if(blog.user.username === user.username){
        return(
          <div className='deleteDiv'>
            <button onClick={()=> handleDelete(blog.id,user.token)}>delete</button>
          </div>
        )
      }
    }
  }
 
  let like = async (bg) => {
     await bg.likerUsers.push(user.id)
     await BlogService.update(bg.id, {
    like:bg.likes,
    token: user.token
  })
    fetch()
        return
  }
  
  let unlike = async (bg) => {
    bg.likerUsers = await bg.likerUsers.filter(filt => filt !==user.id)
    await BlogService.unlike(bg.id, {
     like:bg.likes,
     token: user.token
   })
     fetch()
         return
  }




  return (
    <div className="App">
      <div>
        {errorMessage?errorMessage:null} 
      </div>
      <div className='formDiv' style={{display: showForms?'':'none'}}>
        <div className='logo' ></div>
          <div className='formsDivInside'>
            <div style={{display:showButtons? '':'none'}}><button onClick={showRegister}>Register</button></div>
            <div style={{display:showButtons?'': 'none'}}><button onClick={showLogin}>Login</button></div>
            <div style={{display:loginVisible?'':'none'}}>{login()}</div>
            <div style={{display:registerVisible? '':'none'}}>{register()}</div>
          </div>
        </div>
      <div className='loginedUserDiv' style={{display:userLogined?'':'none'}}>
       <div className='userNameDiv'>
         <div className='logo' ></div>
          <div className='user'>
            <div className='loggedIn'>
            <p className='name' >{user?user.name  :null} is logged in</p>
            <p className='username'>{user?user.username:null}</p>
            <p className='create' onClick={() => {
            setCreateTitleVisible(true)
            setCreateBlogVisible(false)
          }}>  Create Your  <span className='B'> <FaBloggerB /></span>log</p>
           <p className='create' onClick={() => {
            setAllBlogs(false)
          }} >show your <span className='B'> <FaBloggerB /></span>log</p>
           <p className='create' onClick={() => {
            setAllBlogs(true)
          }}>show all  <span className='B'> <FaBloggerB /></span>log</p>
          <button onClick={startingPosition}><span><GrLogout /></span>Log out</button>
          </div>
      </div>
    </div>
        <div className='createBlogDiv'>
          <div className='createBlogDiv1' style={{display: createTitleVisible? '': 'none'}}>
           <input className='titleInput' placeholder='Title' name='title' value={title} onChange={({target})=>setTitle(target.value)} />   
            <div className='next'>
             <p onClick={()=>{
                setCreateTitleVisible(false)
                setCreateBlogVisible(true)
              } }>Next</p>
              <p onClick={() => setCreateTitleVisible(false)}>Cancel</p>
          </div>
          </div>
          <div style={{display: createBlogVisible? '': 'none'}}>
            <textarea rows='10'cols='30' placeholder='Blog'  name='blog' value={newBlog} onChange={({target})=>setNewBlog(target.value)} ></textarea>
            <br />
            <button onClick={addBlog} >add</button>
            <button onClick={() => {
              setCreateBlogVisible(false)
              setCreateTitleVisible(false)
            }} >Cansel</button>
          </div>
        </div>
</div>
      <div className='blogsDiv1' >
        <ul>
          {blogsToShow.map((bg) => {
            return(
              <div className='blogsDiv' key={bg.id}>
                 <li className='blogsList' key={bg.id}>
                {editDelete(bg)}
                  <p className='title'>{bg.title}</p>
                  <p className='blog'>{bg.blog}</p>
              <div className='likesDiv'>
              <div className='likesDiv1'>
              {user?bg.likerUsers.includes(user.id)
                ? <p className='unlike' onClick={()=>unlike(bg)} ><AiFillHeart className='heart'  color='red' /></p>
                : <p className='like' onClick={()=>like(bg)}><AiOutlineHeart className='heart'  /></p>:''}
                {!user
                ? <p className='unlike' ><AiFillHeart  className='heart' /></p>
                : null}
                  <p className='likes'>{bg.likes}  likes</p>
              </div>
                <div >
                  <p className='author' >author {bg.user.username}</p>
                </div>
              </div>
                </li>
              </div>
            )
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
