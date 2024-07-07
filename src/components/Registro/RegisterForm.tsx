import React, { useContext, useEffect, useState } from 'react';
import './RegisterForm.css';
import { User } from '../DataContext.tsx/types';
import { DataContext } from '../DataContext.tsx/DataContext';
import { Link,  useNavigate } from 'react-router-dom';

interface RegisterProps{
  openModal: () => void;
}

function RegisterForm({openModal}:RegisterProps) {
    useEffect(() => {
        // Desativar barra de rolagem ao montar o componente
        document.body.style.overflow = 'hidden';

        // Reativar barra de rolagem ao desmontar o componente
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);
    const navigate = useNavigate();

    const { addUser } = useContext(DataContext)!;

    const [newUser, setNewUser] = useState<User>({
        id: 0,
        nome: '',
        foto: '',
        email: '',
        senha: '',
        cpf: '',
        adm: false
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setNewUser(prevUser => ({
            ...prevUser,
            [name]: value
        }));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Garantir que adm sempre seja false
        const completeUser: User = {
            ...newUser,
            id: Math.floor(Math.random() * 10000), // Id gerado aleatoriamente
            adm: false // Garantir que adm seja false
        };
        addUser(completeUser);
        navigate('/');
        openModal()
        setNewUser({
            id: 0,
            nome: '',
            foto: '',
            email: '',
            senha: '',
            cpf:'',
            adm: false
        });
    };

    return (
        <div className="register-container">
            <div className="left-side">
                <img className='logotest' src='..\public\logo em branco.png' alt="Company" />
            </div>
            <div className="register-right">
                <h2>Seja bem-vindo(a)!</h2>
                <p>Para acessar o nosso Portal do Cliente, crie sua conta informando seus dados abaixo!</p>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="fullName">Nome Completo</label>
                        <input type="text" id="fullName" name="nome" onChange={handleInputChange} value={newUser.nome} placeholder="Digite aqui..." required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">E-mail</label>
                        <input type="email" id="email" name="email" onChange={handleInputChange} value={newUser.email} placeholder="Digite aqui..." required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="cpf">CPF</label>
                        <input type="text" id="cpf" placeholder="Digite aqui..." />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Senha</label>
                        <input type="password" id="password" name="senha" onChange={handleInputChange} value={newUser.senha} placeholder="Digite aqui..." required />
                    </div>
                      <button type="submit" className="register-button">Criar Conta</button>
                      <div>
                        {/* Verifica se o email está preenchido */}
                        {newUser.email !== '' ? (
                          <Link to='/'></Link> // Se tiver email, vai para o Dashboard
                        ) : (
                          <Link to='/register'>Register</Link> // Se não tiver email, vai para o Register
                        )}
                      </div>
                    
                </form>
            </div>
        </div>
    );
}

export default RegisterForm;
