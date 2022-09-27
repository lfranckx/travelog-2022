import '../Styles/Header.scss';
import bootprint from '../assets/icons/bootprint.png';
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import TokenService from '../Services/TokenService';
import IdleService from '../Services/IdleService';
import { ArticleContext } from '../ArticleContext';

export default function Header() {
    const handleLogOut = () => {
        TokenService.clearAuthToken();
        TokenService.clearCallbackBeforeExpiry();
        IdleService.unRegisterIdleResets();
    }

    const { user } = useContext(ArticleContext);

    function renderLogOutLink() {
        const world = 'https://travelog-files.s3-us-west-1.amazonaws.com/icons/world.png';
        const notepad = 'https://travelog-files.s3-us-west-1.amazonaws.com/icons/notepad.png';
        const profile = 'https://travelog-files.s3-us-west-1.amazonaws.com/icons/profile.png'

        if (!user.profile_image) {
            user.profile_image = profile;
        }

        return (
            <ul className='navlinks_list'>
                <li className='btn-wrap'>
                    <Link to={'/'} className='navlink' >
                        <img src={world} alt='World Icon' />
                        <div className='text'>Home</div>
                    </Link>
                </li>
                
                <li className='btn-wrap'>
                    <Link to={'/post'} className='navlink'>
                        <img src={notepad} alt="Write a post" />
                        <div className='text'>Post</div>
                    </Link>
                </li>
                
                <li className='btn-wrap'>
                    <Link to={`/profile/${user.username}`} className='navlink'>
                        <img src={notepad} alt="User Profile" />
                        <div className='text'>Post</div>
                    </Link>
                </li>
                
                <li className='btn-wrap'>
                    <Link to='/' className='btn logout' onClick={handleLogOut}>Logout</Link>
                </li>
            </ul>
        )
    }

    function renderLogInLink() {
        return (
            <ul className='navlinks_list'>
                <li className='btn-wrap'>
                    <Link to='/login' className='btn'>Login</Link>
                </li>
                
                <li className='btn-wrap'>
                    <Link to='/sign-up' className='btn-secondary'>Join</Link>
                </li>
            </ul>
        )
    }

    return (
        <header className="App-header">
            <nav>
                <div className='title_wrap header_container'>
                    <img alt='Travelog Logo' src={bootprint} width={'48px'} />
                    <h1>
                        <Link to={'/'} id='site-title'>Travelog</Link>
                    </h1>
                </div>
                
                <div className='navlinks_list-wrap header_container'>
                    {TokenService.hasAuthToken()
                        ? renderLogOutLink()
                        : renderLogInLink()}
                </div>
            </nav>
        </header>
    )
}