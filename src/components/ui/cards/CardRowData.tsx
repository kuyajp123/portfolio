import { RiExternalLinkLine } from 'react-icons/ri';
import { Card } from './Card';

interface CardRowDataProps {
  sectionTitle: string;
  objects: {
    key: string;
    icon: React.ReactNode;
    label: string;
    value?: string;
    links?: string;
  }[];
}

export const CardRowData = ({ sectionTitle, objects }: CardRowDataProps) => {
  return (
    <Card>
      <h1 className="mb-2">{sectionTitle}</h1>
      <div className="flex flex-col gap-4">
        {objects.map((obj) => (
          <div className="flex flex-row justify-between" key={obj.key}>
            <div className="flex items-center">
              {obj.icon}
              <p className="text-sm font-semibold">{obj.label}</p>
            </div>
            <div className="flex items-center gap-2">
              {obj.value && <span className="text-sm mt-1 font-semibold">{obj.value}</span>}
              {obj.links && (
                <a
                  href={obj.links}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm mt-1 font-semibold text-blue-500 hover:underline"
                >
                  <RiExternalLinkLine className="inline mr-1" size={16} />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
