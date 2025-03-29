
import React from 'react';
import { Link } from 'lucide-react';

interface StoreLinkProps {
  handleCopyStoreLink: () => void;
}

const StoreLink: React.FC<StoreLinkProps> = ({ handleCopyStoreLink }) => {
  return (
    <div className="flex justify-between items-center px-4 py-3 bg-white border-b">
      <div className="flex items-center">
        <span>Copy Store link</span>
      </div>
      <Link className="h-5 w-5 cursor-pointer" onClick={handleCopyStoreLink} />
    </div>
  );
};

export default StoreLink;
