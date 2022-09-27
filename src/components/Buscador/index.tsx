import { DescriptionCard, IconButton } from "@architecture-it/stylesystem";
import { faUserCircle } from "@fortawesome/pro-light-svg-icons";
import { faCheckDouble } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Container, Grid, Link, Paper, Skeleton, Stack, Typography } from "@mui/material";
import { getPedido } from "api/pedidoApi";
import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { RootState } from "redux/store";

const Buscador = () => {
  const isLoadingPost = useAppSelector((state: RootState) => state.pedido.isLoading);
  const dataPost = useAppSelector((state: RootState) => state.pedido.data);
  const errorPost = useAppSelector((state: RootState) => state.pedido.error);
  const dispatch = useAppDispatch();
  let { id } = useParams();

  //loading para el skeleton
  const [loadin, setLoadin] = useState(true);

  const loader = () => {
    return (
      <Fragment>
        <Container maxWidth="lg">
          <Paper
            elevation={3}
            sx={{
              color: "#666666",
              fontWeight: "bold",
            }}
          >
            <Grid container spacing={0}>
              <Grid item xs={6}>
                <Skeleton />
              </Grid>
              <Grid
                item
                xs={6}
                sx={{
                  alignItems: "right",
                  alignContent: "right",
                  display: "flex",
                  justifyContent: "right",
                }}
              >
                <Skeleton />
              </Grid>
              <Grid item xs={12}>
                <Box
                  sx={{
                    width: "100%",
                    height: 300,
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                    backgroundColor: "#e0e0e0",
                  }}
                >
                  <Stack>
                    <Box
                      sx={{
                        width: 70,
                        borderRadius: "50%",
                        height: 70,
                        backgroundColor: "#FFF",
                        alignItems: "center",
                        justifyContent: "center",
                        display: "flex",
                      }}
                    >
                      <Skeleton />
                    </Box>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        marginTop: "5px",
                        color: "white",
                      }}
                    >
                      <Skeleton />
                    </Typography>
                  </Stack>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Skeleton />
              </Grid>
              <Grid
                item
                xs={6}
                sx={{
                  alignItems: "right",
                  alignContent: "right",
                  display: "flex",
                  justifyContent: "right",
                }}
              >
                <Skeleton />
              </Grid>
            </Grid>
          </Paper>
          <Grid
            sx={{
              alignItems: "right",
              marginTop: "10px",
              width: "100%",
              display: "flex",
              justifyContent: "right",
            }}
          >
            <Link href="/pedido/">
              <Skeleton />
            </Link>
          </Grid>
        </Container>
      </Fragment>
    );
  };

  useEffect(() => {
    //UTILIZO EL SET TIMEOUT PARA MOSTRAR EL SKELETON, PORQUE LA RESPUESTA ES RÁPIDA Y NO LLEGA A APRECIARSE
    setTimeout(() => {
      setLoadin(false);
    }, 2000);
    if (!id) id = "";
    dispatch(getPedido(id));
  }, []);

  if (loadin) {
    return loader();
  } else {
    return (
      <Fragment>
        <Container maxWidth="lg">
          <Paper
            elevation={3}
            sx={{
              color: "#666666",
              fontWeight: "bold",
            }}
          >
            <Grid container spacing={0}>
              <Grid item xs={6}>
                Pedido
              </Grid>
              <Grid
                item
                xs={6}
                sx={{
                  alignItems: "right",
                  alignContent: "right",
                  display: "flex",
                  justifyContent: "right",
                }}
              >
                {"#" + dataPost.numeroDePedido}
              </Grid>
              <Grid item xs={12}>
                <Box
                  sx={{
                    width: "100%",
                    height: 300,
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                    backgroundColor: "#FFC350",
                  }}
                >
                  <Stack>
                    <Box
                      sx={{
                        width: 70,
                        borderRadius: "50%",
                        height: 70,
                        backgroundColor: "#FFF",
                        alignItems: "center",
                        justifyContent: "center",
                        display: "flex",
                      }}
                    >
                      <FontAwesomeIcon icon={faCheckDouble} size="2x" />
                    </Box>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        marginTop: "5px",
                        color: "white",
                      }}
                    >
                      {dataPost.estadoDelPedido}
                    </Typography>
                  </Stack>
                </Box>
              </Grid>
              <Grid item xs={6}>
                {"Cuenta Corriente " + dataPost.cuentaCorriente}
              </Grid>
              <Grid
                item
                xs={6}
                sx={{
                  alignItems: "right",
                  alignContent: "right",
                  display: "flex",
                  justifyContent: "right",
                }}
              >
                {dataPost.cuando}
              </Grid>
            </Grid>
          </Paper>
          <Grid
            sx={{
              alignItems: "right",
              marginTop: "10px",
              width: "100%",
              display: "flex",
              justifyContent: "right",
            }}
          >
            <Link href="/pedido/">Volver</Link>
          </Grid>
        </Container>
      </Fragment>
    );
  }
};

export default Buscador;
