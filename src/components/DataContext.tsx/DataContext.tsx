import React, { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import { User, Car } from './types';

interface DataContextProps {
    children: ReactNode;
}

interface DataContextValue {
    users: User[];
    setUsers: React.Dispatch<React.SetStateAction<User[]>>;
    cars: Car[];
    setCars: React.Dispatch<React.SetStateAction<Car[]>>;
    addUser: (user: User) => void;
    login: (username: string, password: string) => boolean;
    logout: () => void;
    authenticatedUser: User | null;
    branchOptions: string[];
}

export const DataContext = createContext<DataContextValue | undefined>(undefined);

const DataProvider: React.FC<DataContextProps> = ({ children }) => {
    const [users, setUsers] = useState<User[]>([
        {
            id: 1,
            nome: 'João Silva',
            foto: '..\public\logo em branco.png',
            email: 'joao@example.com',
            senha: 'senha123',
            cpf: '87643345789',
            adm: false
        },
        {
            id: 2,
            nome: 'Maria Souza',
            foto: 'url_da_foto',
            email: 'maria@example.com',
            senha: 'senha456',
            cpf: '87643345789',
            adm: true
        }
        // Adicione mais usuários conforme necessário
    ]);

    const [cars, setCars] = useState<Car[]>([
        {
            id: 1,
            categoria: 'Econômico',
            marca: 'Renault',
            nome: 'Kwid',
            foto: 'https://imgs.search.brave.com/ndXdr5BtJuoOUIfhXoVcVLhDrWLOJzuQzxE5SiIiZWA/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/b2x4LmNvbS5ici9p/bWFnZXMvOTIvOTI4/NDc5MjU4ODkyMTU5/LmpwZw',
            disponivel: true,
            dataDeEntrega: new Date('2024-07-06'),
            filial: 'Galeão',
            portas: 4,
            transmissao: 'manual',
            freio: 'abs',
            numeroDePessoas: 5,
            airbag: 'airbag duplo frontal',
            arCondiconado: 'com',
            latitude: 1,
            longitude: 3,
            precoDiario: 50,
        },
        {
            id: 2,
            categoria: 'Sedan',
            marca: 'Nissan',
            nome: 'Versa',
            foto: 'https://www.nissanseijin.com.br/wp-content/uploads/2021/05/NTn7g3jmTA5fLrcpOk2YDiz1PuVbnOlS85FCQT21.jpeg',
            disponivel: false,
            dataDeEntrega: new Date('2024-07-08'),
            filial: 'Barra',
            portas: 4,
            transmissao: 'automatico',
            freio: 'abs',
            numeroDePessoas: 5,
            airbag: 'airbag duplo frontal',
            arCondiconado: 'com',
            latitude: 1,
            longitude: 3,
            precoDiario: 50,
        },
        {
            id: 3,
            categoria: 'Sport',
            marca: 'Porshe',
            nome: 'Cayman',
            foto: 'https://i.pinimg.com/originals/cf/04/43/cf0443a2dfdd1cb3815cc1fa8375283a.png',
            disponivel: false,
            dataDeEntrega: new Date('2024-07-08'),
            filial: 'Santos Drumont',
            portas: 4,
            transmissao: 'automatico',
            freio: 'abs',
            numeroDePessoas: 5,
            airbag: 'airbag duplo frontal',
            arCondiconado: 'dual zone',
            latitude: 1,
            longitude: 3,
            precoDiario: 50,
        },
        {
            id: 4,
            categoria: 'SUV',
            marca: 'Nissan',
            nome: 'Kicks',
            foto: 'https://carneironissan.com.br/wp-content/uploads/2021/03/KIcks_EXCLUSIVE_PackTech_MY22_Frente_Motorista_AzulTetoPreto_1200x720.png.ximg_.c1h.360.png',
            disponivel: true,
            dataDeEntrega: new Date('2024-07-08'),
            filial: 'Galeão',
            portas: 4,
            transmissao: 'automatico',
            freio: 'abs',
            numeroDePessoas: 5,
            airbag: 'airbag duplo frontal',
            arCondiconado: 'com',
            latitude: 1,
            longitude: 3,
            precoDiario: 50,
        },
        {
            id: 5,
            categoria: 'Muscle',
            marca: 'Chevrolet',
            nome: 'Opala',
            foto: 'https://estofariabrasil.com.br/wp-content/uploads/2020/09/Opala-Comodoro-02.png',
            disponivel: false,
            dataDeEntrega: new Date('2024-07-08'),
            filial: 'Galeão',
            portas: 4,
            transmissao: 'manual',
            freio: 'abs',
            numeroDePessoas: 5,
            airbag:'airbag duplo frontal',
            arCondiconado: 'sem',
            latitude: 1,
            longitude: 3,
            precoDiario: 50,
        },
        {
            id: 6,
            categoria: 'HatchBack',
            marca: 'Jac',
            nome: 'J3s',
            foto: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh_PbwW3pWFxdO0SP-mPkGSv6PdXDVBfieKPFBTZSG1LE3vepmfHlOEOZ1A9IkAYBBxqm2qFg-RlavSBXvCjLsFl2ngNrApy49p9Jon5mpJGpKGtZU7Mk0Gwh6fxJnaYjLMKIcPlMSIXx8/s1600/novo-Jac-j3-2014+(9).jpg',
            disponivel: true,
            dataDeEntrega: new Date('2024-07-08'),
            filial: 'Galeão',
            portas: 4,
            transmissao: 'manual',
            freio: 'abs',
            numeroDePessoas: 5,
            airbag: 'airbag duplo frontal',
            arCondiconado: 'com',
            latitude: 1,
            longitude: 3,
            precoDiario: 50,
        },
        
        // Adicione mais carros conforme necessário
    ]);
    
    const addUser = (user: User) => {
        setUsers([...users, user]);
    };
    const [authenticatedUser, setAuthenticatedUser] = useState<User | null>(null);
    const [branchOptions, setBranchOptions] = useState<string[]>([]);
    useEffect(() => {
        const uniqueBranches = Array.from(new Set(cars.map(car => car.filial)));
        setBranchOptions(uniqueBranches);
    }, [cars]);

    const login = (username: string, password: string): boolean => {
        const user = users.find(user => user.email === username && user.senha === password);
        if (user) {
            setAuthenticatedUser(user);
            return true;
        }
        return false;
    };

    const logout = () => {
        setAuthenticatedUser(null);
    };

    return (
        <DataContext.Provider value={{ users, setUsers, cars, setCars, addUser, login, logout, authenticatedUser, branchOptions }}>
            {children}
        </DataContext.Provider>
    );
};

const useDataContext = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useDataContext must be used within a DataProvider');
    }
    return context;
};

export { DataProvider, useDataContext };
