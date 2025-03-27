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
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import PendingActionsIcon from "@mui/icons-material/PendingActions";

interface Props {
  data: any;
  error: string | null;
}

const Results: React.FC<Props> = ({ data, error }) => {
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
        </>
      ) : null}
    </Box>
  );
};

export default Results;
