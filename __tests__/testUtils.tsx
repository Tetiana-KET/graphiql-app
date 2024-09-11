import { render } from '@testing-library/react';
import { AuthContext, AuthContextValue } from '@/components/AuthProvider';

interface RenderWithAuthProps {
  children: React.ReactNode;
  authContextValue: AuthContextValue;
}

export const renderWithAuth = ({
  children,
  authContextValue,
}: RenderWithAuthProps) => {
  return render(
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>,
  );
};
