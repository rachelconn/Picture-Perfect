import { createContext } from 'react';

interface NavigationContextType {
  imageURI: string,
  setImageURI: (imageURI: string) => any,
};

const NavigationContext = createContext<NavigationContextType>({
  imageURI: '',
  setImageURI: (imageURI) => {},
});

export default NavigationContext;
