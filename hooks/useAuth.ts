import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

export const useAuth = () => {
  const [userId, setUserId] = useState<string | null>(null);

  const getUserId = async () => {
    const userId = await SecureStore.getItemAsync("user_id");
    setUserId(userId);
  };

  useEffect(() => {
    getUserId();
  }, []);

  return { userId };
};
