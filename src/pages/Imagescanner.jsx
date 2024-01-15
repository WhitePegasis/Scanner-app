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




import React, { useState } from 'react';
import Tesseract from 'tesseract.js';
import './imagescannerstyles.css';

function Imagescanner() {
    const [image, setImage] = useState(null);
    const [text, setText] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const selectedImage = e.target.files[0];
        setImage(selectedImage);
        setText(""); // Clear previous text when a new image is selected
    }

    const handleImageToText = () => {
        if (!image) {
            alert("Please select an image first!");
            return;
        }

        setIsLoading(true);
        Tesseract.recognize(image, "eng").then((res) => {
            setText(res.data.text);
            setIsLoading(false);
        }).catch((err) => {
            console.log(err);
            setIsLoading(false);
        });
    }

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
            <button className='imagescanner-button' onClick={handleImageToText} disabled={!image}>
                {isLoading ? 'Loading...' : 'Extract Text'}
            </button>
            <div>
                <p>{text}</p>
            </div>
        </div>
    );
}

export default Imagescanner;