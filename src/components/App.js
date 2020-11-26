import React, { useState, useEffect } from "react";
import { Route, Switch } from 'react-router-dom';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmPopup from "./ConfirmPopup";
import { api } from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {
  // Переменная состояния для загрузки (показываем/убираем спиннер)
  const [isLoading, setLoadingState] = useState(true);

  const [wasResponse, setResponseState] = useState(false);

  // Используем хуки состояния для открытия/закрытия попапов
  const [isEditProfilePopupOpen, setEditProfilePopupState] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupState] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupState] = useState(false);
  const [isImagePopupOpen, setImagePopupState] = useState(false);
  const [isConfirmPopupOpen, setConfirmPopupState] = useState(false);

  const handleEditAvatarClick = () => {
    setEditAvatarPopupState(true);
  };

  const handleEditProfileClick = () => {
    setEditProfilePopupState(true);
  };

  const handleAddPlaceClick = () => {
    setAddPlacePopupState(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setImagePopupState(true);
  };

  const closeAllPopups = () => {
    setEditAvatarPopupState(false);
    setEditProfilePopupState(false);
    setAddPlacePopupState(false);
    setImagePopupState(false);
    setConfirmPopupState(false);
  };

  // Стейт-переменные для текущего состояния страницы
  const [selectedCard, setSelectedCard] = useState({});

  const [currentUser, setCurrentUser] = useState({
    name: "",
    about: "",
    avatar: "",
  });

  const [cards, setCards] = useState([]);

  // Обработчики для попапов
  const handleUpdateUser = (userData) => {
    api.saveUserData(userData)
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => {
        alert(err);
      })
      .finally(() => {
        closeAllPopups();
      });
  };

  const handleUpdateAvatar = (data) => {
    api.saveUserAvatar(data)
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => {
        alert(err);
      })
      .finally(() => {
        closeAllPopups();
      });
  };

  const handleAddPlace = (newCard) => {
    api.saveNewItem(newCard)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .catch((err) => {
        alert(err);
      })
      .finally(() => {
        closeAllPopups();
      });
  };

  // Обработчики для карточек
  const handleCardLike = (isLiked, card) => {
    const handleLikeClick = isLiked
      ? api.unlikeItem.bind(api)
      : api.likeItem.bind(api);
    handleLikeClick(card._id, !isLiked)
      .then((newCard) => {
        const newCards = cards.map((cardItem) =>
          cardItem._id === card._id ? newCard : cardItem
        );
        setCards(newCards);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const handleCardDelete = (card) => {
    setSelectedCard(card);
    setConfirmPopupState(true);
  };
  
  const handleConfirmDelete = (card) => {
    api.deleteItem(card._id)
    .then(() => {
      const newCards = cards.filter((cardItem) => cardItem._id !== card._id);
      setCards(newCards);
    }).catch((err) => {
      alert(err);
    }).finally(() => {
      closeAllPopups();
    });    
  }

  useEffect(() => {
    Promise.all([api.getUserData(), api.getData()])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData);
        setCards(cardsData);
        setResponseState(true);
      })
      .catch((err) => {
        alert(err);
      })
      .finally(() => {
        setLoadingState(false);
      });
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Header />
          {/* Пробрасываем обработчики клика */}
          {isLoading ? (
            <div className="spinner spinner_visible" />
          ) : (
            <div className={`content ${!wasResponse && "content_hidden"}`}>
              <Switch>
                <Route exact path="/">
                  <Main
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    onEditProfile={handleEditProfileClick}
                    onCardClick={handleCardClick}
                    cards={cards}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                  />
                </Route>
              </Switch>
            </div>
          )}
          <Footer />
        </div>
        {isEditProfilePopupOpen && (
          <EditProfilePopup
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
        )}
        {isEditAvatarPopupOpen && (
          <EditAvatarPopup
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
        )}
        {isAddPlacePopupOpen && (
          <AddPlacePopup
            onClose={closeAllPopups}
            onAddPlace={handleAddPlace} />
        )}
        {isImagePopupOpen && (
          <ImagePopup
            place={selectedCard}
            onClose={closeAllPopups} />
        )}
        {isConfirmPopupOpen && (
          <ConfirmPopup
            deletedCard={selectedCard}
            onClose={ closeAllPopups }
            onConfirmDelete={handleConfirmDelete}/>
        )}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
