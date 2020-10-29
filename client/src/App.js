//import './App.css';
import Search from "./components/search";
import Header from "./components/header";
import { Router } from "@reach/router";
import Welcome from './components/welcome';
import Resources from "./components/resources";
import News from "./components/news";
import FloorPlanPage from "./components/floorplanpage";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header />

        <Router>
          <FloorPlanPage path="/floorplan/:id" />
          <Welcome path="/" />
          <Search path="/search" />
          <Resources path="/resources" />
          <News path="/news" />
        </Router>
        
      </header>
    </div>
  );
}

export default App;
