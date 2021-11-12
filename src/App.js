import GlobalStyles from './components/styles/Global.styled';
import Header from './components/Header';
import Form from './components/Form';

const App = () => {
  return (
    <div className="container">
      <GlobalStyles />
      <Header />
      <Form />
    </div>
  );
}

export default App;
