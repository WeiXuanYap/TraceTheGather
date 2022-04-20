import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import IconButton from '../IconButton'
import approvalIcon from '../../assets/Approval.svg'
import joinIcon from '../../assets/People.svg'

const Container = styled.div`
  position: absolute;
  top: 1%;
  left: 18%;
`
const SelectedLineJoin = styled.div`
  position: absolute;
  width: 97px;
  height: 0px;
  left: 30px;
  top: 40px;

  border: 1px solid #000000;
`

const SelectedLineApprovals = styled.div`
  position: absolute;
  width: 90px;
  height: 0px;
  left: 168px;
  top: 40px;

  border: 1px solid #000000;
`

export default function MeetingTabs(props) {
  const navigate = useNavigate()
  return (
    <Container>
      <IconButton
        src={joinIcon}
        size={'13px'}
        padding={'10px 10px 0 30px'}
        onClick={() => navigate(`/meetings/join/${props.emp.eid}`)}
      >
        Join/Leave
      </IconButton>
      {props.joinSelected && <SelectedLineJoin />}
      {props.approvalsSelected && <SelectedLineApprovals />}
      <IconButton
        src={approvalIcon}
        size={'13px'}
        padding={'10px 10px 0 30px'}
        onClick={() => navigate(`/meetings/approvals/${props.emp.eid}`)}
      >
        Approvals
      </IconButton>
    </Container>
  )
}
