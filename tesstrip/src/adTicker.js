// 📢 Horizontal auto scroll for .ad-ticker section
export function initAdScroll() {
  const adTicker = document.getElementById('adTicker');
  if (!adTicker) return;

  let tickerScroll = 0;
  setInterval(() => {
    tickerScroll += 1;
    adTicker.scrollLeft = tickerScroll;
    if (adTicker.scrollLeft + adTicker.clientWidth >= adTicker.scrollWidth) {
      tickerScroll = 0;
    }
  }, 40);
}
