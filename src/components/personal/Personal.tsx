import { Card } from '@/components/ui/cards/Card';
import { FaUser } from 'react-icons/fa6';
import { GiGraduateCap } from 'react-icons/gi';
import { GrLanguage } from 'react-icons/gr';
import { MdOutlineComputer, MdOutlineLocationOn } from 'react-icons/md';

const objects = [
  {
    key: 'education',
    icon: <GiGraduateCap className="inline mr-1" size={18} />,
    label: 'Education: ',
    value: 'Cavite State University',
  },
  {
    key: 'program',
    icon: <MdOutlineComputer className="inline mr-1" size={18} />,
    label: 'Program: ',
    value: 'Information Technology',
  },
  {
    key: 'location',
    icon: <MdOutlineLocationOn className="inline mr-1" size={20} />,
    label: 'Location: ',
    value: 'Cavite, Philippines',
  },
  {
    key: 'sex',
    icon: <FaUser className="inline mr-1" size={16} />,
    label: 'Sex: ',
    value: 'Male',
  },
  {
    key: 'language',
    icon: <GrLanguage className="inline mr-1" size={16} />,
    label: 'Language: ',
    value: 'English/Filipino',
  },
];

export const PersonalDetails = () => {
  return (
    <Card>
      <h1 className="mb-2">Personal Details</h1>
      <div className="flex flex-col gap-4">
        {objects.map((obj, index) => (
          <div className="flex flex-row justify-between" key={obj.key + index}>
            <div className="flex items-center">
              {obj.icon}
              <p className="text-sm font-semibold">{obj.label}</p>
            </div>
            <span className="text-sm mt-1 font-semibold">{obj.value}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};
