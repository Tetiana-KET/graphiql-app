import { GraphQLFormData } from '@/views/someInterface';
import { useState } from 'react';
import { UseFormSetValue, UseFormWatch } from 'react-hook-form';

interface UseSdlAsUrl {
  watch: UseFormWatch<GraphQLFormData>;
  setValue: UseFormSetValue<GraphQLFormData>;
}

export const useSdlAsUrl = ({ watch, setValue }: UseSdlAsUrl) => {
  const [isSameSDL, setIsSameSDL] = useState(true);

  const URLValue = watch('URL') || '';
  const SDLValue = watch('SDL');

  const handleSDLChange = () => {
    setIsSameSDL(!isSameSDL);
    if (!isSameSDL) {
      setValue('SDL', '');
    } else {
      setValue('SDL', `${URLValue}?sdl`);
    }
  };
  return { handleSDLChange, isSameSDL, URLValue, SDLValue };
};
