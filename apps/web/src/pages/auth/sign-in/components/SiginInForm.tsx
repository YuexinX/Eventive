import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Grid, Link, Typography } from '@mui/material';
import type { SubmitHandler } from 'react-hook-form';
import { FormProvider, useForm } from 'react-hook-form';
import RHFInput from 'src/components/RHF/RHFInput';
import { useAuthContext } from 'src/contexts/AuthContext';
import { z } from 'zod';

const schema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'Email cannot be empty')
    .email('Invalid email'),
  password: z.string().min(1, 'Password cannot be empty'),
});

type Form = z.infer<typeof schema>;

const SignInForm = () => {
  const { login } = useAuthContext();
  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<Form> = async (data) => {
    await login(data);
  };

  return (
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
        Log In
      </Typography>

      <FormProvider {...methods}>
        <Box component='form' onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
          <RHFInput<Form>
            autoComplete='email'
            fullWidth
            id='email'
            label='Email'
            margin='normal'
            name='email'
          />
          <RHFInput<Form>
            autoComplete='current-password'
            fullWidth
            id='password'
            label='Password'
            margin='normal'
            name='password'
            type='password'
          />

          <Button
            fullWidth
            sx={{ mt: 3, mb: 2 }}
            type='submit'
            variant='contained'>
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href='/reset-password' variant='body2'>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href='/auth/sign-up' variant='body2'>
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </Box>
      </FormProvider>
    </Box>
  );
};

export default SignInForm;
