import PacketContainer from "./components/PacketContainer";
import PacketCanvas from "./components/PacketCanvas";
import StartStopGroup from "./components/StartStopGroup";
import FilterInput from "./components/FilterInput";

function App() {
  return (
    <div style={{ height: "100vh" }}>
      <StartStopGroup />
      <FilterInput />
    </div>
  );
}

export default App;
