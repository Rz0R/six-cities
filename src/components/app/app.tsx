import MainScreen from '../main-screen/main-screen';

type AppScreenProps = {
  offercCardsCount: number
}

function App({ offercCardsCount }: AppScreenProps): JSX.Element {
  return (
    <MainScreen offercCardsCount={offercCardsCount} />
  );
}

export default App;
