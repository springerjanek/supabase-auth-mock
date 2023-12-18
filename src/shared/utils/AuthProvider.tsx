import {
  ReactNode,
  createContext,
  useEffect,
  useState,
} from "react";
import { supabase } from "../../supabase";
import { Session } from "@supabase/gotrue-js/src/lib/types";

const AuthContext = createContext<Session | null>(null);

const fetchSession = async () => {
  const { data } = await supabase.auth.getSession();
  return data.session;
};

export const AuthProvider = ({
  children,
  mockedSession,
}: {
  children: ReactNode;
  mockedSession?: Session | null;
}) => {
  const [sessionState, setSessionState] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeSession = async () => {
      if (mockedSession) {
        setSessionState(mockedSession);
        setLoading(false);
      } else {
        const session = await fetchSession();
        setSessionState(session);
        setLoading(false);

        const {
          data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
          setSessionState(session);
          setLoading(false);
        });

        return () => subscription.unsubscribe();
      }
    };

    initializeSession();
  }, [mockedSession]);

  return (
    <AuthContext.Provider value={sessionState}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
