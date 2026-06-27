import { Header } from '@/components/header/Header';

const App = () => {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="w-full max-w-4xl">
        <header className="p-4">
          <Header />
        </header>

        <section className="grid grid-cols-1 gap-4 p-4 border md:grid-cols-[2fr_1fr]">
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
        </section>
      </div>
    </main>
  );
};

export default App;
