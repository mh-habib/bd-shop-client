import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { useContext, useState } from 'react';
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";
import { createUserWithEmailAndPassword, handleGoogleSignIn, handleSignOut, initializeLoginFrameWork, signInWithEmailAndPassword } from './loginManager';
import Header from '../Header/Header';
import './Login.css';


function Login() {
  const [newUser, setNewUser] = useState(false);
  const [confirmPassValue, setConfirmPassValue] = useState("");
  const [passValue, setPassValue] = useState("");
  const [isError, setIsError] = useState("");
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    photo: ''
  });
  initializeLoginFrameWork();

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const googleSignIn = () => {
    handleGoogleSignIn()
      .then(res => {
        handleResponse(res, true);
      })
  }

  const signOut = () => {
    handleSignOut()
      .then(res => {
        handleResponse(res, false);
      })
  }

  const handleResponse = (res, redirect) => {
    setUser(res);
    setLoggedInUser(res);
    if (redirect) {
      history.replace(from);
    }
  }

  const handleChange = (event) => {
    let isFieldValid = true;
    if (event.target.name === 'email') {
      isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
    }
    if (event.target.name === 'password') {
      const isPasswordValid = event.target.value.length > 5;
      const passwordHasNumber = /\d{1}/.test(event.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber;
    }
    if (isFieldValid) {
      const newUserInfo = { ...user }
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo);
    }
  }

  const handleSubmit = (event) => {
    if (newUser && user.email && user.password) {
      createUserWithEmailAndPassword(user.name, user.email, user.password)
        .then(res => {
          handleResponse(res, true)
        })
    }

    if (!newUser, user.email && user.password) {
      signInWithEmailAndPassword(user.email, user.password)
        .then(res => {
          handleResponse(res, true);
        })

    }
    event.preventDefault();
  }
  const passwordMatcher = (e) => {
    setConfirmPassValue(e.target.value)
    if (passValue != confirmPassValue) {
      setIsError('Password not matched!!!');
    }else{
      setIsError('');
    }
  }
  return (
    <div style={{ textAlign: 'center' }}>

      <div>
        <Header></Header>
      </div>
      <div className="form-body mb-5">
        <div>
          <span className="text-danger">{isError}</span>         
        </div>
        <form className="mb-3" onSubmit={handleSubmit}>
          <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
          <label htmlFor="newUser"> <span>&nbsp;</span> Sign Up </label>

          <div className="form-group mt-2">
            {newUser && <input onBlur={handleChange} type="text" className="form-control" name="name" aria-describedby="emailHelp" placeholder="Enter Your Name" required />}
          </div>
          <div className="form-group">
            <input onBlur={handleChange} type="email" className="form-control" name="email" aria-describedby="emailHelp" placeholder="Enter Your Email" required />
          </div>
          <div className="form-group">
            <input value={passValue} onBlur={handleChange} onChange={(e) => setPassValue(e.target.value)} type="password" className="form-control" name="password" placeholder="Type a Password" required />
          </div>
          <div className="form-group">
          {newUser && <input value={confirmPassValue} onChange={(e) => passwordMatcher(e)} type="password" className="form-control" name="password2" placeholder="Confirm Password" required />}
          </div>
          <input type="submit" className="btn btn-info btn-block" value={newUser ? 'Create an Account' : 'Sign In'} />
        </form>
        <p style={{ color: 'red' }}>{user.error}</p>
        {
          user.success &&
          <p style={{ color: 'green' }}>User {newUser ? 'Created' : 'Logged In'} Successfully</p>
        }
        <p className="text-center"> Already have an account? <a href="">Log In</a></p>
        {
          user.isSignedIn ?
            <button onClick={signOut} type="button" className="btn btn-danger btn-block"> <FontAwesomeIcon icon={faGoogle} /> Sign Out from Google</button> :
            <button onClick={googleSignIn} type="button" className="btn btn-danger btn-block"> <FontAwesomeIcon icon={faGoogle} /> Sign in With Google</button>
        }

        <button type="button" className="btn btn-primary btn-block"> <FontAwesomeIcon icon={faFacebookF} /> Sign in With Facebook</button>

        {
          user.isSignedIn && <div>
            <p>Welcome, {user.name}</p>
            <p>Your e-mail: {user.name}</p>
            <img src={user.photo} alt="" />
          </div>
        }

      </div>
    </div>
  );
}

export default Login;
