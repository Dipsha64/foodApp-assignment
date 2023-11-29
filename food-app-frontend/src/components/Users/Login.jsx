import React from "react";
import styled from "styled-components";
import logoImg from "../../images/logo.png";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import axios from "axios";
import { registerRoute } from "../../utils/APIRoutes";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import 'react-toastify/dist/ReactToastify.css';

function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    console.log("ERR",errors);
    const navigate = useNavigate();
    const toastOption = {
        position : "top-right",
        autoClose : 8000,
        pauseOnHover : true,
        theme : "dark",
        draggable : true
    }
    return ( 
        <><FormContainer>
            <div className="container">
                <form noValidate onSubmit={handleSubmit((data)=>{
                    console.log("FORM DATA",data);
                    const result = axios.post(registerRoute,data);
                    if(result.status === true){
                        navigate("/");
                    }
                    if(result.status === false){
                        toast.error(data.message,toastOption);
                    }
                })}>
                    <div className="brand">
                        <img src={logoImg} alt="Logo"></img>
                        <h1>Food Factory</h1>
                    </div>
                    <input name="email" placeholder="Email" type="email" {...register("email",{ required : "Email is required.",pattern : {value:/\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,message : "Email not valid"}})}/>
                        <p className="text-red-500">
                            {errors.email && <span>{errors.email.message}</span>}
                        </p>
                    <input name="password" placeholder="Password" type="password" {...register("password",{required : "Password is required.",pattern: {value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,message: `at least 8 characters\n
                        - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number\n
                        - Can contain special characters`}})}/>
                        <p className="text-red-500">
                            {errors.password && <span>{errors.password.message}</span>}
                        </p>
                    <button type="submit">Login</button>
                    <span>Don't have an account ? <Link to="/register">Sign Up</Link></span>
                </form>
            </div>
        </FormContainer>
        <ToastContainer /></> 
    );
}

const FormContainer = styled.div`
    align-items: center;
    display: flex;
    height: 100vh;
    width: 100vw;
    flex-direction: column;
    justify-content: center;

    .container{
        width: 33%
    }
    .brand {
        gap: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        max-width: 23%;
        margin-left: 116px;
    }
    .brand h1 {
        font-size: 26px;
    }
    .brand img {
        max-width: 100%;
        height: auto;
    }
    form { 
        display: flex;
        flex-direction: column;
        gap: 2rem;
        border-radius: 2rem;
        padding: 3rem 5rem;
    }
    input {
        background-color: transparent;
        padding: 1rem;
        border: 0.1rem solid #000000;
        border-radius: 0.4rem;
        width: 100%;
        font-size: 1rem;
    }
    button {
        background-color: #000000;
        color: white;
        padding: 1rem 2rem;
        border: none;
        font-weight: bold;
        font-size: 1.2rem;
        border-radius: 1rem;
        cursor: pointer;
    }
    span a {
        text-decoration: none;
        color : #000000
    }
    .text-red-500 {
        color: red;
    }
`

export default Login;