import Box from "@mui/material/Box";
import logo from "../../assets/logo.png";

const HEIGHT = 60;
const WIDTH = 60;

export function Logo({ height = HEIGHT, width = WIDTH }) {
  return (
    <Box alt="logo" component="img" height={height} src={logo} width={width} />
  );
}
