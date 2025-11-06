import { useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Results from "./components/Results";
import { lightTheme, darkTheme } from "./theme";
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import NightlightRoundIcon from '@mui/icons-material/NightlightRound';

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const handleThemeChange = () => {
    setDarkMode((prev) => !prev);
  };

  const currentTheme = darkMode ? darkTheme : lightTheme;

  //verificación de DNI
  const [dni, setDni] = useState<string>("");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Manejo del cambio en el input
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDni(event.target.value);
    setError(null); // Limpiar errores al escribir
  };

  // Manejo del submit del formulario
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null); // Limpia el error antes de iniciar la búsqueda
    setData(null); // Limpia los datos previos

    // Validar el DNI antes de consultar
    if (dni.length !== 8 || !/^\d+$/.test(dni)) {
      setError("Ingrese un DNI válido (8 dígitos numéricos)");
      return;
    }

    setLoading(true);

    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await axios.get(`${apiUrl}?dni=${dni}`);
      console.log("Respuesta API:", response.data); // Para depuración

      if (response.data.error) {
        setError(response.data.error);
      } else {
        setData(response.data);
      }
    } catch (err) {
      setError("Error al conectar con el servidor. Verifique su conexión.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <Container
        maxWidth="sm"
        sx={{
          bgcolor: "background.paper",
          color: "text.primary",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "10px",
          padding: "20px",
          position: "relative",
        }}
      >
        {/* Botón del tema */}
        <Box sx={{ position: "absolute", top: "1rem", right: "1rem" }}>
          <IconButton onClick={handleThemeChange} color="inherit">
            {darkMode ? <WbSunnyIcon /> : <NightlightRoundIcon />}
          </IconButton>
        </Box>

        <img
            src={darkMode ? "./logo_cedsa_white.png" : "./logo_cedsa.png"}
            alt="Logo de CEDSa"
            style={{ maxWidth: "200px", marginBottom: "20px" }}
        />


        <Typography
          variant="h5"
          component="h3"
          gutterBottom
          sx={{ textAlign: "center" }}
        >
          VERIFICACIÓN DE CERTIFICADO
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "100%",
          }}
        >
          <TextField
            label="Ingrese el DNI"
            variant="outlined"
            type="number"
            inputProps={{ min: 10000000, max: 99999999 }}
            value={dni}
            onChange={handleChange}
            error={!!error}
            sx={{
              input: { color: "#607D8B" },
            }}
          />
          <Button variant="contained" color="primary" type="submit" disabled={loading}>
            Consultar
          </Button>
        </Box>

        {loading && (
          <Box sx={{ display: "flex", alignItems: "center", marginTop: "10px" }}>
            <CircularProgress size={20} sx={{ marginRight: "10px" }} />
            <Typography variant="body2">Buscando...</Typography>
          </Box>
        )}

        {(data || error) && <Results data={data} error={error} />}

        <Typography variant="body2" sx={{ marginTop: "20px", textAlign: "center" }}>
          Sistema de Gestión Institucional. © CEDSa {new Date().getFullYear()}. 
        </Typography>
      </Container>
    </ThemeProvider>
  );
};

export default App;
