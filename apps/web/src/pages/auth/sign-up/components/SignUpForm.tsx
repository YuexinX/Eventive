import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Grid, Link, Typography } from '@mui/material';
import type { SubmitHandler } from 'react-hook-form';
import { FormProvider, useForm } from 'react-hook-form';
import RHFInput from 'src/components/RHF/RHFInput';
import { useAuthContext } from 'src/contexts/AuthContext';
import { z } from 'zod';

const schema = z.object({
  name: z.string(),
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type Form = z.infer<typeof schema>;

const SignUpForm = () => {
  const { register } = useAuthContext();

  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<Form> = async (data) => {
    await register(data);
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
        Sign Up
      </Typography>

      <FormProvider {...methods}>
        <Box component='form' onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
          <RHFInput<Form>
            fullWidth
            id='name'
            label='Name'
            margin='normal'
            name='name'
            placeholder='John Doe'
          />
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
            Sign Up
          </Button>
          <Grid container justifyContent='flex-end'>
            <Grid item>
              <Link href='/auth/sign-in' variant='body2'>
                Already have an account? Sign In
              </Link>
            </Grid>
          </Grid>
        </Box>
      </FormProvider>
    </Box>
  );
};

export default SignUpForm;
