// CheckoutModal.tsx
import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import { Car } from '../DataContext.tsx/types';
import { Dayjs } from 'dayjs';


interface CheckoutModalProps {
    open: boolean;
    onClose: () => void;
    car: Car | null;
    data: number | null;
    onConfirmReservation: (carId: number, available: boolean) => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ open, onClose, car, data, onConfirmReservation }) => {
    const handleConfirmReservation = () => {
        if (car) {
            onConfirmReservation(car.id, false);
            onClose();
        }
    };
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
            }}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Checkout
                </Typography>
                {car && (
                    <Typography>
                        Você está reservando o carro: {car.nome} na filial {car.filial} por {data} dias
                    </Typography>
                )}
                {/* Adicione aqui os campos de checkout necessários */}
                <Button onClick={handleConfirmReservation} variant="contained" color="primary" sx={{ mt: 2 }}>
                    Confirmar Reserva
                </Button>
            </Box>
        </Modal>
    );
};

export default CheckoutModal;
