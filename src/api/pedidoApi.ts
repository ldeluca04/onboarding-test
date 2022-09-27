import { FormData } from "components/PedidoForm";
import {
  postPedidoRequest,
  postPedidoSuccess,
  postPedidoFailure,
  getPedidoRequest,
  getPedidoSuccess,
  getPedidoFailure,
} from "redux/pedido/pedidoSlice";
import { instance, configuration } from "./ServiceBase";

//Thunk Obtener Pedido
const getPedido = (id: string) => {
  return async (dispatch: any) => {
    dispatch(getPedidoRequest());
    await instance
      .get(`${configuration.baseURL}${id}`)
      .then((response) => {
        if (response.status == 200) {
          dispatch(getPedidoSuccess(response.data));
        } else {
          dispatch(getPedidoFailure("Error al obtener el pedido"));
        }
      })
      .catch((error) => {
        dispatch(getPedidoFailure("Error al obtener el pedido"));
      });
  };
};

//Thunk Post Pedido
const postPedido = (objPedido: FormData) => {
  return async (dispatch: any) => {
    dispatch(postPedidoRequest());
    await instance
      .post(`${configuration.baseURL}`, objPedido)
      .then((response) => {
        if (response.status == 201) {
          dispatch(postPedidoSuccess(response.data));
        } else {
          dispatch(postPedidoFailure("Error al guardar el pedido"));
        }
      })
      .catch((error) => {
        dispatch(postPedidoFailure("Error al guardar el pedido"));
      });
  };
};

export { getPedido, postPedido };
