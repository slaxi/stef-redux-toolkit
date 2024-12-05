import React, { useState } from "react";
import { changeFavoriteTab } from "../store/imagesList";
import { useDispatch } from "react-redux";

const Tabs: React.FC<{isFavoriteOpen: boolean}> = ({isFavoriteOpen}) => {

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const dispatch = useDispatch()
  const handleSwitch = () => dispatch(changeFavoriteTab({favorite: !isFavoriteOpen}))
  return (
    <header className="header">
      <h1>Photos</h1>
      <button className="menu-button" onClick={toggleMenu}>
        {isOpen ? "✕" : "☰"}
      </button>
      <nav className={`menu ${isOpen ? "open" : ""}`}>
        <ul>
          <li className={!isFavoriteOpen ? 'active' : ''} onClick={handleSwitch}>Recently Added</li>
          <li className={isFavoriteOpen ? 'active' : ''} onClick={handleSwitch}>Favorite</li>
        </ul>
      </nav>
    </header>
  );
};

export default Tabs;
