import React, { useState, useEffect } from "react";
import { Route, Switch, useHistory } from 'react-router-dom';
import cn from 'classnames';
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { api } from "../utils/api";
import Header from "./Header";
import Main from "./Main";
import Login from "./Login";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmPopup from "./ConfirmPopup";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import ResponseError from "./ResponseError";
import { auth } from "../utils/auth";

function App() {
  // Логика загрузки (показываем/убираем спиннер, отрисовываем ошибку при необходимости)
  const [isLoading, setLoadingState] = useState(true);

  const [wasResponse, setResponseState] = useState(false);

  const [responseError, setResponseError] = useState({
    status: '',
    statusText: ''
  });

  let contentClassName = cn('content', {'content_hidden': !wasResponse});
  let responseErrorClassName = cn('response-error', {'response-error_hidden': wasResponse});

  // Загрузка пользовательских данных с сервера
  useEffect(() => {
    Promise.all([api.getUserData(), api.getData()])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData);
        setCards(cardsData);
        setResponseState(true);
      })
      .catch((err) => {
        setResponseError({
          status: err.status,
          statusText: err.statusText
        });
      })
      .finally(() => {
        setLoadingState(false);
      });
  }, []);

  // Авторизация пользователя
  const history = useHistory();

  const [loggedIn, setLoggedIn] = useState(false);

  const [userData, setUserData] = useState({
    email: ''
  });

  // При загрузке страницы сразу проверяем, авторизован ли пользователь
  useEffect(() => {
    tokenCheck();
  }, []);

  const tokenCheck = () => {
    const token = localStorage.getItem('token');
    if (token) {
      auth.getContent(token)
        .then((res) => {
          if (res.data) {
            setUserData({email: res.data.email});
            setLoggedIn(true);
          }
        })
        .catch((err) => {
          // Здесь ошибку пользователю не выводим, потому что в редких случаях она ему что-то даст.
          // Тот, кому это необходимо, найдёт её в консоли.
          // Вывод ошибки здесь выглядит странно, потому что пользователь даже не поймёт, в чём дело
          // -- зашёл на чсайт, ещё ничего не сделал, а уже ошибка.
          console.error(err);
        })
    }
  }

  // Стейт-переменная для определения контента тултипа
  const [isSuccess, setSuccess] = useState(true);
  const [tooltipMessage, setTooltipMessage] = useState();

  const handleRegister = ({ email, password }) => {
    console.log(email, password)
    auth.register({ email, password })
      .then((data) => {
        if (data.email) {
          setSuccess(true);
          setInfoTooltipState(true);
          history.push('/sign-in');
        }
      })
      .catch((err) => {
        setSuccess(false);
        if (err.status === 400) {
          setTooltipMessage('Некорректно заполнено одно из полей.')
        }
        setInfoTooltipState(true);
        history.push('/sign-up');
      })
      .finally(() => setTooltipMessage(''))
  }

  const handleLogin = ({ email, password }) => {
    auth.login({ email, password })
      .then((data) => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          setLoggedIn(true);
          history.push('/');
        }
      })
      .catch((err) => {
        setSuccess(false);
        if (err.status === 401) {
          setTooltipMessage('Некорректно введён email или пароль.')
        } else if (err.status === 400) {
          setTooltipMessage('Не передано одно из полей.')
        }
        setInfoTooltipState(true);
        history.push('/sign-in');
      })
      .finally(() => setTooltipMessage(''))
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUserData({email: ''});
    setLoggedIn(false);
  }

  // Логика открытия/закрытия попапов
  const [isEditProfilePopupOpen, setEditProfilePopupState] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupState] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupState] = useState(false);
  const [isImagePopupOpen, setImagePopupState] = useState(false);
  const [isConfirmPopupOpen, setConfirmPopupState] = useState(false);
  const [isInfoTooltipOpen, setInfoTooltipState] = useState(false);

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
    setInfoTooltipState(false);
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
          <Header userData={userData} onLogout={handleLogout} />
          {isLoading ? (
            <div className="spinner spinner_visible" />
          ) : (
            <>
              <div className={contentClassName}>
                <Switch>
                  <Route path="/sign-in">
                    <Login onLogin={handleLogin} tokenCheck={tokenCheck} />
                  </Route>
                  <Route path="/sign-up">
                    <Register onRegister={handleRegister}/>
                  </Route>
                  <ProtectedRoute 
                    exact={true}
                    path="/"
                    component={WrappedMain}
                    loggedIn={loggedIn}
                  />
                </Switch>
              </div>
              <ResponseError
                className={responseErrorClassName}
                responseError={responseError}
              />
            </>
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
            isSuccess={isSuccess}
            message={tooltipMessage}
            onClose={closeAllPopups}
          />
        }
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
