import React, { useState } from 'react';
import { TextField, Button } from '@mui/material'; // Eliminar FormHelperText

interface Props {
  onSubmit: (dni: string) => void;
}

const DniForm: React.FC<Props> = ({ onSubmit }) => {
  const [dni, setDni] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDni(event.target.value);
    setError(null); // Limpiar el error al escribir
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Validar que el DNI tenga 8 dígitos
    if (dni.length!== 8 ||!/^\d+$/.test(dni)) {
      setError('Ingrese un DNI válido (8 dígitos numéricos)');
      return;
    }

    onSubmit(dni);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Ingrese el DNI"
        variant="outlined"
        type="number"
        inputProps={{ pattern: '*' }} // Permite solo números
        value={dni}
        onChange={handleChange}
        error={!!error} // Mostrar error si existe
        helperText={error} // Mostrar mensaje de error
        sx={{
          input: { color: 'white' },
        }}
      />
      <Button variant="contained" color="primary" type="submit">
        Consultar
      </Button>
    </form>
  );
};

export default DniForm;