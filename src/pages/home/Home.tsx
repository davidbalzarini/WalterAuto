import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../../components/DataContext.tsx/DataContext";
import { Car } from "../../components/DataContext.tsx/types";
import { Grid, MenuItem, Select, Typography, FormControl, InputLabel, SelectChangeEvent, TextField, TextFieldProps, Box } from "@mui/material";
import './Home.css';
import MediaCard from "../../components/card/Card";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import dayjs, { Dayjs } from 'dayjs';
import CheckoutModal from "../../components/modalMapa/CheckOut";

function Home() {

    const { cars, branchOptions, setCars } = useContext(DataContext)!;
    const [selectedBranch, setSelectedBranch] = useState<string>('');
    const [selectedCar, setSelectedCar] = useState<Car | null>(null);
    const [checkoutOpen, setCheckoutOpen] = useState<boolean>(false);

    const updateCarAvailability = (carId: number, available: boolean) => {
        setCars(prevCars =>
            prevCars.map(car =>
                car.id === carId ? { ...car, disponivel: available } : car
            )
        );
    };

    const handleReserveNow = (car: Car) => {
        setSelectedCar(car);
        setCheckoutOpen(true);
    };

    const handleCheckoutClose = () => {
        setCheckoutOpen(false);
    };
    

    const filteredCars = selectedBranch
        ?  cars.filter(car => car.filial === selectedBranch && car.disponivel === true)  
        : cars.filter(car => car.disponivel === true);

    const handleBranchChange = (event: SelectChangeEvent<string>) => {
        setSelectedBranch(event.target.value);
    };

    const [selectedDateInicial, setSelectedDateInicial] = React.useState<Dayjs | null>(null);
    const [selectedDateEnd, setSelectedDateEnd] = React.useState<Dayjs | null>(null);
    const [nD, setND] = useState<number | null>(null);

    const calculateDaysDifference = (startDate: Dayjs | null, endDate: Dayjs | null): number => {
        if (!startDate || !endDate) return 0;
        return endDate.diff(startDate, 'day');
    };

    useEffect(() => {
        if (selectedDateInicial && selectedDateEnd) {
            setND(calculateDaysDifference(selectedDateInicial, selectedDateEnd));
        }
    }, [selectedDateInicial, selectedDateEnd]);

    return (
        <div>
            <h1 className='teste'>Carros</h1>
            <Box className='testeS'>
                <FormControl variant="outlined" sx={{ m: 1, marginRight: 5,minWidth: 300 }}>
                    <InputLabel id="branch-label">Escolha a filial</InputLabel>
                    <Select
                        labelId="branch-label"
                        id="branch"
                        value={selectedBranch}
                        onChange={handleBranchChange}
                        label="Escolha a filial"
                    >
                        {branchOptions.map((branch, index) => (
                            <MenuItem key={index} value={branch}>{branch}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <LocalizationProvider dateAdapter={AdapterDayjs} >
                    <DatePicker label='Data check-in' value={selectedDateInicial} onChange={(newValue) => setSelectedDateInicial(newValue)} sx={{ m: 1,  marginRight: 5, minWidth: 300 }}/>
                    <DatePicker label='Data check-out' value={selectedDateEnd} onChange={(newValue) => setSelectedDateEnd(newValue)} sx={{ m: 1, minWidth: 300 }}/>
                </LocalizationProvider>  
            </Box>
            <Grid container spacing={3} className="a">
                {filteredCars.map((car: Car) => (
                    <Grid item xs={3} key={car.id} style={{ margin: '0 30px' }}>
                        <MediaCard car={car} onReserveNow={() => handleReserveNow(car)} data={nD} onConfirmReservation={updateCarAvailability}/>
                    </Grid>
                ))}
            </Grid>
            <CheckoutModal
                open={checkoutOpen}
                car={selectedCar}
                onClose={handleCheckoutClose}
                data={nD}
                onConfirmReservation={updateCarAvailability} // Pass the confirmation handler
            />
        </div>
    );
}

export default Home;
