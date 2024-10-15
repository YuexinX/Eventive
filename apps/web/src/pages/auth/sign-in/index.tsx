import { Container } from '@mui/material';

import SignInForm from './components/SiginInForm';

const AuthSignInPage = () => {
  return (
    <Container component='main' maxWidth='xs'>
      <SignInForm />
    </Container>
  );
};

export default AuthSignInPage;
