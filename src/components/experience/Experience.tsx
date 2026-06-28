import { Card } from '@/components/ui/cards/Card';

const steps = [
  {
    title: 'Startuplab',
    description: 'Full stack web developer',
    date: '2026'
  },
  {
    title: 'BS Information Technology',
    description: 'Cavite State University.',
    date: '2026',
  },
  {
    title: 'Hello World!',
    description: 'Wrote my first line of code.👏',
    date: '2019',
  },
];

export const Experience = () => {
  return (
    <Card>
      <div className="mb-6">Experience</div>
      <ol className="border-l-2 border-gray-200 ml-2">
        {steps.map((step, index) => (
          <li key={index} className="relative mb-10 pl-4">
            <span className="absolute flex items-center justify-center w-4 h-4 bg-blue-500 rounded-full -left-[9px] top-0.5">
              <svg
                className="w-3.5 h-3.5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </span>
            <h3 className="font-bold text-sm">{step.title}</h3>
            <p className="text-sm font-semibold">{step.description}</p>
            <p className="text-xs text-gray-500">{step.date}</p>
          </li>
        ))}
      </ol>
    </Card>
  );
};
