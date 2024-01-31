// import React, { useState } from 'react';
// import Tesseract from 'tesseract.js';

// function Imagescanner() {
//     const [image, setImage] = useState(null);
//     const [text, setText] = useState("");
//     const [isLoading, setIsLoading] = useState(false);

//     const handleChange = (e) => {
//         const image = e.target.files[0]
//         setImage(image)
//     }

//     const handleImageToText = () => {
//         setIsLoading(true);
//         Tesseract.recognize(image, "eng").then((res) => {
//             setText(res.data.text); setIsLoading(false);
//         }).catch((err) => {
//             console.log(err);
//             setIsLoading(false);
//         });
//     }

//     return (
//         <div className="container">
//             <div>
//                 <h2>Image to Text</h2>
//             </div>
//             <div>
//                 <input type="file" onChange={handleChange} />
//             </div>
//             <button onClick={handleImageToText}>

//                 {isLoading ? 'Loading...' : 'Convert Image to Text'}
//             </button>
//             <p>{text}</p>
//         </div>);
// }

// export default Imagescanner;




// import React, { useState } from 'react';
// import Tesseract from 'tesseract.js';
// import './imagescannerstyles.css';

// function Imagescanner() {
//     const [image, setImage] = useState(null);
//     const [text, setText] = useState("");
//     const [isLoading, setIsLoading] = useState(false);

//     const handleChange = (e) => {
//         const selectedImage = e.target.files[0];
//         setImage(selectedImage);
//         setText(""); // Clear previous text when a new image is selected
//     }

//     const handleImageToText = () => {
//         if (!image) {
//             alert("Please select an image first!");
//             return;
//         }

//         setIsLoading(true);
//         Tesseract.recognize(image, "eng").then((res) => {
//             setText(res.data.text);
//             setIsLoading(false);
//         }).catch((err) => {
//             console.log(err);
//             setIsLoading(false);
//         });
//     }

//     return (
//         <div className="container">
//             <div>
//                 <h2>Tesseract.js</h2>
//                 <p>Select an image and click "Extract text"</p>
//             </div>
//             <div>
//                 <input type="file" onChange={handleChange} />
//             </div>
//             <div>
//                 {image && (
//                     <img
//                         src={URL.createObjectURL(image)}
//                         alt="Selected"
//                         style={{ maxWidth: '100%', marginTop: '10px' }}
//                     />
//                 )}
//             </div>
//             <button className='imagescanner-button' onClick={handleImageToText} disabled={!image}>
//                 {isLoading ? 'Loading...' : 'Extract Text'}
//             </button>
//             <div>
//                 <p>{text}</p>
//             </div>
//         </div>
//     );
// }

// export default Imagescanner;

// import React, { useState } from 'react';
// import Tesseract from 'tesseract.js';
// import './imagescannerstyles.css';

// function Imagescanner() {
//   const [image, setImage] = useState(null);
//   const [text, setText] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const resizeImage = (file, maxWidth, maxHeight, callback) => {
//     const reader = new FileReader();
//     reader.onload = (readerEvent) => {
//       const image = new Image();
//       image.onload = () => {
//         const canvas = document.createElement('canvas');
//         const ctx = canvas.getContext('2d');

//         const width = image.width;
//         const height = image.height;

//         // Resize the image while maintaining aspect ratio
//         const ratio = Math.min(maxWidth / width, maxHeight / height);
//         canvas.width = width * ratio;
//         canvas.height = height * ratio;

//         // Draw the image on the canvas
//         ctx.drawImage(image, 0, 0, width, height, 0, 0, canvas.width, canvas.height);

//         // Convert the canvas content back to a Blob
//         canvas.toBlob((blob) => {
//           callback(blob);
//         }, file.type);
//       };
//       image.src = readerEvent.target.result;
//     };
//     reader.readAsDataURL(file);
//   };

//   const handleChange = (e) => {
//     const selectedImage = e.target.files[0];
//     resizeImage(selectedImage, 800, 600, (resizedBlob) => {
//       setImage(resizedBlob);
//       setText(''); // Clear previous text when a new image is selected
//     });
//   };

//   const handleImageToText = () => {
//     if (!image) {
//       alert('Please select an image first!');
//       return;
//     }

//     setIsLoading(true);
//     Tesseract.recognize(image, 'eng')
//       .then((res) => {
//         setText(res.data.text);
//         setIsLoading(false);
//       })
//       .catch((err) => {
//         console.log(err);
//         setIsLoading(false);
//       });
//   };

//   return (
//     <div className="container">
//       <div>
//         <h2>Tesseract.js</h2>
//         <p>Select an image and click "Extract text"</p>
//       </div>
//       <div>
//         <input type="file" onChange={handleChange} />
//       </div>
//       <div>
//         {image && (
//           <img
//             src={URL.createObjectURL(image)}
//             alt="Selected"
//             style={{ maxWidth: '100%', marginTop: '10px' }}
//           />
//         )}
//       </div>
//       <button className="imagescanner-button" onClick={handleImageToText} disabled={!image}>
//         {isLoading ? 'Loading...' : 'Extract Text'}
//       </button>
//       <div>
//         <p>{text}</p>
//       </div>
//     </div>
//   );
// }

// export default Imagescanner;

import React, { useState } from 'react';
import Tesseract from 'tesseract.js';
import './imagescannerstyles.css';

function Imagescanner() {
  const [image, setImage] = useState(null);
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const resizeImage = (file, maxWidth, maxHeight, callback) => {
    const reader = new FileReader();
    reader.onload = (readerEvent) => {
      const image = new Image();
      image.onload = () => {
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

  const convertToBlackAndWhite = (inputImage, callback) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      // Convert the image to black and white (grayscale)
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < imageData.data.length; i += 4) {
        const avg = (imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2]) / 3;
        imageData.data[i] = avg;
        imageData.data[i + 1] = avg;
        imageData.data[i + 2] = avg;
      }
      ctx.putImageData(imageData, 0, 0);

      // Convert the canvas content back to a Blob
      canvas.toBlob((blob) => {
        callback(blob);
      }, inputImage.type);
    };
    img.src = URL.createObjectURL(inputImage);
  };

  const handleChange = (e) => {
    const selectedImage = e.target.files[0];
    resizeImage(selectedImage, 800, 600, (resizedBlob) => {
      convertToBlackAndWhite(resizedBlob, (bwImageBlob) => {
        setImage(bwImageBlob);
        setText(''); // Clear previous text when a new image is selected
      });
    });
  };

  const handleImageToText = () => {
    if (!image) {
      alert('Please select an image first!');
      return;
    }

    setIsLoading(true);
    Tesseract.recognize(image, 'eng')
      .then((res) => {
        setText(res.data.text);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  return (
    <div className="container">
      <div>
        <h2>Tesseract.js</h2>
        <p>Select an image and click "Extract text"</p>
      </div>
      <div>
        <input type="file" onChange={handleChange} />
      </div>
      <div>
        {image && (
          <img
            src={URL.createObjectURL(image)}
            alt="Selected"
            style={{ maxWidth: '100%', marginTop: '10px' }}
          />
        )}
      </div>
      <button className="imagescanner-button" onClick={handleImageToText} disabled={!image}>
        {isLoading ? 'Loading...' : 'Extract Text'}
      </button>
      <div>
        <p>{text}</p>
      </div>
    </div>
  );
}

export default Imagescanner;

