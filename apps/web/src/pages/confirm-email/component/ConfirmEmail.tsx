import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Button } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { reactQueryClient } from 'src/services/api';
import { StringParam, useQueryParam, withDefault } from 'use-query-params';

const theme = createTheme({
  palette: {
    primary: {
      main: '#b996ec',
      dark: '#8060c3',
      light: '#7e22ce',
    },
  },
});

const ConfirmEmail = () => {
  const navigate = useNavigate();
  const TokenParam = withDefault(StringParam, '');
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [token] = useQueryParam('token', TokenParam);
  const util = reactQueryClient.useUtils();
  const confirmRequest = reactQueryClient.users.confirm.useMutation({
    onSuccess: () => {
      setIsSuccess(true);
      util.users.me.invalidate();
    },
    onError: () => {
      setIsError(true);
    },
  });

  const handleClick = () => {
    navigate('/', { replace: true });
  };

  useEffect(() => {
    confirmRequest.mutate({ token });
  }, []);

  if (isError) {
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
            p: 2,
            typography: 'h3',
          }}>
          Oh no! Something Went Wrong :(
        </Box>
        <Box sx={{ p: 2, typography: 'body1' }}>
          We failed to confirm your email
        </Box>
      </Box>
    );
  }
  if (isSuccess) {
    return (
      <ThemeProvider theme={theme}>
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
              p: 2,
              typography: 'h3',
            }}>
            Email Confirmed!
          </Box>
          <Button variant='outlined' onClick={handleClick} color='primary'>
            Click to go to home page
          </Button>
        </Box>
      </ThemeProvider>
    );
  }
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
      <LoadingButton color='primary' loading>
        confirming email...
      </LoadingButton>
    </Box>
  );
};

export default ConfirmEmail;
