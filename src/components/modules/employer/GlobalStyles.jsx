import React from 'react';

const GlobalStyles = () => (
  <style jsx global>{`
    body {
      font-family: "Vazirmatn", sans-serif;
      background-color: #000000;
      color: #d1d5db;
      overflow-x: hidden;
    }
    input:focus,
    select:focus,
    textarea:focus {
      outline: none;
      border-color: #facc15;
      box-shadow: 0 0 0 1px #facc15;
    }
    select option {
      background-color: #1f2937;
      color: #d1d5db;
    }
    ::-webkit-scrollbar {
      width: 8px;
    }
    ::-webkit-scrollbar-track {
      background: #1a1a1a;
    }
    ::-webkit-scrollbar-thumb {
      background: #4a4a4a;
      border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #6a6a6a;
    }
  `}</style>
);

export default GlobalStyles;
