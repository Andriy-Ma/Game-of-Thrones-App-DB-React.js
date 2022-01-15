import React, {Component} from 'react';
import './errorMessage.css';
import img from './got.jpeg';

const ErrorMessage =()=>{

    return(
        <>
        <img src={img} alt="error" />
        <span> Something goes wrong</span>
        </>
    ) 

}

export default ErrorMessage;