import styled from "styled-components";
import likeIcon from "../../assets/icons/like.svg";
import likedIcon from "../../assets/icons/liked.svg";
import commentIcon from "../../assets/icons/comment.svg";
import ellipsisIcon from "../../assets/icons/ellipsis.svg";
import closeIcon from "../../assets/icons/close.svg";

const scrollbarThumbColor = "#333333";
const scrollbarTrackColor = "#eeeeee";

export const StyledUserPost = styled.div`
  position: relative;
  height: min-content;
  max-width: 600px;
  background-color: white;
  border: 1.5px solid ${props => props.theme.borderColor};
  border-radius: 8px;
  margin: 40px 20px;

  &.placeholder {
    background-color: white;
    min-height: 400px;
  }

  & > *:not(.post-image-container, form.make-new-comment, button.delete-post, .modal) {
    margin: 8px;
  }

  .top-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .author-info {
    display: flex;
    gap: 8px;
    align-items: center;
    color: inherit;
    text-decoration: none;
  }

  .author-info > .avatar {
    height: 40px;
    width: 40px;
    border: 1px solid #2b2f42;
    border-radius: 50%;
  }

  .author-info > .username {
    font-weight: bold;
    font-size: 18px;
  }

  .top-bar > .buttons {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .top-bar > .buttons > * {
    cursor: pointer
  }

  .top-bar .dropdown {
    position: relative;
    height: 20px;
    width: 20px;
    margin-right: 8px;
    border-radius: 8px;
    background-image: url(${ellipsisIcon});
    background-size: 100%;
    background-color: inherit;
  }

  button.delete-post {
    position: absolute;
    top: 20px;
    right: 0;
    white-space: nowrap;
    padding: 4px;
  }

  button.close-post {
    border: none;
    height: 50px;
    width: 50px;
    background-color: inherit;
    background-image: url(${closeIcon});
    background-size: 100%;
  }

  img.post-image {
    cursor: pointer;
    object-fit: contain;
    width: 100%;
    max-height: 70vh;
  }

  div.like-and-comment-buttons {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  button.like,
  button.comment {
    cursor: pointer;
    height: 40px;
    width: 40px;
    background-color: black;
  }

  button.like {
    mask: url(${likeIcon}) no-repeat center;
    mask-size: contain;
  }

  &.liked button.like {
    mask-image: url(${likedIcon});
    background-color: red;
  }

  button.like:disabled {
    background-color: darkgrey;
  }

  button.comment {
    height: 33px;
    width: 50px;
    mask: url(${commentIcon}) no-repeat center;
    mask-size: contain;
  }

  #like-amount {
    font-weight: bold;
    padding-top: 5px;
    padding-bottom: 5px;
  }

  .comments {
    max-height: 180px;
    overflow-y: auto;
  }
  
  /* Scrollbar */

  .comments {
    scrollbar-width: normal;
    scrollbar-color: ${scrollbarThumbColor} ${scrollbarTrackColor};
  }

  .comments::-webkit-scrollbar {
    width: 0.5vw;
  }

  .comments::-webkit-scrollbar-track {
    background-color: ${scrollbarTrackColor};
  }

  .comments::-webkit-scrollbar-thumb {
    background-color: ${scrollbarThumbColor};
  }

  /* End Scrollbar */

  .comment-container {
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 4px 0;
  }

  .comment-container > .author {
    align-self: flex-start;
    font-weight: bold;
    white-space: nowrap;
    color: inherit;
    text-decoration: none;
  }

  .comment-container > .text {
    word-break: break-word;
  }

  .comment-container > button.delete-comment {
    visibility: hidden;
    align-self: flex-start;
    background: none;
    border: none;
    cursor: pointer;
    margin-left: auto;
    padding-right: 10px;
    font-size: 17px;
  }

  .comment-container:hover button.delete-comment {
    visibility: visible;
  }

  button.view-all-comments {
    color: dimgrey;
    border: none;
    background: none;
    cursor: pointer;
    padding: 2px 0;
  }

  form.make-new-comment {
    display: flex;
    border-top: 1.5px solid ${props => props.theme.borderColor};
  }

  form.make-new-comment > * {
    border: none;
    font-size: 15px;
  }

  form.make-new-comment > input {
    flex-grow: 1;
    padding: 18px 12px;
    color: #444444;
    border-bottom-left-radius: 8px;
  }

  form.make-new-comment > button[type="submit"] {
    color: ${props => props.theme.darkblue};
    font-weight: bold;
    padding: 20px;
    background-color: inherit;
    border-bottom-right-radius: 8px;
    cursor: pointer;
  }

  form.make-new-comment > button[type="submit"]:disabled {
    color: grey;
    cursor: default;
  }

  @media (max-width: 600px) {
    width: 100%;
    margin: 20px 0;
    border-radius: 0;
    border-left: 0;
    border-right: 0;
  }
`

export const StyledUserPostFullView = styled(StyledUserPost)`
  display: flex;
  width: auto;
  max-width: 1000px;
  min-height: 100%;
  border-radius: 0;
  margin: 0 auto;

  .separator-line {
    height: 1px;
    background-color: ${props => props.theme.borderColor};
    margin-bottom: 8px;
  }

  .top-bar.mobile {
    display: none;
  }

  img.post-image {
    min-width: 0;
    max-width: 600px;
    margin: 0;
    align-self: center;
  }

  #right-part {
    margin: 0;
    flex: 1 1 300px;
    display: flex;
    flex-direction: column;
    border-left: 1px solid ${props => props.theme.borderColor};
  }

  #right-part > *:not(.separator-line, form.make-new-comment, button.delete-post, .modal) {
    margin: 0 15px;
  }

  #right-part > .top-bar {
    padding: 15px 0;
  }

  #right-part > .comments {
    flex: 1 1 auto;
    max-height: 100%;
  }

  #right-part > form.make-new-comment > input {
    width: auto;
    border-radius: 0;
  }

  @media (max-width: 600px) {
    flex-direction: column;
    min-height: 100%;
    margin:0;

    .top-bar {
      display: none;
    }

    .top-bar.mobile {
      display: flex;
    }

    #right-part {
      flex: 1 1 auto;
      border: none;
    }
  }
`