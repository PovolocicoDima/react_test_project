import './styles/App.css';
import { BrowserRouter } from 'react-router-dom';
import MyNavbar from './components/UI/MyNavbar/MyNavbar';
import AppRouter from './components/AppRouter';

const App = () => {
  return (
    <BrowserRouter>
      <MyNavbar />
      <AppRouter />
    </BrowserRouter>
  );
};

export default App;
