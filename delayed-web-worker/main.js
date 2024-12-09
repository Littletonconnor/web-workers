const first = document.querySelector('#number1')
const second = document.querySelector('#number2')
const submit = document.querySelector('#submit')
const result = document.querySelector('.result')

let currentMode = 'main-thread';
const radios = document.querySelectorAll('input[name="mode"]');

/**
 * Blocks the main thread. Needed instead of something like await sleep() because that will be put on the micro-task queue.
 */
function blockMainThread(duration) {
  const start = Date.now();
  while (Date.now() - start < duration) {
  }
}

radios.forEach(radio => {
  radio.addEventListener('change', (e) => {
    currentMode = e.target.value;
  });
});

submit.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (currentMode === 'main-thread') {
    // Execute code on the main thread.
    // This will effectively block the main thread for 10s.
    // No events will be captured during this time (example: click the inputs)
    console.log("[Main Thread]: Starting work and blocking main thread...")

    const r = first.value * second.value;
    blockMainThread(10000);
    result.textContent = r;
  } else {
    // Execute code within a Web worker.
    // The web worker will also be blocked for 10s but it will not effect the main thread.
    if (window.Worker) {
      const myWorker = new Worker('worker.js')

      myWorker.postMessage([first.value, second.value])

      myWorker.onmessage = function (e) {
        result.textContent = e.data
        console.log("[Main Thread]: Message received from worker")
      }
    } else {
      console.log('[Main Thread]: Your browser does not support web workers.')
    }
  }
})
