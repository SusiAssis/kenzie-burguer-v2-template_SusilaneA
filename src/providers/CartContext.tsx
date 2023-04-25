import { createContext, useEffect, useState } from "react";
import { api } from "../services/api";
import { toast } from "react-toastify";

interface ICartProviderProps {
  children: React.ReactNode;
}

interface ICartContext {
  products: IProducts[];
  addProductToCart: (productCart: IProducts) => void;
  productsCart: IProducts[];
  setProductsCart: React.Dispatch<React.SetStateAction<IProducts[]>>;
  removeProductToCart: (productId: number) => void;
}

export interface IProducts {
  category: string;
  id: number;
  img: string;
  name: string;
  price: number;
}

export const CartContext = createContext({} as ICartContext);

export const CartProvider = ({ children }: ICartProviderProps) => {
  const [products, setProducts] = useState<IProducts[]>([]);
  const [productsCart, setProductsCart] = useState<IProducts[]>([]);
  const [filter, setFilter] = useState("");
  let token: string = localStorage.getItem("@TOKEN") || "";

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await api.get<IProducts[]>(`/products`, {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        });

        setProducts(response.data);
      } catch (error) {}
    };
    getProducts();
  }, []);

  const Search = () => {
    const newListFilter = products.filter(
      (product) =>
        product.category
          .toLowerCase()
          .trim()
          .includes(filter.trim().toLowerCase()) ||
        product.name.toLowerCase().trim().includes(filter.trim().toLowerCase())
    );
  };

  const addProductToCart = (productCart: IProducts) => {
    if (
      !productsCart.some((product: IProducts) => product.id === productCart.id)
    ) {
      const newListCart = [...productsCart, productCart];
      setProductsCart(newListCart);
      toast.success("Produto adicionado!");
    } else {
      toast.error("Este item já está adicionado");
    }
  };

  const removeProductToCart = (productId: number) => {
    const newListCart = productsCart.filter(
      (product) => product.id !== productId
    );
    setProductsCart(newListCart);
  };

  return (
    <CartContext.Provider
      value={{
        products,
        addProductToCart,
        productsCart,
        setProductsCart,
        removeProductToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
