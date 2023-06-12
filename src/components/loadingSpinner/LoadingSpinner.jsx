import React from "react";

import { StyledLoadingSpinner } from "./LoadingSpinner.styles";
import loadingGif from "../../assets/icons/loading.gif";
import loadingGif2 from "../../assets/icons/loading2.gif";

export function LoadingSpinner({ size = "32px", type = 1 }) {
  const spinner = type === 1 ? loadingGif : loadingGif2;

  return(
    <StyledLoadingSpinner src={spinner} size={size} className="loading-spinner" />
  )
}