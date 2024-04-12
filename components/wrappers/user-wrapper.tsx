"use client";
import { useUserStore } from "@/stores/user-store";
import { useEffect } from "react";
import { createClient } from "@/utils/supabase/client";

interface Props {
  children?: React.ReactNode;
}

const UserWrapper: React.FC<Props> = ({ children }) => {
  const supabase = createClient();
  const { setUser } = useUserStore();

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        setUser(session.user);
      }
    };

    fetchUser();
  }, []);

  return <>{children}</>;
};

export default UserWrapper;
