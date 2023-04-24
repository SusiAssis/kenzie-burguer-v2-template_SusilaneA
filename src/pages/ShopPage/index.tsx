import { StyledShopPage } from "./style";
import CartModal from "../../components/CartModal";
import Header from "../../components/Header";
import ProductList from "../../components/ProductList";

import { StyledContainer } from "../../styles/grid";
import { useState } from "react";

const ShopPage = () => {
  const [openModal, setOpenModal] = useState(false);

  const ModalOpen = () => {
    {
      openModal === false ? setOpenModal(true) : setOpenModal(false);
    }
  };

  return (
    <StyledShopPage>
      {openModal ? <CartModal ModalOpen={ModalOpen} /> : null}
      <Header ModalOpen={ModalOpen} />
      <main>
        <StyledContainer containerWidth={1300}>
          <ProductList />
        </StyledContainer>
      </main>
    </StyledShopPage>
  );
};

export default ShopPage;
