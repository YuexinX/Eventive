/* eslint-disable -- ignore */
import { Box, Button, Container, Typography } from '@mui/material';
import { useRouteError } from 'react-router-dom';

const NotFoundPage = () => {
  const error = useRouteError() as any;

  return (
    <Container component='main' maxWidth='xs'>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          paddingY: 8,
        }}>
        <Typography
          component='div'
          gutterBottom
          sx={{ fontWeight: 600 }}
          variant='h4'>
          哎呀
        </Typography>

        <Typography
          component='div'
          gutterBottom
          sx={{ fontWeight: 600 }}
          variant='h6'>
          对不起，发生了意外错误
        </Typography>

        <Typography
          component='div'
          gutterBottom
          sx={{ fontWeight: 600 }}
          variant='h6'>
          {error?.statusText || error?.message}
        </Typography>

        <Button href='/' variant='contained'>
          回到首页
        </Button>
      </Box>
    </Container>
  );
};

export default NotFoundPage;
