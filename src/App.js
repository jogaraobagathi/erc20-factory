import "./App.css";
import DisplayUser from "./components/DisplayUser";
import { Interaction } from "./components/Interaction";
import TokenCreation from "./components/TokenCreation";
import { ContextProvider } from "./contexts/Context";

function App() {
  return (
    <ContextProvider>
      <div className="App">
        <TokenCreation />
        <DisplayUser />
        <Interaction />
      </div>
    </ContextProvider>
  );
}

export default App;
