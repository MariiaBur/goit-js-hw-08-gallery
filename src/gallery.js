import galleryItems from "./gallery-items.js";

const galleryEl = document.querySelector('.js-gallery');

const cards = galleryItems.map(({ preview, original, description}) => {
    const cardRef = document.createElement('li');
    cardRef.insertAdjacentHTML('afterbegin',
    `<a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>`)
    return cardRef;
})

galleryEl.append(...cards);
