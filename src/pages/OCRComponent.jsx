// import React, { useState } from 'react';
// import './imagescannerstyles.css';

// const OCRComponent = () => {
//   const [result, setResult] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [selectedImage, setSelectedImage] = useState(null);

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     setSelectedImage(file);
//   };

//   const handleExtractText = async () => {
//     if (!selectedImage) {
//       alert("Please select an image first!");
//       return;
//     }

//     const formData = new FormData();
//     formData.append('image', selectedImage);

//     try {
//       setIsLoading(true);

//       const response = await fetch('http://20.83.155.20:5000/process_image', {
//         method: 'POST',
//         body: formData,
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setResult(data.result);
//       } else {
//         console.error('Error processing image');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="container">
//       <div>
//         <h2>EASYOCR</h2>
//         <p>Select an image and click "Extract Text" to extract text.</p>
//       </div>
//       <div>
//         <input type="file" onChange={handleImageUpload} />
//       </div>

//       <div>
//         {selectedImage && (
//           <img
//             src={URL.createObjectURL(selectedImage)}
//             alt="Selected"
//             style={{ maxWidth: '100%', marginTop: '10px' }}
//           />
//         )}
//       </div>

//       <button className='imagescanner-button' disabled={isLoading || !selectedImage} onClick={handleExtractText}>
//         {isLoading ? 'Loading...' : 'Extract Text'}
//       </button>
//       <div className="result-container">
//         <h2>OCR Result:</h2>
//         {/* <pre>{JSON.stringify(result, null, 2)}</pre> */}
//         <p className="result-text">{result}</p>
//       </div>
//     </div>
//   );
// };

// export default OCRComponent;


import React, { useState } from 'react';
import './imagescannerstyles.css';

const OCRComponent = () => {
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const resizeImage = (file, maxWidth, maxHeight, callback) => {
    const reader = new FileReader();
    reader.onload = (readerEvent) => {
      const image = new Image();
      image.onload = (imageEvent) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        const width = image.width;
        const height = image.height;

        // Resize the image while maintaining aspect ratio
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        canvas.width = width * ratio;
        canvas.height = height * ratio;

        // Draw the image on the canvas
        ctx.drawImage(image, 0, 0, width, height, 0, 0, canvas.width, canvas.height);

        // Convert the canvas content back to a Blob
        canvas.toBlob((blob) => {
          callback(blob);
        }, file.type);
      };
      image.src = readerEvent.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    resizeImage(file, 800, 600, (resizedBlob) => {
      setSelectedImage(resizedBlob);
    });
  };

  const handleExtractText = async () => {
    if (!selectedImage) {
      alert('Please select an image first!');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedImage);

    try {
      setIsLoading(true);

      const response = await fetch('http://172.208.75.221:5000/process_image', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setResult(data.result);
      } else {
        console.error('Error processing image');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <div>
        <h2>EASYOCR</h2>
        <p>Select an image and click "Extract Text" to extract text.</p>
      </div>
      <div>
        <input type="file" onChange={handleImageUpload} />
      </div>

      <div>
        {selectedImage && (
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="Selected"
            style={{ maxWidth: '100%', marginTop: '10px' }}
          />
        )}
      </div>

      <button className="imagescanner-button" disabled={isLoading || !selectedImage} onClick={handleExtractText}>
        {isLoading ? 'Loading...' : 'Extract Text'}
      </button>
      <div className="result-container">
        <h2>OCR Result:</h2>
        <p className="result-text">{result}</p>
      </div>
    </div>
  );
};

export default OCRComponent;
