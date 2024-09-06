import { GraphQLFormData } from '@/models/GraphQLFormData';
import { useEffect, useState } from 'react';
import { UseFormSetValue, UseFormWatch } from 'react-hook-form';

interface UseSDLAsURLProps {
  watch: UseFormWatch<GraphQLFormData>;
  setValue: UseFormSetValue<GraphQLFormData>;
}

export const useSDLAsURL = ({ watch, setValue }: UseSDLAsURLProps) => {
  const [isSDLAsURL, setIsSDLAsURL] = useState(true);

  const URLValue = watch('url') || '';
  const SDLValue = watch('sdl');

  const handleSDLChange = () => {
    setIsSDLAsURL(!isSDLAsURL);
  };

  useEffect(() => {
    if (isSDLAsURL) {
      setValue('sdl', `${URLValue}?sdl`);
    }
  }, [URLValue, isSDLAsURL, setValue]);

  return { handleSDLChange, isSDLAsURL, URLValue, SDLValue };
};
