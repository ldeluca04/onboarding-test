import { Typography } from "@mui/material";
import styles from "./Pedido.module.scss";
import PedidoForm from "components/PedidoForm";
import { Container } from "@mui/system";
import { MainCard } from "@architecture-it/stylesystem";

const Pedido = () => {
  return (
    <Container maxWidth="lg">
      <MainCard
        buttonText="¡Quiero buscar un pedido ahora!"
        imageProps={{
          alt: "Pedidos",
          src: "https://a.storyblok.com/f/63950/1049x493/86e1e94375/turnos.png",
        }}
        onClick={() => {}}
        principalText="Pedidos Andreani"
        secondaryText="¿Sabías que podés buscar tus pedidos desde nuestra aplicación Andreani?"
        type="left"
      />
      <Typography variant="h1" sx={{ paddingBottom: 5, paddingTop: 3 }}>
        Crear Pedido
      </Typography>
      <PedidoForm />
    </Container>
  );
};

export default Pedido;
