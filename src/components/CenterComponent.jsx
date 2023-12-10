import React from 'react'
import { useGlobalContext } from '../context/walletContext'

function CenterComponent() {

  const { pollQuestion, pollOptions, GiveYourVote, hasVoted } =
    useGlobalContext();
  return (
    <>
      {/* {!hasVoted ? ( */}
        <div style={{ marginTop: "40%" }}>
          <div style={{ marginBottom: "50px" }}>
            {pollQuestion ? <button>{pollQuestion}</button> : null}
          </div>
          {pollOptions.map((option, index) => {
            return (
              <button
                onClick={() => GiveYourVote(index)}
                key={index}
                style={{ marginLeft: "10px" }}
              >
                {option}
              </button>
            );
          })}
        </div>
      {/* ) : (
        <button style={{ marginTop: "40%" }}>
          You have already Voted. Scroll 👇 to see the current results
        </button>
      )} */}
    </>
  );

}

export default CenterComponent