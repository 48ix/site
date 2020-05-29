import * as React from 'react';

const Loading = () => {
  return (
    <div className="main-container">
      <div className="loader-container">
        <div className="loader">
          <div />
          <div />
          <div />
          <div />
        </div>
      </div>
      <style jsx>{`
        @media (prefers-color-scheme: light) {
          .main-container[class] {
            background-color: #ffffff;
          }
        }
        .main-container {
          display: flex;
          min-width: 100vh;
          min-height: 100vh;
          background-color: #0a192f;
        }
        .loader-container {
          margin: auto;
        }
        .loader {
          display: inline-block;
          position: relative;
          width: 80px;
          height: 80px;
        }
        @media (prefers-color-scheme: light) {
          .loader div[class] {
            background: rgb(20, 44, 211);
          }
        }
        .loader div {
          position: absolute;
          top: 33px;
          width: 13px;
          height: 13px;
          background: rgb(0, 213, 230);
          border-radius: 50%;
          animation-timing-function: cubic-bezier(0, 1, 1, 0);
        }
        .loader div:nth-child(1) {
          left: 8px;
          animation: loader1 0.6s infinite;
        }
        .loader div:nth-child(2) {
          left: 8px;
          animation: loader2 0.6s infinite;
        }
        .loader div:nth-child(3) {
          left: 32px;
          animation: loader2 0.6s infinite;
        }
        .loader div:nth-child(4) {
          left: 56px;
          animation: loader3 0.6s infinite;
        }
        @keyframes loader1 {
          0% {
            transform: scale(0);
          }
          100% {
            transform: scale(1);
          }
        }
        @keyframes loader3 {
          0% {
            transform: scale(1);
          }
          100% {
            transform: scale(0);
          }
        }
        @keyframes loader2 {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(24px, 0);
          }
        }
      `}</style>
    </div>
  );
};

export default Loading;
