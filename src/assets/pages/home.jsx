import React, {useState} from 'react';
import {  signOut } from "firebase/auth";
import {auth} from '../firebase/firebase';
import { useNavigate } from 'react-router-dom';
 
const Home = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
 
    const handleLogout = () => {               
        signOut(auth).then(() => {
        // Sign-out successful.
            navigate("/");
            console.log("Signed out successfully")
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
        });
    }

    const searchVideo = (e) => {
        e.preventDefault();
        console.log(search);
    }
   
    return(
        <>
            <nav>
                <p>
                    Welcome Home
                </p>
 
                <div>
        			<button onClick={handleLogout}>
                        Logout
                    </button>
        		</div>
            </nav>

            <p>Educational videos</p>

            <div>
                <form onSubmit={searchVideo}>
                    <input type='text' onChange={(e)=>setSearch(e.target.value)}></input>
                    <button type='submit'>Search</button>
                </form>
            </div>
            
            <div>
            <iframe id="ytplayer" 
                    type="text/html" 
                    width="640" 
                    height="360" 
                    src="https://www.youtube.com/embed/M7lc1UVf-VE?" 
            />

            </div>
        </>
    )
}
 
export default Home;