import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import MainRouter from "./routes/MainRouter";

export default function App() {
  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <MainRouter />
    </MantineProvider>
  );
}
