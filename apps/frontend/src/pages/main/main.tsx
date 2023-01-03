import { fetcher } from '@/lib/fetcher';
import { Box, Button } from 'events-components';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

export const MainPage = () => {
  const { register, handleSubmit } = useForm();

  const { mutate, isLoading } = useMutation(
    (data: any) => {
      return fetcher.post(`/auth/login`, data).then((res) => res.data);
    },
    {
      onSuccess: (data) => {
        localStorage.setItem('token', data.token);
      },
    }
  );

  return (
    <Box>
      <form onSubmit={handleSubmit(mutate)}>
        <input {...register('email')} />
        <input {...register('password')} />
        <Button type="submit" />
      </form>
    </Box>
  );
};
