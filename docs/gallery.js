import galleryItems from './gallery-items.js';

const amountImg = galleryItems.length;
let imgUrls = [];
const galleryEl = document.querySelector('.js-gallery');
const modalWindow = document.querySelector('.js-lightbox');
const modalImg = document.querySelector('.lightbox__image');
const closeLightboxBtn = document.querySelector('.lightbox__button');
const modalOverlay = document.querySelector('.lightbox__overlay');
let urlOfImgClick = '';

for (const element of galleryItems) {
  imgUrls.push(element.original);
}

const cards = galleryItems.map(({ preview, original, description }) => {
  const cardRef = document.createElement('li');
  cardRef.insertAdjacentHTML(
    'afterbegin',
    `<a class="gallery__link" href="${preview}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>`,
  );
  return cardRef;
});

galleryEl.append(...cards);

galleryEl.addEventListener('click', onImgClick);
closeLightboxBtn.addEventListener('click', onModalClose);

modalOverlay.addEventListener('click', onModalOverlyClose);

function onImgClick(evt) {
  evt.preventDefault();

  if (evt.target.nodeName !== 'IMG') {
    return;
  }

  urlOfImgClick = evt.target.getAttribute('data-source');
  let altOfImgClick = evt.target.getAttribute('alt');

  onModalOpen();

  modalImg.setAttribute('src', `${urlOfImgClick}`);
  modalImg.setAttribute('alt', `${altOfImgClick}`);

  document.addEventListener('keydown', onModalLeft);
  document.addEventListener('keydown', onModalCloseEsc);
}

function onModalLeft(evt) {
  if (modalWindow.hasAttribute('class', 'is-open')) {
    let currentImg = imgUrls.indexOf(urlOfImgClick);
    if (evt.key === 'ArrowLeft') {
      let newImg = currentImg - 1;
      if (newImg >= 0) {
        console.log(urlOfImgClick);
        modalImg.setAttribute('src', imgUrls[newImg]);
        urlOfImgClick = imgUrls[newImg];
      }
    }
    if (evt.key === 'ArrowRight') {
      let newImg = currentImg + 1;
      if (newImg <= amountImg - 1) {
        console.log(urlOfImgClick);
        modalImg.setAttribute('src', imgUrls[newImg]);
        urlOfImgClick = imgUrls[newImg];
      }
    }
    return;
  }
}

function onModalOpen() {
  modalWindow.classList.toggle('is-open');
  modalImg.setAttribute('src', '');
}

function onModalClose() {
  modalWindow.classList.remove('is-open');
  document.removeEventListener('keydown', onModalLeft);
  document.removeEventListener('keydown', onModalCloseEsc);
}

function onModalCloseEsc(evt) {
  if (evt.key === 'Escape') {
    modalWindow.classList.remove('is-open');
    document.removeEventListener('keydown', onModalLeft);
    document.removeEventListener('keydown', onModalCloseEsc);
  }
}

function onModalOverlyClose() {
  modalWindow.classList.remove('is-open');
  document.removeEventListener('keydown', onModalLeft);
  document.removeEventListener('keydown', onModalCloseEsc);
}
