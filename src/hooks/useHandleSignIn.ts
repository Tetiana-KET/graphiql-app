import { logInWithEmailAndPassword } from '@/firebase';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignInFormInputs } from '@/models/AuthInterfaces';
import { createSignInSchema } from '@/validation/signInSchema';
import { TFunction } from 'i18next';
import { checkErrorInstance } from '@/utils/checkErrorInstance';

export function useHandleSignIn(t: TFunction<'translation', undefined>) {
  const signInSchema = createSignInSchema(t);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignInFormInputs>({
    resolver: zodResolver(signInSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      await logInWithEmailAndPassword(data.email, data.password);
    } catch (err) {
      checkErrorInstance(err);
    }
  };

  return { register, handleSubmit, onSubmit, errors, isValid };
}
