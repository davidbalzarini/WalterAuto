import { Link } from 'react-router-dom';
import './Navbar.css'
import { useContext, useState } from 'react';
import LoginModal from '../loginModal/LoginModal';
import { DataContext, useDataContext } from '../DataContext.tsx/DataContext';

interface NavBarProps {
    isModalOpen: boolean;
    openModal:() => void;
    closeModal: () => void;
}

function Navbar({isModalOpen, openModal, closeModal}:NavBarProps){
    
    const { users, login, authenticatedUser, logout } = useDataContext();

    
    const handleLogin = (username: string, password: string) => {
        const isLoggedIn = login(username, password);
        if (isLoggedIn) {
            closeModal();
        } else {
            alert('Invalid username or password');
        }
    };

    return (
        <div>
        <div className='containernav'>
            
            
            <nav className="navbar end">
                <img className='abc' src="..\public\logoToda.png" alt="" width={100}/>
                
                <div className="center menu-section on">
                    {/* <Link to='/navmob'>
                        <div className="menu-toggle">
                            <div className="one"></div>
                            <div className="two"></div>
                            <div className="three"></div>
                        </div>
                    </Link> */}
                    <div >
                    </div>
                    <div>
                            {authenticatedUser ? (
                                <div className="user-section">
                                    <div>
                                        <img src={authenticatedUser.foto} alt="" width={10}/>
                                    </div>
                                    
                                    <button onClick={logout} className="btn-logout">Logout</button>
                                </div>
                            ) : (
                                <button onClick={openModal} className="btn-design">Login</button>
                            )}
                        </div>
                    <div>
                        <LoginModal isOpen={isModalOpen} onRequestClose={closeModal} onLogin={handleLogin} />
                    </div>
                    
                </div>
            </nav>
            
        </div>
        </div>
    );
}

export default Navbar;