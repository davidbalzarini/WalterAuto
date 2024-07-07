import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Car } from '../DataContext.tsx/types';
import './Card.css';
import { makeStyles } from '@mui/material';
import { useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import BranchLocationModal from '../modalMapa/CheckOut';
import { Dayjs } from 'dayjs';


interface cardProps{
car: Car
onReserveNow: () => void;
data: number | null;
onConfirmReservation: (carId: number, available: boolean) => void;
}

export default function MediaCard({car, data, onConfirmReservation}:cardProps) {
    const [isFlipped, setIsFlipped] = useState(false);
    const handleFlip = () => {
        setIsFlipped(!isFlipped);
      };
    

      
      const [selectedCar, setSelectedCar] = useState<Car | null>(null);
      const [openModal, setOpenModal] = useState(false);
  
      const handleReserveClick = (car: Car) => {
          setSelectedCar(car);
          setOpenModal(true);
      };
  
      const handleCloseModal = () => {
          setOpenModal(false);
      };
  return (
    <Card sx={{ width: 300 }} key="front">
        <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
        <div key='front'>
        <h2 className='h5t'>
            Categoria: {isFlipped ? <h2>virou</h2> : car.categoria}
        </h2>
        <CardMedia
            component="img"
            sx={{objectFit: 'contain', width: '100%', height: 225 }}
            image={car.foto}
            title={car.marca}
        />
        <CardContent>
            <Typography gutterBottom variant="h5" component="div">
            {car.nome}
            </Typography>
            <button onClick={handleFlip}>
                <Typography variant="body2" color="text.secondary" style={{ textDecoration: 'underline' }} >
                mostrar mais detalhes
                </Typography>
            </button>
        
        </CardContent>
        <div>
            <button className='buttont' onClick={() => handleReserveClick(car)}>Reservar agora!</button>
        </div>
        </div>    
            <div key="back">
        <h3 className='h5t'>
            Características
        </h3>
        <CardContent>
            <Typography gutterBottom variant="h6" component="div">
            {car.categoria}
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
            {car.arCondiconado === 'sem' ? '' : car.arCondiconado === 'com' ? 'Ar condicionado' : 'Ar condicionado dual zone'}
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
            {car.airbag === 'sem airbag' ? '' : car.airbag}
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
            {car.numeroDePessoas} portas
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
            {car.transmissao}
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
            R$ {car.precoDiario} por dia
            </Typography>
            <button onClick={handleFlip}>
                <Typography variant="body2" color="text.secondary" style={{ textDecoration: 'underline' }} >
                voltar
                </Typography>
            </button>
        
        </CardContent>
        </div>
    
        </ReactCardFlip>
        <BranchLocationModal
                open={openModal}
                onClose={handleCloseModal}
                car={selectedCar}
                data={data}
                onConfirmReservation={onConfirmReservation}
            />
    </Card>
        

  );
}
