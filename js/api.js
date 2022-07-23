const GET_LINK = 'https://26.javascript.pages.academy/kekstagram/data';
const SEND_LINK = 'https://26.javascript.pages.academy/kekstagram';

const getData = (onSuccess, onFail) => {
  fetch(GET_LINK)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((pictures) => {
      onSuccess(pictures);
    })
    .catch(() => {
      onFail('Не удалось загрузить изображения');
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(SEND_LINK, {
    method: 'POST',
    body,
  })
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

export {getData, sendData};
