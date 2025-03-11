import { Header } from '@/src/components/header/Header';
import { Polls } from '@/src/components/polls/Polls';
import { Container } from '@/src/components/shared/Container';

const Home = () => {
  return (
    <main>
      <Container>
        <Header />
        <Polls />
      </Container>
    </main>
  );
};

export default Home;
