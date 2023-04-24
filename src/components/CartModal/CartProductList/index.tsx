import CartProductCard from "./CartProductCard";

import { StyledCartProductList } from "./style";
import { StyledButton } from "../../../styles/button";
import { StyledParagraph } from "../../../styles/typography";
import { useContext } from "react";
import { CartContext, IProducts } from "../../../providers/CartContext";

const CartProductList = () => {
  const { productsCart, removeProductToCart, setProductsCart } =
    useContext(CartContext);

  const amount = productsCart.reduce((previousValeu, currentValue) => {
    return previousValeu + Number(currentValue.price);
  }, 0);

  console.log(productsCart);
  return (
    <StyledCartProductList>
      <ul>
        {productsCart.map((product: IProducts) => {
          return (
            <CartProductCard
              key={product.id}
              product={product}
              removeProductToCart={removeProductToCart}
            />
          );
        })}
      </ul>

      <div className="totalBox">
        <StyledParagraph>
          <strong>Total</strong>
        </StyledParagraph>
        <StyledParagraph className="total">
          R$ {amount.toFixed(2)}
        </StyledParagraph>
      </div>
      <StyledButton
        $buttonSize="default"
        $buttonStyle="gray"
        onClick={() => setProductsCart([])}
      >
        Remover todos
      </StyledButton>
    </StyledCartProductList>
  );
};

export default CartProductList;
