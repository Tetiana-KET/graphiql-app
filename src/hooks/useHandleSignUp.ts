import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TFunction } from 'i18next';
import { createSignUpSchema } from '@/validation/signUpSchema';
import { registerWithEmailAndPassword } from '@/firebase';
import { SignUpFormInputs } from '@/models/AuthInterfaces';

export function useHandleSignUp(t: TFunction<'translation', undefined>) {
  const signUpSchema = createSignUpSchema(t);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignUpFormInputs>({
    resolver: zodResolver(signUpSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: {
    email: string;
    password: string;
    name: string;
  }) => {
    try {
      registerWithEmailAndPassword(data.name, data.email, data.password);
    } catch (err) {
      console.error(err);
    }
  };

  return { register, handleSubmit, onSubmit, errors, isValid };
}
