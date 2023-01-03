import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { isDarkAtom } from "./atom";
import { BsMoonStarsFill } from "react-icons/bs";
import { FaSun } from "react-icons/fa";

const ToggleButton = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.textColor};
  position: absolute;
  top: 5%;
  left: 3%;
`;

const ToggleMode = () => {
  const isDark = useRecoilValue(isDarkAtom);
  const setMode = useSetRecoilState(isDarkAtom);
  const toggleMode = () => {
    setMode((prev) => !prev);
  };
  return (
    <ToggleButton onClick={toggleMode}>
      {isDark ? (
        <FaSun size={40} color="black" />
      ) : (
        <BsMoonStarsFill size={30} color="white" />
      )}
    </ToggleButton>
  );
};

export default ToggleMode;
