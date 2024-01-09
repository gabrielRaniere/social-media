import React from 'react';
import './styled.css'

export default function Form({handleSubmit, handleEmail, handlePass, handleRepeat, handleNome}) {

    if(handleNome) return(
        <form method='post' onSubmit={handleSubmit}>

        <label  htmlFor='nome-register'>Nome</label>
        <input type='text' id='nome-register' onChange={handleNome}/>

        <label htmlFor='email-register'>Email</label>
        <input type='email' id='email-register' onChange={handleEmail}/>

        <label htmlFor='password-register'>password</label>
        <input type='password' id='password-register' onChange={handlePass}/>

        <label htmlFor='repeate-register'>repeat password</label>
        <input type='password' id='repeate-register' onChange={handleRepeat}/>

        <button type='submit'>Sign up</button>

    </form>
    )

    return(
        <form method='post' onSubmit={handleSubmit}>
            <label htmlFor='email-login'>Email</label>
            <input type='email' id='email-login' onChange={handleEmail}/>

            <label htmlFor='password-login'>password</label>
            <input type='password' id='password-login' onChange={handlePass}/>

            <button type='submit'>Log in</button>
        </form>
    )
}