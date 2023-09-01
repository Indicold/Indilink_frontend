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

const UploadSection: React.FC<UploadSectionProps> = ({ title, onUpload }) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);

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
