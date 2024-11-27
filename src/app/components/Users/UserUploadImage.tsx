import React, { FC,useState } from 'react';
import Button from '../UI/Button';
import Image from 'next/image';
import { handleImageUpload } from '../../../../scripts/script'; // Ensure this function exists in the given path
import { Icon } from '@iconify/react/dist/iconify.js';
type Props_upload_image = {
    id:number,
    scale:number,
    onUserAdded:()=>void
}
const UserUploadImage:FC<Props_upload_image> = ({id,scale,onUserAdded}) => {
    // State to hold the selected file and image preview URL
    const [file, setFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const handleFileChange = (event:any) => {
        const selectedFile = event.target.files[0]; // Get the first selected file
        if (selectedFile) {
            setFile(selectedFile); // Update the state with the selected file
            // Create a preview URL for the selected image
            const imageUrl:any = URL.createObjectURL(selectedFile);
            setImagePreview(imageUrl); // Set the image preview URL
        }
    };

    // Handle the file upload
    const handleUpload = () => {
        if (file) {
            console.log(file)
            handleImageUpload(id, file,onUserAdded); // Call your upload function with the id and selected file
        } else {
            console.log("No file selected.");
        }
    };

    const scaled:number = scale;

    return (
        <div className='w-[100vw] h-[100vh] cover'  style={{ transform: `scale(${scaled})`,transition:'ease 0.5s' }}
>   
<Icon icon="zondicons:close-solid"
      
      style={{color: "red",fontSize:'30px',margin:'10px',right:'10px',position:'absolute'}} />
            <div className='flex flex-col items-center justify-center p-10'>
            <div className=''>
            <input
                    type="file"
                    name="file"
                    accept="image/*" // Restrict to images
                    onChange={handleFileChange} // Trigger the file selection handler
                    className="mb-4"
                />
                <Button 
                    name="submit"
                    value=""
                    event={handleUpload}
                    placeholder="Upload"
                />
                </div>
                {/* Conditionally render the selected image preview if available */}
                {imagePreview? (
                    <div className="mb-4  items-center justify-center">
                        <Image 
                            src={imagePreview} 
                            alt="Selected Image" 
                            width={300} 
                            height={300} 
                            className="rounded-lg"
                        />
                    </div>
                ):<div className="mb-4  items-center justify-center">
                <Image 
                    src='/Images/Upload.png' 
                    alt="Selected Image" 
                    width={300} 
                    height={300} 
                    className="rounded-lg"
                />
            </div>}


            </div>
        </div>
    );
}

export default UserUploadImage;
