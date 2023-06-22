import styled from "styled-components";

export const StyledCropper = styled.div`  
  position: relative;
  
  flex: 1 1 0;
  align-content: center;
  display: grid;
  user-select: none;
  padding: 10px;


  .limiting-container {
    position: relative;
    display: grid;
    background-color: #555555; // For contrast on images with transparent background
  }

  img.raw-image {
    display: block;
    max-height: 60vh;
    max-width: 90vw;
  }

  div.crop-square {
    position: absolute;
    border: 3.5px white dashed;
    box-shadow: 0 0 0 max(100vh, 100vw) rgba(0, 0, 0, .5);
    cursor: pointer;

    .resize-corner {
      position: absolute;
      height: 14px;
      width: 14px;
      border: 2px solid white;
      cursor: e-resize;
    }

    .top-left.resize-corner {
      top: -7px;
      left: -7px;
      cursor: nwse-resize;
    }

    .top-right.resize-corner {
      top: -7px;
      right: -7px;
      cursor: nesw-resize
    }

    .bottom-left.resize-corner {
      bottom: -7px;
      left: -7px;
      cursor: nesw-resize
    }

    .bottom-right.resize-corner {
      bottom: -7px;
      right: -7px;
      cursor: nwse-resize;
    }
  }

  canvas {
    position: absolute;
    z-index: -1;
  }
`