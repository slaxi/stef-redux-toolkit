import React from "react";
import "./index.css";
import Main from "./components/Main";
import ImageDetails from "./components/ImageDetails";

function App() {
  return (
    <>
      <main className="detail">
        <Main />
      </main>
      <aside className="sidebar">
        <ImageDetails />
      </aside>
    </>
  );
}

export default App;

