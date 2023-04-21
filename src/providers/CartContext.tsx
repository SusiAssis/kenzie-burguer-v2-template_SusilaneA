import { createContext, useEffect, useState } from "react";
import { api } from "../services/api";

export const CartContext = createContext({});

export const CartProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [productsCart, setProductsCart] = useState([]);
  const [filter, setFilter] = useState("");
  const token = localStorage.getItem("@TOKEN");

  console.log(products);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await api.get(`/products`, {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        });

        setProducts(response.data);
      } catch (error) {
        console.log(error);
      }
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

    setCategoriesList(newListFilter);
  };

  const addProductToCart = (productCart) => {
    if (!productsCart.some((product) => product.id === productCart.id)) {
      const newListCart = [...productsCart, productCart];
      setProductsCart(newListCart);
      //toast.success("Produto adicionado!")
      console.log("produto adicionado");
    } else {
      //toast.error("Este item já está adicionado")
      console.log("produto já esta adicionado");
    }
  };

  const removeProductToCart = (productId) => {
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
