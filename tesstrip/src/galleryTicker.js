// 🖼️ Marquee-style auto scroll for photo gallery in .photo-gallery section
export function initGalleryScroll() {
  const gallery = document.getElementById('galleryScroll');
  if (!gallery) return;

  let galleryScroll = 0;
  setInterval(() => {
    galleryScroll += 1;
    gallery.scrollLeft = galleryScroll;
    if (gallery.scrollLeft + gallery.clientWidth >= gallery.scrollWidth) {
      galleryScroll = 0;
    }
  }, 30);
}
