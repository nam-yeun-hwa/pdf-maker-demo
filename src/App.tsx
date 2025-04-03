import A from "./components/A";
import B from "./components/B";
import StampUploader from "./components/StampUploader";

import "@/assets/css/App.css";

function App() {
  return (
    <div id="app">
      <div>
        <A />
        <B />
        <StampUploader />
      </div>
    </div>
  );
}

export default App;
