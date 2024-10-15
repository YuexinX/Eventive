import { Container } from '@mui/material';

import SignUpForm from './components/SignUpForm';

const AuthSignUpPage = () => {
  return (
    <Container component='main' maxWidth='xs'>
      <SignUpForm />
    </Container>
  );
};

export default AuthSignUpPage;
