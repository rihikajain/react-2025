import Header from "./components/Header";
import Examples from "./components/Examples";
import CoreConcepts from "./components/CoreConcepts";
function App() {
  return (
    <div>
      <Header />
      <main>
        <CoreConcepts />
        <Examples />
      </main>
    </div>
  );
}

export default App;
