import styled from 'styled-components'

export const Logo = styled.img`
  width: 124px;
  height: 98px;
`

export const LeftContainer = styled.div`
  height: 100%; /* Full-height: remove this if you want "auto" height */
  width: 200px; /* Set the width of the sidebar */
  position: fixed; /* Fixed Sidebar (stay in place on scroll) */
  z-index: 1; /* Stay on top */
  top: 0; /* Stay at the top */
  left: 0;
  overflow-x: hidden; /* Disable horizontal scroll */

  background: #ffffff;
  border: 1px solid #e5e5e5;
  box-sizing: border-box;
`

export const Name = styled.div`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 30px;
  /* or 150% */

  text-align: center;
  letter-spacing: 0.15px;

  color: #000000;
  padding: 10px;
`
export const Line = styled.div`
  height: 1px;
  background: #e5e5e5;
`

export const SmallText = styled.div`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 30px;
  /* or 214% */

  text-align: center;
  letter-spacing: 0.15px;
  margin-bottom: -15px;
  margin-top: -5px;
  color: #000000;
`

export const MainDiv = styled.div`
  margin-left: 200px;
`
