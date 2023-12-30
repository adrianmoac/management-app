import React from 'react'
import TopBox from './TopBox'
import TopBar from './TopBar'

const ShowPageBox = props => {
    const {children} = props
    
  return (
    <>
        <TopBox>
            <TopBar color={'white'}></TopBar>
            {children}
        </TopBox>
    </>
    )
}

export default ShowPageBox 