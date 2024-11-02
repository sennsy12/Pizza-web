import React from 'react';
import { Tooltip, OverlayTrigger, Image } from 'react-bootstrap';
import { FaImage } from 'react-icons/fa';

const ImagePreview = ({ src }) => {
  // Convert Gyazo page link to direct image link
  const directImageUrl = src.replace('gyazo.com', 'i.gyazo.com') + '.png';

  return (
    <OverlayTrigger
      placement="top"
      delay={{ show: 250, hide: 400 }}
      overlay={
        <Tooltip 
          className="p-0" 
          style={{ 
            borderRadius: '10px', 
            padding: '5px', 
            backgroundColor: 'rgba(0, 0, 0, 0.8)', 
            border: 'none' 
          }}
        >
          <div style={{ padding: '5px', borderRadius: '8px', backgroundColor: 'white' }}>
            <Image 
              src={directImageUrl} 
              alt="Menu Item" 
              style={{
                maxWidth: '170px',
                borderRadius: '5px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
              }}
            />
          </div>
        </Tooltip>
      }
    >
      <span style={{ cursor: 'pointer', color: '#007bff' }}>
        <FaImage size={20} />
      </span>
    </OverlayTrigger>
  );
};

export default ImagePreview;
