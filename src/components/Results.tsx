import React from "react";
import {
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface Props {
  data: any;
  error: string | null;
}

const Results: React.FC<Props> = ({ data, error }) => {
  // ¿Algún curso está disponible?
  const hasDisponible =
    data &&
    Array.isArray(data.cursos) &&
    data.cursos.some((curso: any) => curso.estado === "DISPONIBLE");

  return (
    <Box sx={{ marginTop: "20px", width: "100%", flexDirection: "column" }}>
      {error && (
        <Alert severity="error" sx={{ marginBottom: "10px" }}>
          {error}
        </Alert>
      )}
      {data && data.cursos && data.cursos.length > 0 ? (
        <>
          <Typography
            variant="h4"
            component="h3"
            gutterBottom
            sx={{ fontWeight: "bold", textAlign: "center" }}
          >
            {data.nombre}
          </Typography>
          <List>
            {data.cursos.map((curso: any, index: number) => (
              <React.Fragment key={index}>
                <ListItem>
                  <ListItemIcon>
                    {curso.estado === "EN TRÁMITE" ? (
                      <PendingActionsIcon sx={{ color: "warning.main" }} />
                    ) : (
                      <CheckCircleOutlineIcon sx={{ color: "success.main" }} />
                    )}
                  </ListItemIcon>
                  <ListItemText
                    primary={curso.curso}
                    secondary={
                      <>
                        <Typography variant="body2" color="text.secondary">
                          Estado del título: {curso.estado}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Registro N°: {curso.registro}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Fecha de finalización: {curso.fecha_curso}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
                {index < data.cursos.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>

          {/* Acordeón solo si hay algún curso DISPONIBLE */}
          {hasDisponible && (
            <Accordion sx={{ marginTop: 2 }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography fontWeight="bold">
                  ¿Cómo retiro mi certificado?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" gutterBottom>
                  📌 <strong>Retiro de certificados</strong>
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Podés retirarlo en <strong>Zuviría 778</strong>
                </Typography>
                <Typography variant="body2" gutterBottom>
                  🕘 <strong>Horarios:</strong>
                  <br />
                  Lunes a viernes de 9:00 a 19:00 hs
                  <br />
                  Sábados de 9:00 a 13:00 hs
                </Typography>
                <Typography variant="body2" gutterBottom>
                  📩 En caso de enviar a otra persona, recordá que deberá
                  presentar una autorización impresa con los datos completos del
                  titular y de quien retira.
                </Typography>
                <Button
                  variant="outlined"
                  sx={{ marginTop: 1 }}
                  // url del generador de nota
                  href="https://cedsa.edu.ar/gen-nota-autorizacion/"
                  target="_blank" rel="noopener noreferrer"
                >
                  Necesito autorizar a otra persona
                </Button>
              </AccordionDetails>
            </Accordion>
          )}
        </>
      ) : null}
    </Box>
  );
};

export default Results;
