import {createPictures} from './picture.js';
import  {setUserFormSubmit, closeModal} from './user-form.js';
import {getData} from './api.js';
import {showAlert} from './util.js';
import './big-picture.js';
import './scale-image.js';
import './filter-image.js';

getData(createPictures, showAlert);

setUserFormSubmit(closeModal);
