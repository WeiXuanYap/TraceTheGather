import styled from 'styled-components'

export const Data = styled.td`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 28px;
  /* identical to box height, or 175% */

  width: 25%;
  text-align: left;
  padding: 20px;

  /* Gray 1 */

  color: #333333;
`
export const Header = styled.th`
  width: 30%;
  text-align: left;
  padding: 20px;

  font-family: 'Inter';
  font-style: normal;
  font-weight: 800;
  font-size: 16px;
  line-height: 19px;

  /* Gray 1 */

  color: #333333;
`

export const Row = styled.tr`
  background: #e3f2fd;
  border: 1px solid black;
  border-collapse: collapse;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;

  & ${Data}:last-child {
    text-align: right;
    margin-right: 3%;
  }
  & ${Header}:last-child {
    text-align: right;
    margin-right: 3%;
  }
`
export const RowEmp = styled.tr`
  background: #e3f2fd;
  border: 1px solid black;
  border-collapse: collapse;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;

  & ${Data}:nth-child(1) {
    font-weight: bold;
    cursor: pointer;
  }
  & ${Data}:nth-child(2) {
    cursor: pointer;
  }
  & ${Data}:nth-child(3) {
    cursor: pointer;
  }
  & ${Data}:nth-child(4) {
    cursor: pointer;
  }
  & ${Data}:last-child {
    text-align: right;
    margin-right: 3%;
  }
  & ${Header}:last-child {
    text-align: right;
    margin-right: 3%;
  }
`

export const TableContainer = styled.table`
  width: 96%;
  margin-left: 2%;
  border: 1px solid black;
  border-collapse: collapse;
  margin-bottom: 100px;

  & ${Row}:nth-child(even) {
    background: #ffffff;
  }
`
export const TableContainerEmp = styled.table`
  width: 96%;
  margin-left: 2%;
  border: 1px solid black;
  border-collapse: collapse;
  margin-bottom: 100px;

  & ${RowEmp}:nth-child(even) {
    background: #ffffff;
  }
  & ${RowEmp}:hover {
    background: #d3d3d3;
  }
  & ${RowEmp}:first-child {
    background: #e3f2fd;
  }
`

export const Icon = styled.img`
  cursor: pointer;
`

export const ResignedText = styled.label`
  margin: 0;
  font-weight: bold;
  font-size: 12px;
`
