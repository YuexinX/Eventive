import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Grid, Link, Typography } from '@mui/material';
import { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import RHFInput from 'src/components/RHF/RHFInput';
import { reactQueryClient } from 'src/services/api';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email('invalid email'),
});

type Form = z.infer<typeof schema>;

const ResetPasswordForm = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
    },
  });
  const navigate = useNavigate();
  const { handleSubmit } = methods;

  const sendResetEmail = reactQueryClient.users.reset.useMutation();

  const onSubmit: SubmitHandler<Form> = (data) => {
    sendResetEmail.mutate(data);

    navigate('/email-sent', { replace: true });
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
        Reset your password
      </Typography>
      <Typography
        component='div'
        gutterBottom
        sx={{ fontWeight: 300 }}
        variant='body1'>
        Enter your email address and we’ll send you a link to reset your
        password
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

          <Button
            fullWidth
            sx={{ mt: 3, mb: 2 }}
            type='submit'
            variant='contained'>
            reset password
          </Button>
          <Grid container justifyContent='flex-end'>
            <Grid item>
              <Link href='/auth/sign-in' variant='body2'>
                go back to sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </FormProvider>
    </Box>
  );
};

export default ResetPasswordForm;
