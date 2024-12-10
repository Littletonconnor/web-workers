
const NUMBER_ONE = document.querySelector('#number1')
const NUMBER_TWO = document.querySelector('#number1')
const SUBMIT = document.querySelector('#submit')
const RESULT = document.querySelector('.result')

SUBMIT.addEventListener('submit', async (e) => {
    e.preventDefault();

  if (window.Worker) {
    const worker = new Worker('worker.js')
    worker.postMessage([NUMBER_ONE.value, NUMBER_TWO.value])

    worker.onmessage = function(e) {
      RESULT.textContent = e.data
      console.log('[MAIN THREAD]: Message Received.')
    }
  } else {
      console.log('[MAIN THREAD]: Workers not supported.')
  }
})
