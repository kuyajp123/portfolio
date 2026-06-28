import { BackendDataView } from '@/components/ui/cards/BackendDataView';
import { FlipCard } from '@/components/ui/cards/FlipCard';
import { CardRowData } from '@/components/ui/cards/CardRowData';
import { FaUser } from 'react-icons/fa6';
import { GiGraduateCap } from 'react-icons/gi';
import { GrLanguage } from 'react-icons/gr';
import { MdOutlineComputer, MdOutlineLocationOn } from 'react-icons/md';

const personalDetailsData = {
  education: 'Cavite State University',
  program: 'Information Technology',
  location: 'Cavite, Philippines',
  sex: 'Male',
  language: 'English/Filipino',
};

const objects = [
  {
    key: 'education',
    icon: <GiGraduateCap className="inline mr-1" size={18} />,
    label: 'Education: ',
    value: personalDetailsData.education,
  },
  {
    key: 'program',
    icon: <MdOutlineComputer className="inline mr-1" size={18} />,
    label: 'Program: ',
    value: personalDetailsData.program,
  },
  {
    key: 'location',
    icon: <MdOutlineLocationOn className="inline mr-1" size={20} />,
    label: 'Location: ',
    value: personalDetailsData.location,
  },
  {
    key: 'sex',
    icon: <FaUser className="inline mr-1" size={16} />,
    label: 'Sex: ',
    value: personalDetailsData.sex,
  },
  {
    key: 'language',
    icon: <GrLanguage className="inline mr-1" size={16} />,
    label: 'Language: ',
    value: personalDetailsData.language,
  },
];

interface PersonalDetailsProps {
  isBackendMode?: boolean;
}

export const PersonalDetails = ({ isBackendMode = false }: PersonalDetailsProps) => {
  const frontendView = <CardRowData sectionTitle="Personal Details" objects={objects} />;
  const backendView = (
    <BackendDataView sectionTitle="Personal Details" objectName="personalDetailsData" data={personalDetailsData} />
  );

  return <FlipCard isFlipped={isBackendMode} front={frontendView} back={backendView} />;
};
