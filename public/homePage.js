"use strict"

const logoutBtn = new LogoutButton();
logoutBtn.action = () => {
  const callback = (response) => {
    if(response.success) {
      location.reload();
    } 
  }
  ApiConnector.logout(callback);
};

ApiConnector.current((response) => {
  if (response.success) {
    ProfileWidget.showProfile(response.data);
  }
});

const ratesBoard = new RatesBoard;

const updateRatesBoard = () => {
  ApiConnector.getStocks((response) => {
    if (response.success) {
      ratesBoard.clearTable();
      ratesBoard.fillTable(response.data);
    }
  });
};

updateRatesBoard();
setInterval(() => {updateRatesBoard();}, 60000);

const moneyManager = new MoneyManager;

moneyManager.addMoneyCallback = (data) => ApiConnector.addMoney(data, response => {
  if (response.success) {
    ProfileWidget.showProfile(response.data);
    moneyManager.setMessage(response.success, 'Операция успешна');
  } else {
    moneyManager.setMessage(response.success, response.error);
  }
});

moneyManager.conversionMoneyCallback = (data) => ApiConnector.convertMoney(data, response => {
  if (response.success) {
    ProfileWidget.showProfile(response.data);
    moneyManager.setMessage(response.success, 'Операция успешна');
  } else {
    moneyManager.setMessage(response.success, response.error);
  }
});

moneyManager.sendMoneyCallback = (data) => ApiConnector.transferMoney(data, response => {
  if (response.success) {
    ProfileWidget.showProfile(response.data);
    moneyManager.setMessage(response.success, 'Операция успешна');
  } else {
    moneyManager.setMessage(response.success, response.error);
  }
});

const favoritesWidget = new FavoritesWidget;

const getFavoritesWidget = () => {
  ApiConnector.getFavorites((response) => {
    if (response.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data);
      moneyManager.updateUsersList(response.data);
    }
  });
}
getFavoritesWidget();

favoritesWidget.addUserCallback = (user) => ApiConnector.addUserToFavorites(user, response => {
  if (response.success) {
    favoritesWidget.clearTable();
    favoritesWidget.fillTable(response.data);
    moneyManager.updateUsersList(response.data);
    favoritesWidget.setMessage(response.success, 'Операция успешна');
  } else {
    favoritesWidget.setMessage(response.success, response.error);
  }
});

favoritesWidget.removeUserCallback = (user) => ApiConnector.removeUserFromFavorites(user, response => {
  if (response.success) {
    favoritesWidget.clearTable();
    favoritesWidget.fillTable(response.data);
    moneyManager.updateUsersList(response.data);
    favoritesWidget.setMessage(response.success, 'Операция успешна');
  } else {
    favoritesWidget.setMessage(response.success, response.error);
  }
});
