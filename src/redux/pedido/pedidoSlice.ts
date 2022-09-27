import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { FormData } from "components/PedidoForm";

type PedidoType = {
  pedidoId: string;
  id: string;
  numeroDePedido: number;
  cicloDePedido: string;
  codigoDeContratoInterno: number;
  estadoDelPedido: string;
  cuentaCorriente: number;
  cuando: string;
};

export interface PedidoState {
  isLoading: boolean;
  data: PedidoType;
  error: string;
}

const initialState: PedidoState = {
  isLoading: false,
  data: {
    pedidoId: "",
    id: "",
    numeroDePedido: 0,
    cicloDePedido: "",
    codigoDeContratoInterno: 0,
    estadoDelPedido: "",
    cuentaCorriente: 0,
    cuando: "",
  },
  error: "Sin Errores",
};

export const pedidoSlice = createSlice({
  name: "pedido",
  initialState,
  reducers: {
    postPedidoRequest: (state) => {
      state.isLoading = true;
      state.data = {
        pedidoId: "",
        id: "",
        numeroDePedido: 0,
        cicloDePedido: "",
        codigoDeContratoInterno: 0,
        estadoDelPedido: "",
        cuentaCorriente: 0,
        cuando: "",
      };
      state.error = "Sin Errores";
    },
    postPedidoSuccess: (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.data = action.payload;
      state.error = "Sin Errores";
    },
    postPedidoFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
      state.data = {
        pedidoId: "",
        id: "",
        numeroDePedido: 0,
        cicloDePedido: "",
        codigoDeContratoInterno: 0,
        estadoDelPedido: "",
        cuentaCorriente: 0,
        cuando: "",
      };
    },
    getPedidoRequest: (state) => {
      state.isLoading = true;
      state.data = {
        pedidoId: "",
        id: "",
        numeroDePedido: 0,
        cicloDePedido: "",
        codigoDeContratoInterno: 0,
        estadoDelPedido: "",
        cuentaCorriente: 0,
        cuando: "",
      };
      state.error = "Sin Errores";
    },
    getPedidoSuccess: (state, action: PayloadAction<PedidoType>) => {
      state.isLoading = false;
      state.data = action.payload;
      state.error = "Sin Errores";
    },
    getPedidoFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
      state.data = {
        pedidoId: "",
        id: "",
        numeroDePedido: 0,
        cicloDePedido: "",
        codigoDeContratoInterno: 0,
        estadoDelPedido: "",
        cuentaCorriente: 0,
        cuando: "",
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  postPedidoRequest,
  postPedidoSuccess,
  postPedidoFailure,
  getPedidoRequest,
  getPedidoSuccess,
  getPedidoFailure,
} = pedidoSlice.actions;

export default pedidoSlice.reducer;
