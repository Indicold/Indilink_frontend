import { Button } from "@/components/ui";
import { useRef, useCallback, useState, useEffect } from "react";
import SignatureCanvas from "react-signature-canvas";
const ESign = () => {
    const padRef :any= useRef(null);
    const [canvas, setCanvas] = useState<string | undefined>(undefined);
    const [canvasVisibility, setCanvasVisibility] = useState(false);
  
    const clearSignatureCanvas = useCallback(() => {
      padRef?.current?.clear();
      setCanvas(undefined);
      setCanvasVisibility(false);
    }, []);
  
    const handleGetCanvas = useCallback(() => {
      const canvas = padRef?.current?.toDataURL();
  
      setCanvas(canvas);
      setCanvasVisibility(true);
    }, []);
  
  return (
    <div className="w-full">
    <SignatureCanvas
      ref={padRef}
      canvasProps={{
        width: 700,
        height: 200
      }}
    />

    <hr />

    {canvasVisibility && <img className="w-[200px] border-2 m-2" src={canvas} alt="signature" />}
<div className="flex">
    <Button  className='indigo-btn text-white mt-8 !w-[30%] mx-auto rounded-xl shadow-lg'
                         onClick={clearSignatureCanvas}>clear</Button>
    <Button  className='indigo-btn text-white mt-8 !w-[30%] mx-auto rounded-xl shadow-lg'
                         onClick={handleGetCanvas}>save</Button>
                         </div>
  </div>
  )
}

export default ESign
