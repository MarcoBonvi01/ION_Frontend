import * as React from "react";
import notFoundLottie from "../../assets/lotties/not_found_lottie.json";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Lottie from "lottie-react";
import { RouterLink } from "../../components/core/link";
import { paths } from "../../paths";

export function NotFoundPage() {
  return (
    <React.Fragment>
      <Box
        component="main"
        sx={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          minHeight: "100%",
          py: "32px",
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={6}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Lottie
                animationData={notFoundLottie}
                loop={true}
                style={{ width: 400, height: 400 }}
              />
            </Box>
            <Stack spacing={1} sx={{ textAlign: "center" }}>
              <Typography variant="h4">
                Ops, la pagina che stai cercando non esiste!
              </Typography>
              <Typography color="text.secondary">
                La pagina che stai cercando potrebbe essere stata rimossa, aver
                cambiato nome o non essere temporaneamente disponibile.
              </Typography>
            </Stack>

            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button
                component={RouterLink}
                href={paths.home.portfolio}
                variant="outlined"
              >
                Torna alla home
              </Button>
            </Box>
          </Stack>
        </Container>
      </Box>
    </React.Fragment>
  );
}
