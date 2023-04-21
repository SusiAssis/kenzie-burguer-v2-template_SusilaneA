import { ReactNode, createContext, useEffect, useState } from "react";
import { api } from "../services/api";
import { toast } from "react-toastify";
import { IRegisterFormData } from "../components/Form/RegisterForm";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext({});

export const UserProvider = ({ children }: ReactNode) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleLogin = async (data: IRegisterFormData) => {
    try {
      const response = await api.post("/login", data);

      localStorage.setItem("@TOKEN", JSON.stringify(response.data.accessToken));

      localStorage.setItem("@USERID", JSON.stringify(response.data.user.id));

      setUser(response.data.user);
      toast.success("Login realizado com sucesso!");
      navigate("/shop");
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleRegister = async (data: IRegisterFormData) => {
    try {
      const response = await api.post("/users", data);
      toast.success("Conta criada com sucesso!");
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  // const logout = () => {
  //   localStorage.clear()
  //   return navigate('/')
  // }

  return (
    <UserContext.Provider value={{ handleRegister, handleLogin }}>
      {children}
    </UserContext.Provider>
  );
};
