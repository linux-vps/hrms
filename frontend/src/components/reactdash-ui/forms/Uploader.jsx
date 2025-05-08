import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

const Uploader = ({ onDropzone, className, uploadedImage, textUpload, variant }) => {
  const addClass = className || '';
  const [previewImages, setPreviewImages] = useState(uploadedImage ? [{ file: null, preview: uploadedImage }] : []);
  // Use the correct onDrop function
  const onDrop = (acceptedFiles) => {
    // Handle the uploaded files
    onDropzone(acceptedFiles);

    // show preview
    const newImages = acceptedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setPreviewImages([...previewImages, ...newImages]);
  };

  const removeImage = (index) => {
    // delete image
    const updatedImages = [...previewImages];
    updatedImages.splice(index, 1);
    setPreviewImages(updatedImages);
  };
  const mode = variant !== 'single';
  const { getRootProps, getInputProps } = useDropzone({
    onDrop, // Use the correct function name
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg']
    },
    multiple: mode, // multiple upload
  });

  return (
    <div className={`file-upload ${addClass}`}>
      {previewImages.length > 0 ? (
        <div className={`flex flex-wrap multiple-dropzone ${variant === 'single' ? '' : 'p-6'} overflow-hidden border border-gray-200 dark:!border-gray-700 !rounded-lg gap-4`}>
          {variant === 'single' ? '' : (
            <div {...getRootProps()} className="dropzone w-24 h-24 flex justify-center items-center overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800">
              <input {...getInputProps()} />
              <p className="material-symbols-outlined !text-[28px] pointer-events-none">add</p>
            </div>
          )}

          {previewImages.map((image, index) => (
            <div key={index} className={`preview-item relative ${variant === 'single' ? 'w-full h-auto' : 'w-24 h-24'} flex overflow-hidden flex-col justify-center`}>
              <img src={image.preview} className="w-full rounded-lg overflow-hidden" alt="Preview" />
              <button onClick={() => removeImage(index)} className="absolute inset-x-0 bottom-0 hover:text-primary-600 dark:hover:text-primary-200 p-0.5 rounded bg-red-200 dark:bg-red-700 text-xs">
                Remove
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div {...getRootProps()} className="dropzone multiple-dropzone !border !border-gray-200 dark:!border-gray-700 !rounded-lg">
          <div className="dropzone pre-upload flex flex-col gap-3 items-center cursor-pointer py-6">
            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="mx-auto text-gray-500 inline-block w-10 h-10 bi bi-cloud-arrow-up" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2z" />
              <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z" />
            </svg>
            <input {...getInputProps()} className="py-1.5 px-3 inline-block text-center rounded leading-normal text-gray-800 bg-gray-100 border border-gray-100 hover:text-gray-900 hover:bg-gray-200 hover:ring-0 hover:border-gray-200 focus:bg-gray-200 focus:border-gray-200 focus:outline-none focus:ring-0 mr-2 dark:bg-gray-300" />
            <p className="text-body-lg">{textUpload ? textUpload : "Drag & drop images here"}</p>
            <button className="py-1.5 px-3 inline-block text-center rounded leading-normal text-gray-800 bg-gray-100 border border-gray-100 hover:text-gray-900 hover:bg-gray-200 hover:ring-0 hover:border-gray-200 focus:bg-gray-200 focus:border-gray-200 focus:outline-none focus:ring-0 mr-2 dark:bg-gray-300">Browse file</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Uploader;