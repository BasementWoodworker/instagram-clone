import styled from "styled-components"

export const StyledAddCaption = styled.div`
  flex: 1 1 0;
  display: grid;
  place-items: center;

  .post-preview {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-width: 200px;
    max-width: 500px;
    margin-top: 10px;
    background-color: white;
    border: 1.5px solid ${props => props.theme.borderColor};
    border-radius: 4px;
  }

  .your-info {
    flex: 0 0 50px;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 15px;
    font-size: 24px;
    font-weight: bold;
    border-bottom: 1.5px solid ${props => props.theme.borderColor};

    img.avatar {
      height: 45px;
      width: 45px;
      border-radius: 50%;
      border: 1.5px solid #333333;
    }

    .username {
      overflow: hidden;
    }
  }

  .cropped-image {
    object-fit: contain;
    max-height: 50vh;
    max-width: 100%;
  }

  textarea.caption-input {
    resize: vertical;
    max-height: 200px;
    min-height: 50px;
    padding: 8px;
    border: none;
    border-top: 1.5px solid ${props => props.theme.borderColor};
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }
`