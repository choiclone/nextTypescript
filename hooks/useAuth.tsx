import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    User,
} from 'firebase/auth'

import { useRouter } from 'next/router'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { auth } from '../firebase'

interface IAuth {
    user: User | null;
    signUp: (email: string, password: string) => Promise<void>;
    signIn: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    error: string | null;
    loading: boolean;
};

const AuthContext = createContext<IAuth>({
    user: null,
    signUp: async () => { },
    signIn: async () => { },
    logout: async () => { },
    error: null,
    loading: false
});

interface AuthProviderProps {
    children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const router = useRouter(); // replace(Url1, Url2) Url1로 이동 후 Url2로 주소만 변경함.
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState(null);
    const [initialLoading, setInitialLoding] = useState(true);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if(user){
                setUser(user);
                setLoading(false);
            }else{
                setUser(null);
                setLoading(true);
                router.push('/login');
            }
            setInitialLoding(false);
        })
    }, [auth]);

    const signUp = async (email: string, password: string) => {
        setLoading(true);
        await createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
            setUser(userCredential.user);
            router.push("/");
            setLoading(false);
        })
        .catch((error) => setError(error.message))
        .finally(() => setLoading(false))
    }

    const signIn = async (email: string, password: string) => {
        setLoading(true);
        await signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
            setUser(userCredential.user)
            router.push("/");
            setLoading(false);
        })
            .catch((error) => setError(error.message))
            .finally(() => setLoading(false))
    }

    const logout = async () => {
        setLoading(true);
        signOut(auth).then(() => {
            setUser(null)
        }).catch((error) => setError(error.message))
            .finally(() => setLoading(false))
    }

    const memoedValue = useMemo(() => ({
        user, signUp, signIn, loading, logout, error
    }), [user, loading]); // 사용자 정보와 로딩 상태가 바뀔 때마다 수행한다고 생각하셈.

    return (
        <AuthContext.Provider
            value={memoedValue}
        > {/* CreateContext로 제작된 context에 useMemo로 선언한 값을  */}
            {!initialLoading && children}
        </AuthContext.Provider> 
    )
}

export default function useAuth() {
    return useContext(AuthContext);
}