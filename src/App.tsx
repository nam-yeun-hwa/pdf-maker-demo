import StampController from "@/components/StampController";
import PdfSelectViewer from "@/components/PdfSelectViewer";
import PdfThumbnailViewer from "@/components/PdfThumbnailViewer";

import "@/assets/css/App.css";

function App() {
  return (
    <div id="app">
      <div>
        <StampController />
        <PdfSelectViewer />
        <PdfThumbnailViewer />
      </div>
    </div>
  );
}

export default App;
