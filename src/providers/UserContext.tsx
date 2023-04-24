import { ReactNode, createContext, useEffect, useState } from "react";
import { api } from "../services/api";
import { toast } from "react-toastify";
import { IRegisterFormData } from "../components/Form/RegisterForm";
import { useNavigate } from "react-router-dom";
import { ILoginFormData } from "../components/Form/LoginForm";

interface IUserProviderProps {
  children: React.ReactNode;
}

interface IUserContext {
  handleLogin: (
    data: ILoginFormData,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => Promise<void>;
  handleRegister: (
    data: IRegisterFormData,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => Promise<void>;
  logout: () => void;
  user: null | IUser;
}

interface IUser {
  id: string;
  name: string;
  email: string;
}

interface IUserLoginResponse {
  accessToken: string;
  user: IUser;
}

interface IUserRegisterResponse {
  accessToken: string;
  user: IUser;
}

export const UserContext = createContext({} as IUserContext);

export const UserProvider = ({ children }: IUserProviderProps) => {
  const [user, setUser] = useState<IUser | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("@TOKEN");
    const userId = localStorage.getItem("@USERID");

    const userAutoLogin = async () => {
      try {
        const response = await api.get(`/users/${JSON.parse(userId)}`, {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        });
        setUser(response.data);
        navigate("/shop");
      } catch (error) {
        console.log(error);
        localStorage.removeItem("@TOKEN");
        localStorage.removeItem("@USERID");
      }
    };

    if (token && userId) {
      userAutoLogin();
    }
  }, []);

  const handleLogin = async (
    data: ILoginFormData,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    try {
      setLoading(true);
      const response = await api.post<IUserLoginResponse>("/login", data);

      localStorage.setItem("@TOKEN", JSON.stringify(response.data.accessToken));

      localStorage.setItem("@USERID", JSON.stringify(response.data.user.id));

      setUser(response.data.user);
      toast.success("Login realizado com sucesso!");
      navigate("/shop");
      setLoading(false);
    } catch (error) {
      toast.error("Não foi possível encontrar o usuário");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (
    data: IRegisterFormData,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    try {
      setLoading(true);
      const response = await api.post<IUserRegisterResponse>("/users", data);
      toast.success("Conta criada com sucesso!");
      navigate("/");
    } catch (error) {
      toast.error("Algo deu errado, por favor revisar os dados");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
    return navigate("/");
  };

  return (
    <UserContext.Provider value={{ handleRegister, handleLogin, logout, user }}>
      {children}
    </UserContext.Provider>
  );
};
