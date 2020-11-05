import './App.css';
import Search from "./components/search";
import Header from "./components/header";
import { Router } from "@reach/router";
import Welcome from './components/welcome';
import Resources from "./components/resources";
import News from "./components/news";
import FloorPlanPage from "./components/floorplanpage";
import background from './images/woods.jpg';
import FloorPlanForm from "./components/floorplanform";

function App() {
  return (
    <div className="App">
      <div className="header-bar">
        <header className="App-header">
          <Header />
        </header>
      </div>
        
      <img className="background_image" src={background} />
      <div className="main-container">
        <Router>
          <Welcome path="/" />
          <FloorPlanPage path="/floorplan/:id" />
          <Search path="/search" />
          <Resources path="/resources" />
          <News path="/news" />
          <FloorPlanForm path="/floorplan/edit/:id" />
        </Router>
      </div>
      
    </div>
  );
}

export default App;
