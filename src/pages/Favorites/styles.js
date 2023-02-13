import styled from "styled-components";
import { colors, sizes } from '../../styles/themes';

export const Container = styled.main`
  width: 100%;
  min-width: 100vw;
  height: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

export const Header = styled.header`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${colors["black"]};
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;

export const HeaderTitle = styled.h2`
  font-size: ${sizes["large"]};
  color: ${colors["white"]};
  letter-spacing: 3px;
`;

export const Section = styled.section`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 80vh;
  justify-content: space-around;
  align-items: center;
`;

export const BackButton = styled.button`
  width: 40%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  background-color: ${colors["bug"]};
  
  :hover {
    background-color: ${colors["grass"]};
  }
`;

export const BackButtonText = styled.span`
  color: ${colors["dark"]};
  font-size: ${sizes["large"]};
  font-weight: bold;
`
