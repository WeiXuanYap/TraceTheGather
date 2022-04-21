import React from 'react'
import loadingGif from '../assets/loading_circle.gif'

export default function Loading() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <img src={loadingGif} alt="loading" />
    </div>
  )
}
