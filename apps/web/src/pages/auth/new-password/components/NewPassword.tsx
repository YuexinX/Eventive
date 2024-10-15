import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Typography } from '@mui/material';
import { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import RHFInput from 'src/components/RHF/RHFInput';
import { reactQueryClient } from 'src/services/api';
import { StringParam, useQueryParam, withDefault } from 'use-query-params';
import { z } from 'zod';

const schema = z.object({
  token: z.string(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type Form = z.infer<typeof schema>;

const NewPassword = () => {
  const navigate = useNavigate();
  const TokenParam = withDefault(StringParam, '');
  const [resetToken] = useQueryParam('token', TokenParam);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      token: resetToken,
      password: '',
    },
  });

  const { handleSubmit } = methods;

  const setNewPassword = reactQueryClient.users.newPassword.useMutation();

  const onSubmit: SubmitHandler<Form> = (data) => {
    setNewPassword.mutate(data);

    navigate('/', { replace: true });
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
        Title
      </Typography>

      <FormProvider {...methods}>
        <Box component='form' onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
          <RHFInput<Form>
            autoComplete='password'
            fullWidth
            id='password'
            label='password'
            margin='normal'
            name='password'
            type='password'
          />

          <Button
            fullWidth
            sx={{ mt: 3, mb: 2 }}
            type='submit'
            variant='contained'>
            reset password
          </Button>
        </Box>
      </FormProvider>
    </Box>
  );
};

export default NewPassword;
