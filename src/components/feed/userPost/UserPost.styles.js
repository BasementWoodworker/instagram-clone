import styled from "styled-components";
import likeIcon from "../../../assets/icons/like.svg";
import likedIcon from "../../../assets/icons/liked.svg";
import commentIcon from "../../../assets/icons/comment.svg";

const darkblue = "#285e91";

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

  & > *:not(.post-image, form.make-new-comment) {
    margin: 8px;
  }

  button.delete-post {
    position: absolute;
    top: 0;
    right: 0;
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

  .comments {
    max-height: 180px;
    overflow-y: auto;
  }

  .comment-container {
    display: flex;
    gap: 8px;
    margin: 4px 0;
  }

  .comment-container > .author {
    align-self: center;
    font-weight: bold;
    white-space: nowrap;
    color: inherit;
    text-decoration: none;
  }

  .comment-container > .text {
    word-break: break-word;
  }

  .comment-container > button.delete-comment {
    align-self: center;
    background: none;
    border: none;
    cursor: pointer;
  }

  button.view-all-comments {
    color: dimgrey;
    border: none;
    background: none;
    cursor: pointer;
    padding: 2px 0;
  }

  button.delete-comment {
    margin-left: auto;
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