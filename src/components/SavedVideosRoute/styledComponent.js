import styled from 'styled-components'

export const SaveContainer = styled.div`
  background-color: ${props => (props.outline ? '#0f0f0f' : '#f9f9f9')};
  display: flex;
  flex-direction: column;
`
export const SaveTopContainer = styled.div`
  background-color: ${props => (props.outline ? '#231f20' : '#ebebeb')};
  display: flex;
  flex-direction: row;
  padding: 10px;
  margin-bottom: 0px;
`
export const SaveLogoContainer = styled.div`
  background-color: ${props => (props.outline ? '#181818' : '#d7dfe9')};
  border-radius: 100px;
  height: 50px;
  width: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
`
