import React, { useState, useEffect } from "react";
import { Route, Switch } from 'react-router-dom';
import Header from "./Header";
import Main from "./Main";
import Login from "./Login";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmPopup from "./ConfirmPopup";
import { api } from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";

function App() {
  // Переменная состояния для загрузки (показываем/убираем спиннер)
  const [isLoading, setLoadingState] = useState(true);

  const [wasResponse, setResponseState] = useState(false);

  // Переменная состояния авторизованности пользователя
  const [loggedIn, setLoggedIn] = useState(true);

  // Используем хуки состояния для открытия/закрытия попапов
  const [isEditProfilePopupOpen, setEditProfilePopupState] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupState] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupState] = useState(false);
  const [isImagePopupOpen, setImagePopupState] = useState(false);
  const [isConfirmPopupOpen, setConfirmPopupState] = useState(false);
  const [isInfoTooltipOpen, setIntoTooltipState] = useState(false);

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
    setIntoTooltipState(false);
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

  // Эта обертка для компонента позволяет передавать дополнительные параметры из замыкания.
  // Без неё пропсы не пробрасывались в Main,а массив карточек раскладывался в Object Object
  const WrappedMain = (props) => {
    return (
      <Main
        {...props}
        cards={cards}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onCardClick={handleCardClick}
        onCardLike={handleCardLike}
        onCardDelete={handleCardDelete}
      />
    )
  }

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
                <Route path="/signin">
                  <Login />
                </Route>
                <Route path="/signup">
                  <Register />
                </Route>
                <ProtectedRoute 
                  exact={true}
                  path="/"
                  component={WrappedMain}
                  loggedIn={loggedIn}
                />
              </Switch>
            </div>
          )}
          <Footer loggedIn={loggedIn} />
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
            onClose={closeAllPopups}
            onConfirmDelete={handleConfirmDelete}/>
        )}
        {isInfoTooltipOpen && 
          <InfoTooltip
            onClose={closeAllPopups}
          />
        }
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
