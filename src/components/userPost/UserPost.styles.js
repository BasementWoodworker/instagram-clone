import styled from "styled-components";
import likeIcon from "../../assets/icons/like.svg";
import likedIcon from "../../assets/icons/liked.svg";
import commentIcon from "../../assets/icons/comment.svg";

const darkblue = "#285e91";
const scrollbarThumbColor = "#333333";
const scrollbarTrackColor = "#eeeeee";


export const StyledUserPost = styled.div`
  position: relative;
  height: min-content;
  width: 400px;
  background-color: white;
  border: 1.5px solid darkgrey;
  border-radius: 8px;
  margin: 40px auto;

  &.placeholder {
    background-color: white;
    min-height: 400px;
  }

  & > *:not(.post-image-container, form.make-new-comment, button.delete-post) {
    margin: 8px;
  }

  button.delete-post {
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
    border: none;
    padding: 4px;
    background-color: inherit;
    font-size: 20px;
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

  img.post-image {
    object-fit: cover;
    width: 100%;
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
    border-top: 1.5px solid darkgrey;
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
    color: ${darkblue};
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
`

export const StyledUserPostFullView = styled(StyledUserPost)`
  display: flex;
  width: auto;
  max-width: 1000px;
  height: 85%;
  max-height: 85%;
  border-radius: 0;

  .separator-line {
    height: 1px;
    background-color: grey;
    margin-bottom: 8px;
  }

  img.post-image {
    margin: 0;
    max-width: 600px;
    object-fit: stretch;
  }

  #right-part {
    margin: 0;
    flex: 1 1 300px;
    display: flex;
    flex-direction: column;
  }

  #right-part > *:not(.separator-line, form.make-new-comment, button.delete-post) {
    margin: 0 15px;
  }

  #right-part > .author-info {
    padding: 15px 0;
  }

  #right-part > .comments {
    flex: 1 1 0;
    max-height: 100%;
  }

  #right-part > form.make-new-comment > input {
    width: auto;
    border-radius: 0;
  }
`