import React from 'react';
import '../style/App.css';
import QuoteBox from './QuoteBox'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      isLoaded: false,
      quotes: [],
      quote: {}
    }
    this.handleNewQuote = this.handleNewQuote.bind(this)
    this.handleTweet = this.handleTweet.bind(this)
    this.fetchApi = this.fetchApi.bind(this)
    this.getQuote = this.getQuote.bind(this)
    
  }
  fetchApi() {
    // const num = ~~(Math.random()*100+1)
    const url = 'https://cors-anywhere.herokuapp.com/https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=40';
    fetch(url, {
      mode: 'cors'
    })
      .then(res => {
        return res.json()
      })
      .then(
        result => {
          const quote = this.getQuote(result)
          this.setState({
            isLoaded: true,
            quotes: result,
            quote
          })
        },
        error => {
          this.setState({
            error,
            isLoaded: false
          })
        }
      ).catch(err => {
        this.setState({error: err})
      })
  }
  getQuote(quotes){
    const index = Math.floor(Math.random()*40)
    const quote = quotes[index]
    return quote
  }
  handleNewQuote(event){
    event.preventDefault();
    const quotes = this.state.quotes
    const quote = this.getQuote(quotes)
    this.setState({
      quote
    })
  }
  handleTweet(event){
    event.preventDefault();
    const content = this.state.quote.content
    const clearContent = content
    .replace(/<\/?p>/gm,'')
    .replace(/&#8217;/g,'\'')
    const author = this.state.quote.title
     window.open(`https://www.twitter.com/intent/tweet?hashtags=Quotes&text=${clearContent}${author}`)
    //  window.open(`https://www.twitter.com/intent/tweet?hashtags=Quotes&text="${this.state.quote.content}""${this.state.quote.title}`);
  }
  componentDidMount() {
     this.fetchApi()
  }

  render() {
    const { error, isLoaded, quote } = this.state;
    if (error) {
      return <div className="App">Error: {error.message}</div>
    } else if (!isLoaded) {
      return <div className="App">Loading...</div>
    } else {
      return (
        <div className="App">
          <h1>Quotes generator</h1>
          <QuoteBox
            text={quote.content}
            author={quote.title}
            handleNewQuote={this.handleNewQuote}
            handleTweet={this.handleTweet}/>
        </div>
      );
    }
  }

}

export default App;
