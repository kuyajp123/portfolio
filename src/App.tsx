import { About, PersonalDetails, Header } from '@/components';
import { Card } from '@/components/ui/cards/Card';

const App = () => {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="w-full max-w-4xl">
        <header className="p-4">
          <Header />
        </header>

        <section className="grid grid-cols-1 gap-4 p-4 md:grid-cols-[2fr_1fr]">
          <Card>
            <About />
          </Card>
          <Card>
            <PersonalDetails />
          </Card>
          <div>3</div>
          <div>4</div>
        </section>
      </div>
    </main>
  );
};

export default App;
