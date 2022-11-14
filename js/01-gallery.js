import { galleryItems } from "./gallery-items.js";

const galleryContainer = document.querySelector(".gallery");

const galleryMarkup = galleryItems
  .map(({ preview, original, description }) => {
    return `
    <div class="gallery__item">
    <a class="gallery__link" href="${original}">
        <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
        />
    </a>
    </div>`;
  })
  .join("");

galleryContainer.insertAdjacentHTML("beforeend", galleryMarkup);

galleryContainer.addEventListener("click", (e) => {
  e.preventDefault();
  const galleryImage = e.target;

  if (!galleryImage.classList.contains("gallery__image")) {
    return;
  }

  const modal = basicLightbox.create(
    `<div class="modal">
        <img src="${galleryImage.dataset.source}" width="1024">
    </div>`,
    {
      onShow: () => {
        document.addEventListener("keydown", function handler(e) {
          if (e.code === "Escape") {
            modal.close();
            document.removeEventListener("keydown", handler);
          }
        });
      },
    }
  );

  modal.show();
});
