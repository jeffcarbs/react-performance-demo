const counts = {};

// https://gist.github.com/nmsdvid/8807205#gistcomment-2318343
function debounce(callback, time) {
  let interval;
  return (...args) => {
    clearTimeout(interval);
    interval = setTimeout(() => {
      interval = null;
      callback(...args);
    }, time);
  };
}

function eventCount() {
  let countDisplay = document.getElementById('count-display');

  if (!countDisplay) {
    countDisplay = document.createElement('div');
    countDisplay.id = 'count-display';
    document.body.appendChild(countDisplay);
  }

  countDisplay.innerHTML = `<pre>${JSON.stringify(counts, null, 2)}</pre>`;
}

const efficientEventCount = debounce(eventCount, 100);

function eventCounter(component) {
  counts[component] = (counts[component] || 0) + 1;
  efficientEventCount();
}

export default eventCounter;
