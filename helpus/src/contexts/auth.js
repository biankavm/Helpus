import { useState, createContext, useEffect } from 'react';
import { auth, db } from 'services/firebase-connection';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(false);

  function signIn(email, password) {
    console.log(email, password);
    alert('Logado com sucesso!');
  }

  const navigate = useNavigate();

  async function signUp(name, email, password) {
    setLoadingAuth(true);

    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (value) => {
        let uid = value.user.uid;

        await setDoc(doc(db, 'users', uid), {
          name: name,
          avatarUrl: null,
        }).then(() => {
          let data = {
            uid: uid,
            name: name,
            email: value.user.email,
            avatarUrl: null,
          };
          setUser(data);
          storageUser(data);
          setLoadingAuth(false);
          toast.success('Conta criada com sucesso!');
          navigate('/dashboard');
        });
      })
      .catch((error) => {
        console.log(error);
        alert('Ops! Algo deu errado!');
        setLoadingAuth(false);
      });
  }

  function storageUser(data) {
    localStorage.setItem('@ticketsPRO', JSON.stringify(data));
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user, // converte o objeto user para booleano
        user,
        signIn,
        signUp,
        loadingAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
