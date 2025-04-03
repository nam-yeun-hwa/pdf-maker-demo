import PDFStampComponent from "@/components/PDFStampComponent";
import SelectedPdfCanvas from "@/components/SelectedPdfCanvas";
import PdfThumbnailViewer from "@/components/PdfThumbnailViewer";

import "@/assets/css/App.css";

function App() {
  return (
    <div id="app">
      <div>
        <PDFStampComponent />
        <SelectedPdfCanvas />
        <PdfThumbnailViewer />
      </div>
    </div>
  );
}

export default App;
