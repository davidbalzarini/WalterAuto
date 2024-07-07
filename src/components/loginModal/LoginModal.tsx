import React, { useState, FunctionComponent } from 'react';
import Modal from 'react-modal';
import './LoginModal.css';
import { Link } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';

Modal.setAppElement('#root'); // Isso é necessário para acessibilidade

interface LoginModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    onLogin: (username: string, password: string) => void;
}

const LoginModal: FunctionComponent<LoginModalProps> = ({ isOpen, onRequestClose, onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onLogin(username, password);
        onRequestClose(); // Fecha o modal após tentar fazer login
    };
    return (
        <div>
            <Modal
                isOpen={isOpen}
                onRequestClose={onRequestClose}
                contentLabel="Login Modal"
                className="Modal"
                overlayClassName="Overlay"
            >
                <img src="../public/logoToda.png" alt="" width={150} />
                <h2 className='h2t'>Seja bem-vindo(a)!</h2>
                <p>Para acessar o nosso Portal do Cliente, faça login usando suas credenciais!</p>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email:</label>
                        <input type="email" onChange={(e) => setUsername(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input type="password" onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <Link to='/register'>
                        <button className="btn-designnn" onClick={onRequestClose}>Criar conta</button>
                    </Link>
                    <button type="submit" className="btn-designn">Login</button>
                </form>
                <button onClick={onRequestClose} className="btn-close"><CloseIcon/></button>
            </Modal>
        </div>
    );
};

export default LoginModal;
