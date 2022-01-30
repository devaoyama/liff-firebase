import { Liff } from "@line/liff";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  getAuth,
  onAuthStateChanged,
  signInWithCustomToken,
  signOut,
  User,
} from "firebase/auth";
import { getFunctions, httpsCallable } from "firebase/functions";

type Args = {
  liff: Liff | null;
};

export const useAuth = ({ liff }: Args) => {
  const [authUser, setAuthUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    onAuthStateChanged(getAuth(), (user) => {
      setAuthUser(user);
    });
  }, []);

  useEffect(() => {
    if (!liff || authUser) return;
    const idToken = liff.getIDToken();
    if (!liff.isLoggedIn() || !idToken) {
      setAuthUser(null);
      return;
    }
    const verify = httpsCallable(getFunctions(), "verify");
    verify({ idToken })
      .then((result: any) => {
        signInWithCustomToken(getAuth(), result.data.token);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [liff]);

  const isLoading = useMemo(() => {
    return authUser === undefined;
  }, [authUser]);

  const isLoggedIn = useMemo(() => {
    return !!authUser;
  }, [authUser]);

  const logout = useCallback(() => {
    if (!liff) return;
    liff.logout();
    signOut(getAuth());
  }, [liff]);

  return {
    authUser,
    isLoading,
    isLoggedIn,
    logout,
  };
};
