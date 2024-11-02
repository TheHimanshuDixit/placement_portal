import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
import styled, { keyframes } from "styled-components";

// Define a glowing animation using keyframes
const glow = keyframes`
  0% {
    box-shadow: 0 0 5px #4a90e2, 0 0 10px #4a90e2, 0 0 20px #4a90e2, 0 0 30px #4a90e2;
  }
  50% {
    box-shadow: 0 0 10px #4a90e2, 0 0 20px #4a90e2, 0 0 40px #4a90e2, 0 0 60px #4a90e2;
  }
  100% {
    box-shadow: 0 0 5px #4a90e2, 0 0 10px #4a90e2, 0 0 20px #4a90e2, 0 0 30px #4a90e2;
  }
`;

// Create a styled div to wrap the loader and apply the animation
const LoaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f8f9fa;

  .loader {
    animation: ${glow} 1.5s infinite alternate;
  }
`;

const GlowingLoader = () => {
  return (
    <LoaderWrapper>
      <ClipLoader color="#4a90e2" loading={true} size={80} className="loader" />
    </LoaderWrapper>
  );
};

export default GlowingLoader;
