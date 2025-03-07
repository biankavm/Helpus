import { useState, createContext, useEffect } from 'react';

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  function signIn(email, password) {
    console.log(email, password);
    alert('Logado com sucesso!');
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user, // converte o objeto user para booleano
        user,
        signIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
