import React, { useEffect, useState } from 'react';
import HeaderComponentMenu from '../../Components/HeaderComponents/HeaderComponents';
import {
  PortfolioContent,
  PortfolioImage,
  PortfolioText,
  PortfolioTextBottom,
  ManualTransactionContainer,
  IconContainer,
  MainContent,
  Title,
  Description,
  ModalContent,
  CloseButton, customStyles
} from './portfolioStyle';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import prtnoImage from './img/prtno.png'; // Импортируем изображение
import Modal from 'react-modal';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';
import '../Settings/AccountSecurity/nprogress-custom.css'; 

function Portfolio() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('Authorization');
    if (token) {
      setIsAuthenticated(true);
    } else {
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    if (isAuthenticated) {
      nprogress.done();
    } else {
      nprogress.start();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return null;
  }
  const handleNavLinkClick = (page) => {
    navigate('/');
  };

  const handleManualTransactionClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  const handleLogout = () => {
    Cookies.remove('Authorization');
    setIsAuthenticated(false);
    navigate('/'); // Redirect to the main page
  };

  return (
    <div>
      <HeaderComponentMenu
        isAuthenticated={isAuthenticated}
        handleNavLinkClick={handleNavLinkClick}
        handleLogout={handleLogout} // Добавляем handleLogout
      />
      <PortfolioContent>
        <PortfolioImage src={prtnoImage} alt="Portfolio" />
        <PortfolioText>Let’s get started with your first portfolio!</PortfolioText>
        <PortfolioTextBottom>Track profits, losses and valuation all in one place.</PortfolioTextBottom>
        <ManualTransactionContainer onClick={handleManualTransactionClick}>
          <IconContainer>
            <img src="https://s2.coinmarketcap.com/static/cloud/img/portfolio/manual.svg?_=a9a383f" alt="Manual Transaction Icon" />
          </IconContainer>
          <MainContent>
            <Title>Add Transactions Manually</Title>
            <Description>Enter all transaction details at your own pace to track your portfolio.</Description>
          </MainContent>
        </ManualTransactionContainer>
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          style={customStyles}
        >
          <ModalContent>
            <CloseButton onClick={closeModal}>&times;</CloseButton>
          </ModalContent>
        </Modal>
      </PortfolioContent>
    </div>
  );
}

export default Portfolio;
