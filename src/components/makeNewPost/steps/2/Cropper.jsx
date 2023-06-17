import React, { useEffect, useRef, useState } from "react";

import { StyledCropper } from "./Cropper.styles";

export function Cropper({ selectedImage, setCroppedImage, setCropFunction }) {
  const [imgHeight, setImgHeight] = useState(0);
  const [imgWidth, setImgWidth] = useState(0);
  const canvasRef = useRef();
  const rawImageRef = useRef();
  const cropSquareRef = useRef();
  const rawImageURL = URL.createObjectURL(selectedImage);
  let currentCursorX = 0;
  let currentCursorY = 0;
  let cursorDifferenceX = 0;
  let cursorDifferenceY = 0;
  let moveDirectionY;
  let moveDirectionX;

  useEffect(() => {
    setCropFunction(() => crop);
  }, [])

  function crop() {
    const donwsizeCoeff = rawImageRef.current.naturalWidth / rawImageRef.current.width;
    const offsetLeft = cropSquareRef.current.offsetLeft * donwsizeCoeff;
    const offsetTop = cropSquareRef.current.offsetTop * donwsizeCoeff;
    const cropHeight = cropSquareRef.current.style.height.replace("px", "") * donwsizeCoeff;
    const cropWidth = cropSquareRef.current.style.width.replace("px", "") * donwsizeCoeff;
    canvasRef.current.height = cropHeight;
    canvasRef.current.width = cropWidth;
    const context = canvasRef.current.getContext("2d");
    context.drawImage(rawImageRef.current, offsetLeft, offsetTop, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);
    setCroppedImage(canvasRef.current.toDataURL())
  }

  function decideSquareSize() {
    setImgHeight(rawImageRef.current.height);
    setImgWidth(rawImageRef.current.width);
    cropSquareRef.current.style.width = rawImageRef.current.width + "px";
    cropSquareRef.current.style.height = rawImageRef.current.height + "px";
  }

  function startDrag(e) {
    e.preventDefault();
    currentCursorX = e.clientX;
    currentCursorY = e.clientY;
    document.onmousemove = dragElement;
    document.onmouseup = removeListeners;
  }

  function dragElement(e) {
    const square = cropSquareRef.current;
    const squareHeight = toNumber(square.style.height);
    const squareWidth = toNumber(square.style.width);
    const image = rawImageRef.current;
    cursorDifferenceX = currentCursorX - e.clientX;
    cursorDifferenceY = currentCursorY - e.clientY;
    currentCursorX = e.clientX;
    currentCursorY = e.clientY;
    const newPositionX = square.offsetLeft - cursorDifferenceX
    const newPositionY = square.offsetTop - cursorDifferenceY
    if (newPositionX + squareWidth <= image.width && newPositionX >= 0) square.style.left = newPositionX + "px";
    if (newPositionY + squareHeight <= image.height && newPositionY >= 0) square.style.top = newPositionY + "px";
  }

  function startResize(e) {
    e.stopPropagation();
    const cornerType = e.target.classList[1];
    if (cornerType === "top-left") {
      moveDirectionX = 1;
      moveDirectionY = 1;
    } else if (cornerType === "top-right") {
      moveDirectionX = -1;
      moveDirectionY = 1;
    } else if (cornerType === "bottom-left") {
      moveDirectionX = 1;
      moveDirectionY = -1;
    } else if (cornerType ==="bottom-right") {
      moveDirectionX = -1;
      moveDirectionY = -1;
    }
    currentCursorX = e.clientX;
    currentCursorY = e.clientY;
    document.onmousemove = resizeElement;
    document.onmouseup = removeListeners;
  }

  function resizeElement(e) {
    const square = cropSquareRef.current;
    cursorDifferenceX = currentCursorX - e.clientX;
    cursorDifferenceY = currentCursorY - e.clientY;
    currentCursorX = e.clientX;
    currentCursorY = e.clientY;
    const newWidth = toNumber(square.style.width) + cursorDifferenceX * moveDirectionX;
    const newHeight = toNumber(square.style.height) + cursorDifferenceY * moveDirectionY;
    let newLeft = toNumber(square.style.left);
    let newTop = toNumber(square.style.top);
    if (cursorDifferenceX !== 0 && moveDirectionX === 1) newLeft = newLeft - cursorDifferenceX;
    if (cursorDifferenceY !== 0 && moveDirectionY === 1) newTop = newTop - cursorDifferenceY;

    if (newLeft >= 0 && newWidth > 30 && (newLeft + newWidth) <= imgWidth) {
      square.style.width = newWidth  + "px";
      square.style.left = newLeft + "px";
    }
    if (newTop >= 0 && newHeight > 30 && (newTop + newHeight) <= imgHeight) {
      square.style.height = newHeight + "px";
      square.style.top = newTop + "px"
    }
  }

  function removeListeners() {
    document.onmousemove = null;
    document.onmouseup = null;
  }

  function toNumber(stringPx) {
    return Number(stringPx.replace("px",""));
  }

  return(
    <StyledCropper>
      <img className="raw-image" src={rawImageURL} ref={rawImageRef} onLoad={decideSquareSize} />
      <div className="crop-square" ref={cropSquareRef} onMouseDown={startDrag}>
        <div onMouseDown={startResize} className="resize-corner top-left"></div>
        <div onMouseDown={startResize} className="resize-corner top-right"></div>
        <div onMouseDown={startResize} className="resize-corner bottom-left"></div>
        <div onMouseDown={startResize} className="resize-corner bottom-right"></div>
      </div>
      <canvas ref={canvasRef}></canvas>
    </StyledCropper>
  )
}