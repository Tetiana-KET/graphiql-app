import { GraphQLFormData } from '@/models/FormInterfaces';
import { useEffect, useState } from 'react';
import { UseFormSetValue, UseFormWatch } from 'react-hook-form';

interface UseSDLAsURLProps {
  watch: UseFormWatch<GraphQLFormData>;
  setValue: UseFormSetValue<GraphQLFormData>;
}

export const useSDLAsURL = ({ watch, setValue }: UseSDLAsURLProps) => {
  const [isSDLAsURL, setIsSDLAsURL] = useState(true);

  const URLValue = watch('URL') || '';
  const SDLValue = watch('SDL');

  const handleSDLChange = () => {
    setIsSDLAsURL(!isSDLAsURL);
  };

  useEffect(() => {
    if (isSDLAsURL) {
      setValue('SDL', `${URLValue}?sdl`);
    }
  }, [URLValue, isSDLAsURL, setValue]);

  return { handleSDLChange, isSDLAsURL, URLValue, SDLValue };
};
