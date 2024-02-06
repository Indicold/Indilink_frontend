import React, { useState } from 'react';

const ImageGrid = (props:any) => {
    const {partoneDetails} =props;
    console.log(partoneDetails)
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState('');

  const openModal = (imageUrl:any) => {
    setSelectedImageUrl(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {partoneDetails.map((item:any, index:any) => (
        <div key={index} className="relative" onClick={() => openModal(item.imageUrl)}>
          <img
            className="h-auto max-w-full rounded-lg cursor-pointer"
            src={item.imageUrl}
            alt=""
          />
          <div className="pl-4 pb-2 absolute font-bold text-white bottom-0 left-0">
            <p className="backdrop-blur-[2px]">{item.titlePart1}</p>
            <p className="backdrop-blur-[2px]">{item.titlePart2}</p>
          </div>
        </div>
      ))}

      {modalOpen && (
        <div className="fixed inset-0 overflow-y-auto z-50 flex items-center justify-center backdrop-filter backdrop-blur-sm">
          <div className="relative max-w-3xl mx-auto">
            <div className="bg-white rounded-lg overflow-hidden shadow-xl">
              <span
                className="absolute top-0 right-0 bg-gray-300 text-black px-2.5 rounded-full pb-1 m-4 text-3xl cursor-pointer"
                onClick={closeModal}
              >
                &times;
              </span>
              <img
                className="w-full h-auto"
                src={selectedImageUrl}
                alt="Modal Content"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGrid;
