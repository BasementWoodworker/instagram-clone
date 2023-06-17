import React, { useRef } from "react";

import { StyledUploadImage } from "./UploadImage.styles";

export function UploadImage({ setSelectedImage, setCurrentStep }) {
  const imageInputRef = useRef();

  function handleInput() {
    setSelectedImage(imageInputRef.current.files[0]);
    setCurrentStep("crop-image")
  }

  return(
    <StyledUploadImage>
      <input type="file" accept="image/*" ref={imageInputRef} onInput={handleInput} />
      <span>Choose image to upload</span>
    </StyledUploadImage>
  )
}