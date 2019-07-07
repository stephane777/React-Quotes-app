import React from 'react'
import QuoteBox from '../style/QuoteBox.css'

const quoteBox = (props) =>{
    return (
        <div id="quote-box" className="QuoteBox">
          <div id="text" dangerouslySetInnerHTML={{__html: props.text}}></div>
          <div id="author">{props.author}</div>
          <a href="blank" onClick={props.handleNewQuote} id="new-quote">
              <button >new Quote</button>
          </a>
          {/* <button id="new-quote">new Quote</button> */}
          <a href="twitter.com/intent/tweet" onClick={props.handleTweet} id="tweet-quote">
            <button >tweet</button>
          </a>
        </div>
    )
}
export default quoteBox