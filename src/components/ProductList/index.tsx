import { useContext } from "react";
import ProductCard from "./ProductCard";
import { StyledProductList } from "./style";
import { CartContext } from "../../providers/CartContext";

const ProductList = () => {
  const { products, addProductToCart } = useContext(CartContext);

  return (
    <StyledProductList>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          addProductToCart={addProductToCart}
        />
      ))}
    </StyledProductList>
  );
};

export default ProductList;
