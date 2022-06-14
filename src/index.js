import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from 'firebase/compat/app';
import 'mdb-react-ui-kit/dist/css/mdb.min.css'

export const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDMVxVgJrIVsFYGWEJW1wl2lP6GrJnxsfE",
  authDomain: "chemicalio.firebaseapp.com",
  databaseURL: "https://chemicalio-default-rtdb.firebaseio.com",
  projectId: "chemicalio",
  storageBucket: "chemicalio.appspot.com",
  messagingSenderId: "382520582201",
  appId: "1:382520582201:web:b8327957da5552da7c2de8",
  measurementId: "G-3B45H9S9G6"
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
