import React from "react";

import { StyledLoadingSpinner } from "./LoadingSpinner.styles";
import loadingGif from "../../assets/icons/loading.gif";

export function LoadingSpinner({ size = "32px" }) {
  return(
    <StyledLoadingSpinner src={loadingGif} size={size} className="loading-spinner" />
  )
}