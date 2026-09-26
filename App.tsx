import { Provider } from "react-redux";

import AppNavigator from "./src/navigation/AppNavigator";
import { AppProvider } from "./src/context/AppContext";
import { ThemeProvider } from "./src/context/ThemeContext";
import { store } from "./src/store/store";

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <AppProvider>
          <AppNavigator />
        </AppProvider>
      </ThemeProvider>
    </Provider>
  );
}
