import React, { useRef } from "react";

import { StyledUploadImage } from "./UploadImage.styles";
import uploadIcon from "../../../../assets/icons/upload-image.svg";

export function UploadImage({ setSelectedImage, setCurrentStep }) {
  const imageInputRef = useRef();

  function handleInput() {
    setSelectedImage(imageInputRef.current.files[0]);
    setCurrentStep("crop-image")
  }

  return(
    <StyledUploadImage>
      <input type="file" accept="image/*" ref={imageInputRef} onInput={handleInput} />
      <img className="upload-icon" src={uploadIcon} />
      <div className="text">Choose image to upload</div>
    </StyledUploadImage>
  )
}