import React from 'react'
import Confetti from 'react-confetti';

function Header(props) {
  const {screen: {width, height}} = window;
  const { error, party, breachResults } = props
  if (party) {
    return (
      <>
        <Confetti width={width} height={height} />
        <h1>Oh Yea! No breaches! 🥳</h1>
      </>
    )
  } 
  if (breachResults && !error) {
    return (
      <h1>Oof. You were breached {breachResults.length} time{breachResults.length > 1 ? 's': ''} 💀</h1>
    )
  } 
  return <h1>How Badly Was I Breached? 🤔</h1>
}

export default Header
