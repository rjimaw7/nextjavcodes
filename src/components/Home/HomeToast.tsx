import { CheckCircle2 } from 'lucide-react';
import React from 'react';

interface Props {
  message: string;
}

const HomeToast = ({ message }: Props) => {
  return (
    <div className="primary-yellow flex items-center gap-2">
      <CheckCircle2 />
      <p>Code {message}!</p>
    </div>
  );
};

export default HomeToast;
