import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Grid, Link, Typography } from '@mui/material';
import type { SubmitHandler } from 'react-hook-form';
import { FormProvider, useForm } from 'react-hook-form';
import RHFInput from 'src/components/RHF/RHFInput';
import { reactQueryClient } from 'src/services/api';
import { z } from 'zod';

const schema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  date: z.string().trim().date('Invalid date'),
  time: z.string().trim().min(1, 'Time is required'),
  timeZone: z.string().trim(),

  duration: z.number().gte(0).optional(),
  location: z.string().optional(),
  dressCode: z.string().optional(),
  giftList: z.string().array().optional(),
});

type Form = z.infer<typeof schema>;

const CreateEventForm = () => {
  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
      description: '',
      date: '',
      time: '',
      timeZone: '',
      duration: 0,
      location: '',
      dressCode: '',
      giftList: [],
    },
  });

  const { handleSubmit } = methods;
  const createEvent = reactQueryClient.events.create.useMutation();

  const onSubmit: SubmitHandler<Form> = (data) => {
    createEvent.mutate(data);
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
            autoComplete='title'
            fullWidth
            id='title'
            label='title'
            margin='normal'
            name='title'
          />

          <RHFInput<Form>
            autoComplete='description'
            fullWidth
            id='description'
            label='description'
            margin='normal'
            name='description'
          />
          <RHFInput<Form>
            autoComplete='date'
            fullWidth
            id='date'
            label='date'
            margin='normal'
            name='date'
          />
          <RHFInput<Form>
            autoComplete='time'
            fullWidth
            id='time'
            label='time'
            margin='normal'
            name='time'
          />
          <RHFInput<Form>
            autoComplete='timeZone'
            fullWidth
            id='timeZone'
            label='timeZone'
            margin='normal'
            name='timeZone'
          />
          <RHFInput<Form>
            autoComplete='duration'
            fullWidth
            id='duration'
            label='duration'
            margin='normal'
            name='duration'
          />
          <RHFInput<Form>
            autoComplete='location'
            fullWidth
            id='location'
            label='location'
            margin='normal'
            name='location'
          />
          <RHFInput<Form>
            autoComplete='dressCode'
            fullWidth
            id='dressCode'
            label='dressCode'
            margin='normal'
            name='dressCode'
          />
          <RHFInput<Form>
            autoComplete='giftList'
            fullWidth
            id='giftList'
            label='giftList'
            margin='normal'
            name='giftList'
          />

          <Button
            fullWidth
            sx={{ mt: 3, mb: 2 }}
            type='submit'
            variant='contained'>
            create event
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
