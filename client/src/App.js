import './App.css';
import Search from "./components/search";
import Header from "./components/header";
import { Router } from "@reach/router";
import Resources from "./components/resources";
import News from "./components/news";
import FloorPlanPage from "./components/floorplanpage";
import background from './images/woods.jpg';
import FloorPlanForm from "./components/floorplanform";
import MadeBy from "./components/madeby";

function App() {
    return (
        <div className="App">
            <div className="header-bar">
                <header className="App-header">
                    <Header />
                </header>
            </div>

            <img className="background_image" src={background} alt="Background scene of campsite" />
            <div className="main-container">
                <MadeBy />
                <Router>
                    <Search path="/" />
                    <FloorPlanPage path="/floorplan/:id" />
                    <Search path="/search" />
                    <Resources path="/resources" />
                    <News path="/news" />
                    <FloorPlanForm path="/floorplan/edit/:id" />
                    <FloorPlanForm path="/floorplan/new" />
                </Router>
            </div>

        </div>
    );
}

export default App;
