import React, {useState, useEffect} from 'react';
import {  signOut } from "firebase/auth";
import {auth} from '../firebase/firebase';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
 
const Home = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [result, setResult] = useState([]);
    const [show, setShow] = useState(false);
 
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
        axios({
            "method": "GET",
            "url": 'https://www.googleapis.com/youtube/v3/search',
            "params":{
                'part':'snippet',
                'maxResults':'10',
                'key': import.meta.env.VITE_YOUTUBE_API,
                'q':search
            }
        })
            .then((res) => {
                setResult(res.data.items)               
            })
            .catch((error) => {
                console.log(error)
            })

        
    }

    const handleOpen = () => {
        setShow(true);
    }

    useEffect(() => {
        console.log(result); 
     }, [result]);
   
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
            <div>
                <form onSubmit={searchVideo}>
                    <input type='text' onChange={(e)=>setSearch(e.target.value)}></input>
                    <button type='submit'>Search</button>
                </form>
            </div>

            <div>
                <ul>
                    {
                        result?.map((item,index)=>(
                            <li key={index}>
                                <iframe
                                  width="853"
                                  height="480"
                                  src={`https://www.youtube.com/embed/${item.id.videoId}`}
                                  frameBorder="0"
                                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                  allowFullScreen
                                />
                            </li>
                        ))
                    }
                </ul>
            </div>
            
        </>
    )
}
 
export default Home;