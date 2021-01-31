import React, { useState } from 'react';
import '../home/Home.css';
import bk_img from '../assets/t.jpeg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAmazon, faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';


function Home(props) {
    let style = {
        background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(${bk_img})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
       
    }

    const [closeHome, setCloseHome]  = useState(false);
    //SHOW STORE COMPONENT
    const triggerShow = ()=>{
        props.parentCallBack(!closeHome);
    }

    
    return (<>
        <div className="container" style={style}></div>
            <div className="home" >
                <div className="home__inner">
                    <div className="home__inner_top">

                        <h1>You want to know what's instock? then click the shop button Now!
                        </h1>
                        <button onClick={triggerShow}>Shop</button>
                    </div>
                
                    <div className="home__inner_bottom">
                        <div className="fb">
                           <a href="#"><FontAwesomeIcon icon={faFacebook} /></a> 
                        </div>
                        <div className="tw">
                        <a href="#"><FontAwesomeIcon icon={faTwitter} /></a>
                        </div>
                        <div className="amz">
                        <a href="#"><FontAwesomeIcon icon={faAmazon} /></a>
                        </div>
                    </div>
                </div>
                
                
            </div>

        </>
       
    )
}

export default Home
