import { auth, signIn, signOut } from '@/auth'
import React from 'react'

export default async function GoogleSignInBtn(){

    const session  = await auth();

    const user = session?.user;

    return (

        user ? 
        ( 

            <>
                <h1 className='text-2xl'>Welcome {user?.name}</h1>
                <figure>
                    <img src={user.image!} alt="User Image" />
                </figure>
                <form action={
                    async () => {
                        "use server"
                        await signOut()
                    }
                }>
                    <button className="btn btn-blue" type='submit'>Sign Out</button>
                </form>
                
            </>
        ):
       ( <form action={
            async () => {
                "use server"
                await signIn("google")
            }
        }>

            <h1>Sign In</h1>
            <button className="btn btn-blue" type='submit'>Sign In with Google</button>
        </form>)

    )
}