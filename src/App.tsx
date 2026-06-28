import { About, Experience, Header, PersonalDetails } from '@/components';
import { Projects } from '@/pages/projects';

const App = () => {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="w-full max-w-4xl">
        <header className="p-4">
          <Header />
        </header>

        <section className="grid grid-cols-1 gap-4 p-4 md:grid-cols-[2fr_1fr]">
          <About />
          <PersonalDetails />
          <Projects />
          <Experience />
        </section>
      </div>
    </main>
  );
};

export default App;
