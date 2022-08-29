import "./App.css";
import DisplayUser from "./components/DisplayUser";
import TokenCreation from "./components/TokenCreation";
import { ContextProvider } from "./contexts/Context";

function App() {
  return (
    <ContextProvider>
      <div className="App">
        <TokenCreation />
        <DisplayUser />
      </div>
    </ContextProvider>
  );
}

export default App;
