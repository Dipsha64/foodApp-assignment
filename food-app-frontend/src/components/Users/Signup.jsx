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

function Signup() {
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
                <form onSubmit={handleSubmit(async(data)=>{
                    const result = await axios.post(registerRoute,data);
                    if(result.data && result.data.status === true){
                        toast(result.data.message,toastOption);
                        navigate("/login");
                    }
                    if(result.data && result.data.status === false){
                        toast(result.data.message,toastOption);
                    }
                })}>
                    <div className="brand">
                        <img src={logoImg} alt="Logo"/>
                        <h1>Food Factory</h1>
                    </div>
                    <input name="username" placeholder="User Name" type="text" {...register("username",{required : "UserName is required."})}/>
                        <p className="text-red-500">
                            {errors.username && <span>{errors.username.message}</span>}
                        </p>
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
                    <input name="confirmPassword" placeholder="Confirm Password" type="password" {...register("confirmPassword",{required:"Confirm Password is required.",validate:(value, formValues) => value === formValues.password || "password not match."})}/>
                        <p className="text-red-500">
                            {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}
                        </p>
                    <button type="submit">Create User</button>
                    <span>Already have an account ? <Link to="/login">Login</Link></span>
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
export default Signup;