import { GraphQLFormData } from '@/views/someInterface';
import { useState } from 'react';
import { UseFormSetValue, UseFormWatch } from 'react-hook-form';

interface UseSDLAsURLProps {
  watch: UseFormWatch<GraphQLFormData>;
  setValue: UseFormSetValue<GraphQLFormData>;
}

export const useSDLAsURL = ({ watch, setValue }: UseSDLAsURLProps) => {
  const [isSDLAsURL, setIsSameSDL] = useState(true);

  const URLValue = watch('URL') || '';
  const SDLValue = watch('SDL');

  const handleSDLChange = () => {
    setIsSameSDL(!isSDLAsURL);
    if (!isSDLAsURL) {
      setValue('SDL', '');
    } else {
      setValue('SDL', `${URLValue}?sdl`);
    }
  };
  return { handleSDLChange, isSDLAsURL, URLValue, SDLValue };
};
