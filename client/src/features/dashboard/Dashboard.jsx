import { Card, CardContent, Typography, Grid, Box } from '@mui/material';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryPie } from 'victory';

// Datos simulados
const alojamientosMasReservados = [
  { nombre: 'Producto A', reservas: 120 },
  { nombre: 'Producto B', reservas: 95 },
  { nombre: 'Producto C', reservas: 80 },
];

const clientesTop = [
  { nombre: 'Juan Pérez', compras: 15 },
  { nombre: 'Ana Gómez', compras: 12 },
  { nombre: 'Carlos Ruiz', compras: 10 },
];

const reservasPorMes = [
  { mes: 'Ene', reservas: 30 },
  { mes: 'Feb', reservas: 45 },
  { mes: 'Mar', reservas: 60 },
  { mes: 'Abr', reservas: 80 },
  { mes: 'May', reservas: 70 },
  { mes: 'Jun', reservas: 90 },
];

const comprasInconclusas = 7;

const Dashboard = () => {
  return (
    <>
      // TODO: Implementar pantallas del dashboard
    </>
  );
};

export default Dashboard;