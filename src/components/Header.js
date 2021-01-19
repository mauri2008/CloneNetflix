import React from 'react';

import './Header.css';

export default ({black})=>{
    return(
        <header className={black ? 'black':''}>
            <div className="header--logo">
                <a href="">
                    <img src="https://logodownload.org/wp-content/uploads/2014/10/netflix-logo-1-1.png"/>
                </a>
            </div>
            <div className="header--user">
                <a href="">
                    <img src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/84c20033850498.56ba69ac290ea.png"/>
                </a>
            </div>
        </header>
    )
}