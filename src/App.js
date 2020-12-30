import 'semantic-ui-css/semantic.min.css'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import { AuthProvider } from './context/auth';
import AuthRoute from './util/AuthRoute';
import './index.css';
import Profile from './pages/Profile'

import MenuBar from './components/MenuBar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import SinglePost from './pages/SinglePost'

function App() {
  return (
    <AuthProvider>
    <Container>
      <Router>
        <MenuBar />
        <Route exact path="/" component={Home} />
        <Route exact path="/Profile/:userId" component={Profile} />
        <AuthRoute exact path="/login" component={Login} />
        <AuthRoute exact path="/register" component={Register} />
        <Route exact path="/posts/:postId" component={SinglePost} />
      </Router>
    </Container>
    </AuthProvider>
  );
}

export default App;
