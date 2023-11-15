import PacketContainer from "./components/PacketContainer";
import PacketCanvas from "./components/PacketCanvas";
import StartStopGroup from "./components/StartStopGroup";
import FilterInput from "./components/FilterInput";
import CustomPackets from "./components/CustomPackets";
import MaliciousChecks from "./components/MaliciousChecks";

function App() {
  return (
    <div style={{ height: "100vh" }}>
      <CustomPackets />
      <MaliciousChecks />
    </div>
  );
}

export default App;
