
import { useRoutes } from 'react-router-dom'
import routes from './routes'
import { Container } from 'react-bootstrap'
import Header from './compponents/Header'
import Footer from './compponents/Footer'

function App() {
  const element = useRoutes(routes)
  return (
    <div>
      <Header />
      <main className="py-3">
        <Container>
          {element}
        </Container>
      </main>
      <Footer />
    </div >
  );
}

export default App;
