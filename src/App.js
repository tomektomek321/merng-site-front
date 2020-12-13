import 'semantic-ui-css/semantic.min.css'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import { Container } from 'semantic-ui-react'


import MenuBar from './components/MenuBar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
  return (
    <Container>
      <Router>
        <MenuBar />
        <Route exact path="/" component={Home} />
        <Route exact path="/home" component={Login} />
        <Route exact path="/register" component={Register} />
      </Router>
    </Container>
  );
}

export default App;
