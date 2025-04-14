
import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
}

const Logo = ({ className = '' }: LogoProps) => {
  return (
    <Link to="/" className={`font-bold text-2xl text-invento-600 ${className}`}>
      INVENTO
    </Link>
  );
};

export default Logo;
