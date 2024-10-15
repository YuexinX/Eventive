import type { ButtonProps } from '@mui/material';
import { Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

interface LinkButtonProps extends ButtonProps {
  to: string;
  children: React.ReactNode;
}

const LinkButton: React.FC<LinkButtonProps> = ({ to, children, ...params }) => {
  return (
    <Button component={RouterLink} to={to} {...params}>
      {children}
    </Button>
  );
};

export default LinkButton;
