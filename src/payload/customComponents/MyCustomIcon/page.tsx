import React from 'react';
import { Logo  as image} from '../../components/graphic/Logo';
const MyCustomIcon: React.FC = () => {
  return (
    <div style={{ width: 24, height: 24 }}> {/* Adjust size as needed */}
      <image />
    </div>
  );
};

export default MyCustomIcon;
