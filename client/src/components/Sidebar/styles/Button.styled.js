import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;

  padding: 8px;
  margin: 8px;

  &:hover {
    background: #e3f2fd;
  }

  background: ${(props) => (props.isSelected ? '#E3F2FD;' : 'white')};
`
export const Text = styled.div`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  /* or 150% */

  letter-spacing: 0.1px;

  /* Black / High Emphasis */

  color: ${(props) => (props.isSelected ? '#2196F3' : 'rgba(0, 0, 0, 0.87)')};

  padding-left: 25px;
`
