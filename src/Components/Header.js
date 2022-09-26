import '../Styles/Header.scss';
import React from "react";
import { Link } from "react-router-dom";
import bootprint from '../assets/icons/bootprint.png';

export default function Header() {
    return (
        <header className="App-header">
            <nav>
                <div className='title_wrap'>
                    <img alt='Travelog Logo' src={bootprint} width={'48px'} />
                    <h1>
                        <Link to={'/'} id='site-title'>Travelog</Link>
                    </h1>
                </div>
                

                <div className='navlinks'>
                    <div className='btn-wrap'>
                        <Link className='btn'>Login</Link>
                    </div>
                    
                    <div className='btn-wrap'>
                        <Link className='btn-secondary'>Join</Link>
                    </div>
                </div>
            </nav>
        </header>
    )
}