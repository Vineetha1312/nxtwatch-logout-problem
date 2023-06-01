import styled from 'styled-components'

export const VideoItemContainer = styled.div`
  background-color: ${props => (props.outline ? '#0f0f0f' : '#f9f9f9')};
  display: flex;
  flex-direction: column;
`

export const VideoContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${props => (props.outline ? '#0f0f0f' : '#f8fafc')};
  padding: 20px;
  margin-top: 0px;
  width: 100vw;
`
