import styled from 'styled-components'

export const Header = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 10px;
  line-height: 12px;
  /* identical to box height, or 120% */

  letter-spacing: 1.5px;
  text-transform: uppercase;

  /* Black / High Emphasis */

  color: rgba(0, 0, 0, 0.87);

  mix-blend-mode: normal;

  display: flex;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
  margin: 4px 0px;
  padding-left: 20px;
  padding-top: 10px;
`

export const Data = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 30px;
  /* identical to box height, or 150% */

  letter-spacing: 0.15px;

  /* Black / High Emphasis */

  color: rgba(0, 0, 0, 0.87);

  mix-blend-mode: normal;
  display: flex;
  padding-left: 20px;
  /* Inside auto layout */
`

export const ProfileBox = styled.div`
  background: #fafafa;
  border: 1px solid #ebebeb;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 60px 20px 0 30px;
`
