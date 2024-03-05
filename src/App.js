import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import DevExtremeWebAPIServiceExample from './pages/devextreme/WebAPIServiceExample';
import SyncfusionWebAPIServiceExample from './pages/syncfusion/WebAPIServiceExample';

function App() {
  return (
    <div className="App">
      <header>
        <Navbar expand="lg" className="bg-body-tertiary">
          <Container>
            <Navbar.Brand href="/">Different-Grid-Library-Examples</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/devextremeWebAPIService">DevExtreme-Web-API-Service</Nav.Link>
                <Nav.Link href="/syncfusionWebAPIService">Syncfusion-Web-API-Service</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/devextremeWebAPIService" element={<DevExtremeWebAPIServiceExample />}></Route>
        <Route path="/syncfusionWebAPIService" element={<SyncfusionWebAPIServiceExample />}></Route>
      </Routes>
      {/* <footer>
        Footer
      </footer> */}
    </div>
  );
}

export default App;
