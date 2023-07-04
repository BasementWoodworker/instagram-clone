import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

export function TopBar({ mobile, username, avatar, setShowDeletionModal, showDeleteButton, showCloseButton }) {
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState(false);
  const autoCloseTimeout = useRef();
  const dropdown = useRef();

  useEffect(() => {
    clearTimeout(autoCloseTimeout.current);
    if (openDropdown) autoCloseTimeout.current = setTimeout(() => setOpenDropdown(false), 2500)
  }, [openDropdown])

  function handleBlur(e) {
    if (e.relatedTarget && dropdown.current.contains(e.relatedTarget)) return;
    setOpenDropdown(false)
  }

  return(
    <div className={`top-bar ${mobile ? "mobile" : ""}`}>
      <Link className="author-info" to={`/user/${username}`}>
        <img className="avatar" src={avatar} />
        <div className="username" >{username}</div>
      </Link>
      <div className="buttons">
        {showDeleteButton &&
          <div className="dropdown" ref={dropdown} tabIndex={0} onClick={() => setOpenDropdown(prev => !prev)} onBlur={handleBlur}>
            {openDropdown && <button className="delete-post" onClick={() => setShowDeletionModal(true)}>Delete post</button>}
          </div>
        }
        {showCloseButton && <button className="close-post" onClick={() => navigate(-1)}></button>}
      </div>
    </div>
  )
}