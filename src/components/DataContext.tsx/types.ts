export interface User {
    id: number;
    nome: string;
    foto: string;
    email: string;
    senha: string;
    cpf: string,
    adm: boolean;
}

export interface Car {
    id: number;
    categoria: 'Econômico' | 'SUV' | 'HatchBack' | 'Muscle' | 'Sedan' | 'Sport';
    marca: string;
    nome: string;
    foto: string;
    disponivel: boolean;
    dataDeEntrega: Date;
    filial: string;
    portas: number;
    transmissao: 'automatico' | 'manual';
    freio: 'abs' | 'tambor';
    numeroDePessoas: number;
    airbag: 'airbag duplo frontal' | 'airbag de cortina lateral' | 'sem airbag';
    arCondiconado: 'sem' | 'dual zone' | 'com'
    latitude: number
    longitude: number,
    precoDiario: number,
}
