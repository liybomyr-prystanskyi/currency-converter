import "./App.css";
import { Outlet, Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import "./style.css";

function App() {
  return (
    <div className="App">
      <Navbar className="my_navbar">
        <Container>
          <Navbar.Brand as={Link} to="/">Exchange Rate</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/crurrency-conversion">Currency Conversion</Nav.Link>
            <Nav.Link as={Link} to="/history-rete">History Rate</Nav.Link>
            <Nav.Link as={Link} to="/comparison">Comparison</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Outlet/>
    </div>
  );
}

export default App;
