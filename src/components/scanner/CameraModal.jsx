import React, { useState, useRef, useCallback } from 'react';
import { X, Upload, Camera as CameraIcon, ArrowLeft } from 'lucide-react';
import Webcam from 'react-webcam';

const CameraModal = ({ isOpen, onClose, onAction }) => {
  const [mode, setMode] = useState('menu'); // 'menu' or 'camera'
  const webcamRef = useRef(null);
  const fileInputRef = useRef(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    // Pass the image data and a prompt to the chat
    onAction('I have scanned this prescription. Please analyze it.', imageSrc);
    setMode('menu'); 
  }, [webcamRef, onAction]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onAction('I have uploaded this prescription. Please analyze it.', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClose = () => {
    setMode('menu');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 relative shadow-xl overflow-hidden">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          {mode === 'camera' ? (
            <button onClick={() => setMode('menu')} className="text-slate-500 hover:text-teal-600 flex items-center gap-1">
              <ArrowLeft size={20} /> <span className="text-sm font-medium">Back</span>
            </button>
          ) : (
            <h3 className="text-lg font-bold text-slate-800">Add Medicine Photo</h3>
          )}
          <button onClick={handleClose} className="text-slate-400 hover:text-slate-600 ml-auto">
            <X size={24} />
          </button>
        </div>
        
        {/* Content */}
        {mode === 'menu' ? (
          <div className="grid grid-cols-2 gap-4">
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              ref={fileInputRef} 
              onChange={handleFileUpload} 
            />
            <button 
              onClick={() => fileInputRef.current.click()}
              className="flex flex-col items-center gap-3 p-6 border-2 border-dashed border-teal-200 rounded-xl hover:bg-teal-50 text-teal-700 transition-colors"
            >
              <Upload size={32} />
              <span className="text-sm font-semibold">Upload File</span>
            </button>
            
            <button 
              onClick={() => setMode('camera')}
              className="flex flex-col items-center gap-3 p-6 border-2 border-teal-500 bg-teal-500 rounded-xl hover:bg-teal-600 text-white transition-colors"
            >
              <CameraIcon size={32} />
              <span className="text-sm font-semibold">Open Camera</span>
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="rounded-xl overflow-hidden bg-black mb-4 w-full">
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={{ facingMode: "environment" }} // Prioritizes back camera on mobile
                className="w-full h-auto object-cover"
              />
            </div>
            <button 
              onClick={capture}
              className="bg-teal-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-teal-700 transition-colors shadow-md flex items-center gap-2"
            >
              <CameraIcon size={20} />
              Capture Photo
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CameraModal;