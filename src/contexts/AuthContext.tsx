import { createContext, ReactNode, useEffect, useState } from "react";

import { getAuth, signInWithPopup,GoogleAuthProvider } from "firebase/auth";

type User = {
  id: string;
  name: string;
  avatar: string;
}

type AuthContextType = {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>;
}

type AuthContextProviderType = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthContextProvider(props: AuthContextProviderType) {
  const [ user, setUser] = useState<User>();
  const auth = getAuth();
  
  //recebe dois parametros, a funcao que sera executada e o segundo quando
  // a funcao sera executada e sera sempre um array
  // caso quisesse que a funcao dispare sempre que o user mudar -> [user]
  // caso queira que essa funcao dispare uma vez, assim que o app for mostrado,
  //pode se deixar o array vazio
  useEffect(() => {
   const unsubscribe = auth.onAuthStateChanged ( user => {
      if (user) {
        const { displayName, photoURL, uid } = user
  
        if (!displayName || !photoURL) {
          throw new Error('Missing information from Google Account')
        }
  
        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL,
        })
      }
    })

    return () => {
      unsubscribe();
    }
  }, [])

  // é possivel fazer uma funcao async e assim substituir o formato atual (.then(result))
  //function signInWithGoogle () {}
  async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    const result = await signInWithPopup(auth, provider) //.then(result =>)

    if (result.user) {
      const { displayName, photoURL, uid } = result.user

      if (!displayName || !photoURL) {
        throw new Error('Missing information from Google Account')
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL
      })
    }
  }
  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      {props.children}
    </AuthContext.Provider>
  )
}