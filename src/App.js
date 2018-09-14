import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import {connect} from 'react-redux';  //connect app together
import { updateSearch } from './actions/searchAction'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentSearch: '',
      articleList: []
    }
    this.onUpdateSearch = this.onUpdateSearch.bind(this);
    this.getArticles = this.getArticles.bind(this);
    this.fieldChangeTrack = this.fieldChangeTrack.bind(this);
  }

  componentWillMount(){
    this.getArticles();
    this.onUpdateSearch;
  }

  //shorten string for description of story
  infoCleanup(info){
    if(info){
      let sliceNum = 150;
      if(info.length > sliceNum){
        return info.slice(0, sliceNum) + "... ";
      }
      else if(info && info.length < sliceNum){
        let num = sliceNum - info.length;
        let spaces = " ";
        for(var i = 0; i < num; i++){
          spaces += " ";
        }
        return info + spaces;
      }
    }
  }

  //grab the articles from api
  getArticles(){
    fetch('https://hn.algolia.com/api/v1/search?query=' + this.state.currentSearch + '&tags=story')
    .then(res => res.json())
    .then(data => this.setState({ articleList: data.hits }))
  }

  fieldChangeTrack(e){
    this.setState({currentSearch: e.target.value})
  }

  onUpdateSearch(e){
    e.preventDefault();
    console.log("updateSearch is working");
    //this.props.onUpdateSearch(this.refs.searchBar.value);
    this.props.onUpdateSearch(this.state.currentSearch);
    this.getArticles();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Article Fire</h1>
          <h5>(Liz said that design/UI didn't matter so I didn't do any)</h5>
        </header>
        <div>
          <h5><a href="https://github.com/Wyzardsleeves/article-fire" target="_blank" rel="noopener noreferrer">Find on Github</a></h5>
        </div>
        <form>
          <input ref="searchBar" onChange={this.fieldChangeTrack} type="text" />
          <button onClick={this.onUpdateSearch}>Update Search</button>
        </form>
        {this.props.search !== '' &&
          <p>Showing Results for <span style={{color: 'green'}}>{this.props.search}</span></p>
        }
        <div>
          <ul>
            {this.state.articleList.map((article) =>
              <li key={article.objectID}>
                <h3>{article.title}</h3>
                <h5>By {article.author}</h5>
                {article.story_text &&
                  <p>Preview: {this.infoCleanup(article.story_text)}</p>
                }
                <p>{article.num_comments} Comments</p>
                <p>{article.points} Likes</p>
                <p>Published on {article.created_at}</p>
                {article.url &&
                  <p><a href={article.url} target="_blank">Go to artilcle ></a></p>
                }
                -------------------------------------------------
              </li>
            )}
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  articles: state.articles,
  search: state.search
});

const mapActionsToProps = {
  onUpdateSearch: updateSearch
};

export default connect(mapStateToProps, mapActionsToProps)(App);
