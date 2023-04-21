import { MdDelete } from "react-icons/md";

import { StyledCartProductCard } from "./style";
import { StyledTitle } from "../../../../styles/typography";

const CartProductCard = ({ product, removeProductToCart }) => (
  <StyledCartProductCard>
    <div className="imageBox">
      <img src={product.img} alt={product.name} />
    </div>
    <div className="contentBox">
      <StyledTitle tag="h3" $fontSize="three">
        {product.name}
      </StyledTitle>
      <button
        type="button"
        aria-label="Remover"
        onClick={() => removeProductToCart(product.id)}
      >
        <MdDelete size={24} />
      </button>
    </div>
  </StyledCartProductCard>
);

export default CartProductCard;
