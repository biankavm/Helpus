import { useState, createContext, useEffect } from 'react'
import { auth, db } from 'services/firebase-connection'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const AuthContext = createContext({})

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loadingAuth, setLoadingAuth] = useState(false)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    ;(async () => {
      const storageUser = localStorage.getItem('@ticketsPRO')
      if (storageUser) {
        setUser(JSON.parse(storageUser))
      }
      setLoading(false)
    })()
  }, [])

  async function signIn(email, password) {
    setLoadingAuth(true)
    signInWithEmailAndPassword(auth, email, password)
      .then(async (value) => {
        let uid = value.user.uid

        const docRef = doc(db, 'users', uid) // acessar o uid do usuário que acabou de logar

        const docSnap = await getDoc(docRef) // agora queremos pegar os dados desse usuário

        let data = {
          uid: uid,
          name: docSnap.data().name,
          email: docSnap.data().email,
          avatarUrl: docSnap.data().avatarUrl
        }

        setUser(data)
        storageUser(data)
        setLoadingAuth(false)
        toast.success('Bem-vindo(a) de volta!')
        navigate('/dashboard')
      })
      .catch((error) => {
        console.log(error)
        toast.error('Ops! Algo deu errado!')
        setLoadingAuth(false)
      })
  }

  async function signUp(name, email, password) {
    setLoadingAuth(true)

    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (value) => {
        let uid = value.user.uid

        await setDoc(doc(db, 'users', uid), {
          name: name,
          avatarUrl: null
        }).then(() => {
          let data = {
            uid: uid,
            name: name,
            email: value.user.email,
            avatarUrl: null
          }
          setUser(data)
          storageUser(data)
          setLoadingAuth(false)
          toast.success('Conta criada com sucesso!')
          navigate('/dashboard')
        })
      })
      .catch((error) => {
        console.log(error)
        toast.error('Ops! Algo deu errado!')
        setLoadingAuth(false)
      })
  }

  function storageUser(data) {
    localStorage.setItem('@ticketsPRO', JSON.stringify(data))
  }

  async function logout() {
    await signOut(auth)
    localStorage.removeItem('@ticketsPRO')
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user, // converte o objeto user para booleano
        user,
        signIn,
        signUp,
        logout,
        loading,
        loadingAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
