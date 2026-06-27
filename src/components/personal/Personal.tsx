import { FaUser } from 'react-icons/fa6';
import { GiGraduateCap } from 'react-icons/gi';
import { GrLanguage } from 'react-icons/gr';
import { MdOutlineComputer, MdOutlineLocationOn } from 'react-icons/md';

export const PersonalDetails = () => {
  return (
    <main>
      <h1 className="mb-2">Personal Details</h1>
      <div className="flex flex-col gap-4">
        <div className="flex flex-row justify-between">
          <div className="flex items-center">
            <GiGraduateCap className="inline mr-1" size={18} />
            <p className="text-sm text-muted-foreground">Education: </p>
          </div>
          <span className="text-sm mt-1">Cavite State University</span>
        </div>
        <div className="flex flex-row justify-between">
          <div className="flex items-center">
            <MdOutlineComputer className="inline mr-1" size={18} />
            <p className="text-sm text-muted-foreground">Program: </p>
          </div>
          <span className="text-sm mt-1">Information Technology</span>
        </div>
        <div className="flex flex-row justify-between">
          <div className="flex items-center">
            <MdOutlineLocationOn className="inline " size={20} />
            <p className="text-sm text-muted-foreground">Location:</p>
          </div>
          <span className="mt-1">Cavite, Philippines</span>
        </div>
        <div className="flex flex-row justify-between">
          <div className="flex items-center">
            <FaUser className="inline mr-1" size={16} />
            <p className="text-sm text-muted-foreground">Sex: </p>
          </div>
          <span className="mt-1">Male</span>
        </div>
        <div className="flex flex-row justify-between">
          <div className="flex items-center">
            <GrLanguage className="inline mr-1" size={16} />
            <p className="text-sm text-muted-foreground">Language: </p>
          </div>
          <span className="mt-1">English/Filipino</span>
        </div>
      </div>
    </main>
  );
};
