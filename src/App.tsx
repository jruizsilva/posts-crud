import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import MainRouter from "./routes/MainRouter";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";

export default function App() {
  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <Notifications />
      <ModalsProvider>
        <MainRouter />
      </ModalsProvider>
    </MantineProvider>
  );
}
