import "./App.css";
import Settings from "./Settings";
import Timer from "./Timer";
import { SettingsContext, useContext } from "./SettingsContext";

function App() {
  const { showSettings, setShowSettings, darkMode } =
    useContext(SettingsContext);

  return (
    <main
      className={`flex flex-col items-center justify-center min-h-screen min-w-full ${
        darkMode && "dark bg-gradient-to-t to-[#262a57] from-[#151932]"
      }`}
    >
      <div className="mb-8">
        <Timer setShowSettings={setShowSettings} darkMode={darkMode} />
      </div>
      {showSettings && (
        <div className="absolute top-0  left-0 w-full h-full flex justify-center items-center">
          <Settings className="bg-white p-4 z-10" darkMode={darkMode} />
        </div>
      )}
    </main>
  );
}

export default App;
