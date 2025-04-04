import { useStampStore } from "@/store/stampStore";

interface StampType {
  index: number;
  stampUrl: string;
  removeStampHandler: (index: number) => void;
}

const Stamp: React.FC<StampType> = ({ index, stampUrl, removeStampHandler }) => {
  const { stamps, addStamps, removeStamp } = useStampStore();

  return (
    <div key={index} style={{ position: "relative", margin: "10px", textAlign: "center" }}>
      <img src={stampUrl} alt={`Stamp ${index + 1}`} style={{ maxWidth: "80px", height: "auto" }} />
      <button onClick={() => removeStampHandler(index)} style={{ position: "absolute", bottom: "5px", right: "10px" }}>
        삭제
      </button>
    </div>
  );
};

export default Stamp;
