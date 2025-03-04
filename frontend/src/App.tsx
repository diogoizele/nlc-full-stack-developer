import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router";
import { ThemeProvider } from "styled-components";

import { Router } from "./routes";
import { GlobalStyles } from "./styles/global.styles";

import { queryClient } from "./api/base/client";
import { Loading } from "./components/loading";
import { theme } from "./styles/theme/default";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Loading />
        <Toaster position="top-right" reverseOrder={false} />
        <BrowserRouter>
          <GlobalStyles />
          <Router />
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
