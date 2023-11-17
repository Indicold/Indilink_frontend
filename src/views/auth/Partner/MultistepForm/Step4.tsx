/* The code is importing the `Button` component from the `@/components/ui` module, the `useRef` hook
from the `react` module, and the `AiFillEye` and `AiOutlineCloudUpload` icons from the
`react-icons/ai` module. These imported components and hooks are then used in the code to create a
file upload section with buttons for uploading and viewing files. */
import { Button } from "@/components/ui"
import { useRef } from "react";
import {AiFillEye, AiOutlineCloudUpload} from 'react-icons/ai'
interface Props {
    onUpload: (file: File) => void;
}
interface UploadSectionProps {
    title: string;
    onUpload: (file: File) => void;
}

/**
 * The `UploadSection` component is a React functional component that renders a section for uploading
 * files, including a title, a file input, and two buttons for uploading and viewing files.
 * @param  - - `title`: The title of the upload section.
 * @returns The `UploadSection` component returns a JSX element. It renders a `<div>` element with two
 * child elements. The first child element is a `<span>` element that displays the `title` prop value.
 * The second child element is a `<div>` element that contains two `<input>` elements wrapped in
 * `<Button>` components.
 */
const UploadSection: React.FC<UploadSectionProps> = ({ title, onUpload }) => {
    /* The line `const fileInputRef = useRef<HTMLInputElement | null>(null);` is creating a ref object
    called `fileInputRef` using the `useRef` hook. The ref object is initialized with a value of
    `null`. */
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    /**
     * The function `handleFileUpload` checks if a file has been selected and calls the `onUpload`
     * function with the selected file as an argument.
     */
    const handleFileUpload = () => {
        if (fileInputRef.current && fileInputRef.current.files) {
            const selectedFile = fileInputRef.current.files[0];
            if (selectedFile) {
                onUpload(selectedFile);
            }
        }
    };

    return (
        <div className="flex justify-between mb-2">
            <span className="w-[60%]">{title}</span>
            <div className="w-[40%]">
                <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileUpload}
                />
                <Button
                    type="button"
                    block
                    variant="solid"
                    className='w-[100px] indigo-btn signup-submit-btn mx-auto rounded-xl px-4 shadow-lg'
                    onClick={() => fileInputRef.current?.click()}
                >
                    <AiOutlineCloudUpload className="text-[28px] mx-auto"/>
                </Button>
                <Button
                    type="button"
                    block
                    variant="solid"
                    className='w-[100px] indigo-btn signup-submit-btn mx-auto rounded-xl px-4 shadow-lg'
                >
                 <AiFillEye className="text-[28px] mx-auto"/>
                </Button>
            </div>
        </div>
    );
};

/* The `Step4` component is a functional component that renders a list of sections with file upload
functionality. */
const Step4 = () => {


    const sections = [
        "No Lien from the creditors/bankers for the stock in the chamber being given for storage.",
        "Latest electricity bill",
        "PAN Card of the company",
        "GST Registration Certificate",
        "Fire NOC",
        "Pollution NOC",
        "UP Cold Storage License",
        "Structural Load Safety / Stability Certificate for the Structure / Racking",
        "Cancelled Cheque",
        "Insurance of Plant and Machinery",
        "FSSAI License",
        "Plant Layout ",
        "Storage Temperature Record for Last Couple of Months"
        // Add more sections as needed
    ];
    return (
        <div>
             <div className="partner-details-container">
            <h2>LIST OF PAPERS TO BE SUBMITTED</h2>
            {sections.map((section, index) => (
                <UploadSection
                    key={index}
                    title={section}
                    onUpload={(file) => {
                        // Handle file upload logic here
                    }}
                />
            ))}
        </div>
        </div>
    )
}

export default Step4
