import './App.css';
import { React } from 'react';
import { Headline } from './Headline.js'
import { Base } from './Base.js'
import { List } from './List.js'
import { News } from './News.js'
import { Footer } from './Footer.js'

function App() {
  return (
    <div>
      <Headline />
      <Base />
      <List />
      <News />
      <Footer />
    </div>
  );
}

export default App;
