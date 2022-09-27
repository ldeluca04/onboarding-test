import { Alert, Button, Input } from "@architecture-it/stylesystem";
import { Box, Container, Grid, LinearProgress, Link, Typography } from "@mui/material";
import { postPedido } from "api/pedidoApi";
import React, { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "redux/store";
import * as yup from "yup";

export type FormData = {
  cuentaCorriente: number;
  codigoDeContratoInterno: number;
};

let schema = yup.object().shape({
  cuentaCorriente: yup.number().required().positive().integer(),
  codigoDeContratoInterno: yup.number().required().positive().integer(),
});

const PedidoForm = () => {
  const isLoadingPost = useAppSelector((state: RootState) => state.pedido.isLoading);
  const dataPost = useAppSelector((state: RootState) => state.pedido.data);
  const errorPost = useAppSelector((state: RootState) => state.pedido.error);
  const dispatch = useAppDispatch();
  const [validacion, setValidacion] = useState(true);
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit = handleSubmit((data) => {
    console.log(data);
    schema.isValid(data).then(function (valid) {
      console.log("validacion", valid);
      if (valid) {
        //true -> llamar API
        dispatch(postPedido(data));
      }
      setValidacion(valid);
    });
  });

  return (
    <Fragment>
      <Container maxWidth="lg">
        <form onSubmit={onSubmit}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              {!validacion ? (
                <Alert color="info" onCloseProp={() => setValidacion(true)} open variant="standard">
                  <Typography variant="subtitle2">
                    Los campos solicitados son obligatorios y deben ser numéricos.
                  </Typography>
                </Alert>
              ) : (
                ""
              )}
              {isLoadingPost ? (
                <Box sx={{ width: "100%" }}>
                  <LinearProgress />
                </Box>
              ) : (
                ""
              )}
            </Grid>
            <Grid item xs={6}>
              <Input
                sx={{ width: "425px" }}
                label="Cuenta Corriente"
                {...register("cuentaCorriente")}
              />
            </Grid>
            <Grid item xs={6}>
              <Input
                sx={{ width: "425px" }}
                label="Codigo de Contrato Interno"
                {...register("codigoDeContratoInterno")}
              />
            </Grid>
            <Grid item xs={3}>
              <Button type="submit" color="primary" text="Guardar Pedido" variant="contained" />
            </Grid>
            <Grid item xs={9}>
              {dataPost.pedidoId ? (
                <Alert color="success" onCloseProp={() => {}} open variant="standard">
                  <Typography variant="subtitle2">
                    El pedido {dataPost.pedidoId} ha sido creado exitosamente
                  </Typography>
                  <Link href={`/pedido/${dataPost.pedidoId}`}>Ver Pedido</Link>
                </Alert>
              ) : (
                ""
              )}
              {errorPost != "Sin Errores" ? (
                <Alert color="error" onCloseProp={() => {}} open variant="outlined">
                  <Typography variant="subtitle2">{errorPost}</Typography>
                </Alert>
              ) : (
                ""
              )}
            </Grid>
          </Grid>
        </form>
      </Container>
    </Fragment>
  );
};

export default PedidoForm;
