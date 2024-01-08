/* The code is importing various modules and components from different libraries. */
import { Button } from "@/components/ui";
import { useRef, useCallback, useState, useEffect } from "react";
import SignatureCanvas from "react-signature-canvas";

/**
 * The `ESign` function is a React component that renders a signature canvas, allows the user to clear
 * and save the signature, and displays the saved signature as an image.
 * @returns The code is returning JSX code that represents the structure and content of the component's
 * rendered output. It includes a `<div>` element with the class name "w-full" as the root element.
 * Inside the `<div>`, there is a `<SignatureCanvas>` component with a `ref` attribute set to `padRef`
 * and a `canvasProps` attribute with width and height properties.
 */
const ESign = () => {
    /* 
const padRef: any = useRef(null); creates a padRef reference to the
 SignatureCanvas component using the React useRef hook, initialized 
 with null for accessing methods like clear() and toDataURL(). */
    const padRef :any= useRef(null);

    /* The code is using the `useState` hook from React to create two state variables: `canvas` and
    `canvasVisibility`. */
    const [canvas, setCanvas] = useState<string | undefined>(undefined);
    const [canvasVisibility, setCanvasVisibility] = useState(false);
  
    /* The `clearSignatureCanvas` function is a callback function created using the `useCallback` hook
    from React. It is responsible for clearing the signature canvas and resetting the canvas state
    variables. */
    const clearSignatureCanvas = useCallback(() => {
      padRef?.current?.clear();
      setCanvas(undefined);
      setCanvasVisibility(false);
    }, []);
  
    // handleGetCanvas is a useCallback function in React for retrieving the data URL of the signature 
    // canvas and updating associated state variables
    const handleGetCanvas = useCallback(() => {
      const canvas = padRef?.current?.toDataURL();
  
      setCanvas(canvas);
      setCanvasVisibility(true);
    }, []);
  
  /* The `return` statement is returning JSX code that represents the structure and content of the
  component's rendered output. */
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
