// ImagePreview.js
import React from 'react';
import { Button } from 'react-bootstrap';
import { FaImage, FaExternalLinkAlt } from 'react-icons/fa';

const ImagePreview = ({ src }) => {
  return (
    <Button
      variant="link"
      className="p-0"
      href={src}
      target="_blank"
      rel="noopener noreferrer"
    >
      <FaImage size={20} className="me-1" />
      <FaExternalLinkAlt size={14} />
    </Button>
  );
};

export default ImagePreview;
