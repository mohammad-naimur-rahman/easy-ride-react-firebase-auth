import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../firebase.config';
import { UserContext } from '../../App';
import './Login.css';
import { useHistory, useLocation } from 'react-router';

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const Login = () => {

    const [signedInUser, setSignedInUser, vehicleType, setVehicleType] = useContext(UserContext);
    const [showSignIn, setShowSignIn] = useState(true);
    const [newUserStatus, setNewUserStatus] = useState(true);
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        isSignedIn: false,
        errorMessage: '',
        errorStatus: false
    });
    const [validationMsg, setValidationMsg] = useState({
        msg: '',
        errorStatus: false
    });
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };


    const handleSignIn = e => {
        e.preventDefault();
        if (newUserStatus && user.name && user.email && user.password) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then((userCredential) => {
                    updateProfile(user.name);
                    setSignedInUser({
                        name: user.name,
                        email: user.email
                    })
                    const userInfo = { ...user };
                    userInfo.errorStatus = false;
                    userInfo.isSignedIn = true;
                    setUser(userInfo);
                    setNewUserStatus(!newUserStatus);
                    history.replace(from);
                })
                .catch((error) => {
                    const errorMessage = error.message;
                    const userInfo = { ...user };
                    userInfo.errorMessage = errorMessage;
                    userInfo.errorStatus = true;
                    userInfo.isSignedIn = false;
                    setUser(userInfo);
                });
        }
        if (!newUserStatus && user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    setSignedInUser({
                        name: user.displayName,
                        email: user.email
                    })
                    const userInfo = { ...user };
                    userInfo.errorStatus = false;
                    userInfo.isSignedIn = true;
                    setUser(userInfo);
                    setNewUserStatus(!newUserStatus);
                    history.replace(from);
                })
                .catch((error) => {
                    const errorMessage = error.message;
                    const userInfo = { ...user };
                    userInfo.errorMessage = errorMessage;
                    userInfo.errorStatus = true;
                    userInfo.isSignedIn = false;
                    setUser(userInfo);
                });
        }
    }

    const updateProfile = name => {
        var user = firebase.auth().currentUser;
        user.updateProfile({
            displayName: name,
        }).then(function () {
            // Update successful.
        }).catch(function (error) {
            // An error happened.
        });
    }

    const handleGoogleSignIn = () => {
        const googleProvider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(googleProvider)
            .then((result) => {
                const user = result.user;
                setSignedInUser({
                    name: user.displayName,
                    email: user.email
                })
                history.replace(from);
            }).catch((error) => {
                const errorMessage = error.message;
                const userInfo = { ...user };
                userInfo.errorMessage = errorMessage;
                userInfo.errorStatus = true;
                setUser(userInfo);
            });
    }
    const handleBlur = e => {
        let isValid = true;
        if (e.target.name === 'name') {
            const userInfo = { ...user };
            userInfo.name = e.target.value;
            setUser(userInfo);
        }
        if (e.target.name === 'email') {
            const regExPattern = /^[^\s@]+@[^\s@]+$/;
            isValid = regExPattern.test(e.target.value);
            if (isValid) {
                const userInfo = { ...user };
                userInfo.email = e.target.value;
                setUser(userInfo);
                const validation = { ...validationMsg };
                validation.msg = '';
                validation.errorStatus = false;
                setValidationMsg(validation);
            } else {
                const validation = { ...validationMsg };
                validation.msg = 'Please give a valid email address';
                validation.errorStatus = true;
                setValidationMsg(validation);
            }
        }
        if (e.target.name === 'password') {
            const isLong = e.target.value.length > 5;
            const passHasNum = /\d{1}/.test(e.target.value);
            isValid = isLong && passHasNum;
            if (isValid) {
                const userInfo = { ...user };
                userInfo.password = e.target.value;
                setUser(userInfo);
                const validation = { ...validationMsg };
                validation.msg = '';
                validation.errorStatus = false;
                setValidationMsg(validation);
            } else {
                const validation = { ...validationMsg };
                validation.msg = 'Password should be at least of 6 characters including a number';
                validation.errorStatus = true;
                setValidationMsg(validation);
            }
        }
    }
    return (
        <div className='mx-auto'>
            <form onSubmit={handleSignIn} style={{ maxWidth: '400px' }} className='mx-auto m-4 p-4 shadow-lg rounded'>
                <h5 className="text-primary py-3">Login Form</h5>
                {
                    showSignIn && <input type="text" className='form-control my-3 px-1' onBlur={handleBlur} name="name" id="username" placeholder='Full Name' required />
                }
                <input type="text" className='form-control my-3 px-1' onBlur={handleBlur} name="email" id="usermail" placeholder='Email address' required />
                <input type="password" className='form-control my-3 px-1' onBlur={handleBlur} name="password" id="userpass" placeholder='Choose password' required />
                {
                    validationMsg.errorStatus && <p className='text-danger py-2'>{validationMsg.msg}</p>
                }
                <input type="submit" value={showSignIn ? 'Register' : 'Sign in'} className='btn btn-success px-4 py-1' />
                <p className='text-center py-3 text-secondary'>{showSignIn ? 'Already have an account?' : 'Create a new account'}
                    <input type="checkbox" name="signin" id="signin" onChange={() => {
                        setShowSignIn(!showSignIn);
                        setNewUserStatus(!newUserStatus);
                    }} className='d-none' />
                    <label htmlFor="signin" className='mx-1 text-primary sign-in-toggle'>{showSignIn ? 'Sign in' : ' Register'}</label>
                </p>
            </form>
            <div className="messages w-100 text-center">
                {
                    user.errorStatus && <p className='text-danger border d-inline-block border-danger px-5 py-2 my-2'>{user.errorMessage}</p>
                }
                {
                    user.isSignedIn && <p className='text-success d-inline-block border border-success px-5 py-2 my-2'>Successfully signed in</p>
                }
            </div>

            <p className='text-center py-2 text-secondary'><b>Or</b></p>
            <div className="w-100 text-center">
                <button className='btn btn-info py-2 px-5 my-2' onClick={handleGoogleSignIn}><FontAwesomeIcon icon={faGoogle} /> Sign in with google</button>
            </div>

        </div>
    );
};

export default Login;