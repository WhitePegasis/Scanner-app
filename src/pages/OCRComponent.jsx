import React, { useState } from 'react';
import './imagescannerstyles.css';

const OCRComponent = () => {
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleExtractText = async () => {
    if (!selectedImage) {
      alert("Please select an image first!");
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedImage);

    try {
      setIsLoading(true);

      const response = await fetch('http://localhost:5000/process_image', {
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
      <button className='imagescanner-button' disabled={isLoading || !selectedImage} onClick={handleExtractText}>
        {isLoading ? 'Loading...' : 'Extract Text'}
      </button>
      <div className="result-container">
        <h2>OCR Result:</h2>
        {/* <pre>{JSON.stringify(result, null, 2)}</pre> */}
        <p className="result-text">{result}</p>
      </div>
    </div>
  );
};

export default OCRComponent;
