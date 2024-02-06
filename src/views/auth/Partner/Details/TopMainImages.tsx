import React, { useState } from 'react';

const TopMainImages = (props:any) => {
     const {topMainImages} = props;
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
    <div className="lg:flex gap-4">
      <div className="lg:w-[70%] mb-4 w-full">
        <img
          className="lg:h-[19rem] w-full rounded-lg cursor-pointer"
          src={topMainImages.mainImg}
          alt=""
          onClick={() => openModal(topMainImages.mainImg)}
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full lg:w-[40%] gap-4">
      {topMainImages?.anothorFourImage.map((item:any, index:any) => (
  <div key={index}>
    <img
      className="h-auto lg:h-[9rem] w-full rounded-lg cursor-pointer"
      src={item}  // Use 'item' directly as it contains the image URL
      alt=""
      onClick={() => openModal(item)}
    />
  </div>
))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 overflow-y-auto z-50 flex items-center justify-center backdrop-filter backdrop-blur-sm">
          <div className="relative max-w-2xl mx-auto">
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

export default TopMainImages;
