import styled from "styled-components";

import likeIcon from "../../../assets/icons/liked.svg";
import commentIcon from "../../../assets/icons/comment-full.svg";

export const StyledSmallPost = styled.div`
  position: relative;
  cursor: pointer;
  aspect-ratio: 1;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    background-color: white; // to make "filter: brightness(50%)"" work
  }

  &:hover > img {
    filter: brightness(50%);
  }

  .like-and-comment-count {
    visibility: hidden;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 20%;
    color: white;
    font-size: 20px;
    font-weight: bold;
  }

  .like-and-comment-count > * {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  &:hover > .like-and-comment-count {
    visibility: visible;
  }

  .like-icon,
  .comment-icon {
    height: 45px;
    width: 45px;
    background-color: white;
  }

  .like-icon {
    z-index: 1;
    mask: url(${likeIcon}) no-repeat center;
    mask-size: contain;
  }

  .comment-icon {
    mask: url(${commentIcon}) no-repeat center;
    mask-size: contain;
  }

  @media (max-width: 600px) {
    .like-and-comment-count {
      gap: 10px;
    }

    .like-and-comment-count > * {
      gap: 3px;
    }

    .like-icon,
    .comment-icon {
      height: 20px;
      width: 20px;
    }
  }
`