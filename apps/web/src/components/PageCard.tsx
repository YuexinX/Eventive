import { Box, Paper } from '@mui/material';

interface PageCardProps {
  padding?: number;
  children: React.ReactNode;
}

const PageCard: React.FC<PageCardProps> = ({ children }) => {
  return (
    <Paper>
      <Box padding={4}>{children}</Box>
    </Paper>
  );
};

export default PageCard;
