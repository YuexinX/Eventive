import { Box } from '@mui/material';

const NeedConfirmationBanner = () => {
  return (
    <Box
      my={10}
      sx={{
        p: 8,
        border: '1px dashed #b996ec',
        fontWeight: 'medium',
        textAlign: 'center',
        position: 'absolute',
        top: '30%',
        left: '50%',
        color: '#8060c3',
        transform: 'translate(-50%, -50%)',
      }}>
      <Box
        sx={{
          color: '#7e22ce',
          borderBottom: '1px solid #8060c3',
          p: 2,
          typography: 'h3',
        }}>
        Confirmation Needed
      </Box>
      <Box sx={{ p: 2, typography: 'body1' }}>
        An email has been sent to your registered email address.
      </Box>
      <Box sx={{ p: 1, typography: 'body1' }}>
        Please confirm your email address to complete the registration process.
      </Box>
    </Box>
  );
};

export default NeedConfirmationBanner;
