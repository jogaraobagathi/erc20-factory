import "./App.css";
import TokenCreation from "./components/TokenCreation";
import { ContextProvider } from "./contexts/Context";

function App() {
  return (
    <ContextProvider>
      <div className="App">
        <TokenCreation />
      </div>
    </ContextProvider>
  );
}

export default App;
