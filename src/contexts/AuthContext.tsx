import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from 'react';
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  User,
} from 'firebase/auth';

// SERVICES
import { auth } from '../services/firebase';

// TYPES
type AuthContextData = {
  loading: boolean;
  user: User | null;
  handleSignOut: () => void;
  handleSocialSignIn: () => void;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (u) => {
      if (u) {
        setUser(u);
      } else {
        setUser(null);
      }
    });
  }, []);

  async function handleSocialSignIn() {
    try {
      setLoading(true);
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);

      setLoading(false);
    } catch (error) {
      // console.error(error);
      setLoading(false);
    }
  }

  async function handleSignOut() {
    try {
      await signOut(auth);
    } catch {
      //
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        handleSignOut,
        handleSocialSignIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
