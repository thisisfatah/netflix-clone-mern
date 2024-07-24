import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  isSignUp: false,
  isCheckingAuth: true,
  isLoggingOut: false,
  isLoggingIn: false,
  signup: async (credentials) => {
    set({ isSignUp: true });
    try {
      const response = await axios.post("/api/v1/auth/signup", credentials);
      set({ user: response.data.user, isSignUp: false });
      toast.success("Account created successfully");
    } catch (error) {
      toast.error(error.response.data.msg || "Signup failed");
      set({ isSignUp: false, user: null });
    }
  },
  login: async (credentials) => {
    set({ isLoggingIn: true });
    try {
      const response = await axios.get(
        "https://netflix-clone-api-six.vercel.app/api/v1/auth/getuser",
        credentials
      );
      set({ user: response.data.user, isLoggingIn: false });
      toast.success("Logged in successfully");
    } catch (error) {
      set({ user: null, isLoggingIn: false });
      toast.error(error.response.data.msg || "Login failed");
    }
  },
  logout: async () => {
    set({ isLoggingOut: true });
    try {
      await axios.post("/api/v1/auth/logout");
      set({ user: null, isLoggingOut: false });
      toast.success("Logged out successfully");
    } catch (error) {
      set({ isLoggingOut: true });
      toast.error(error.response.data.msg || "Logout failed");
    }
  },
  authCheck: async () => {
    set({ isCheckingAuth: true });
    try {
      const response = await axios.get("/api/v1/auth/authcheck");
      set({ user: response.data.user, isCheckingAuth: false });
    } catch (error) {
      set({ isCheckingAuth: false, user: null });
      // toast.error(error.response.data.msg || "An error occurred");
    }
  },
}));
