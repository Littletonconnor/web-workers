/**
 * Blocks the main thread. Needed instead of something like await sleep() because that will be put on the micro-task queue.
 */
function blockMainThread(duration) {
  const start = Date.now();
  while (Date.now() - start < duration) {
  }
}

onmessage = async function(e) {
  console.log('[Worker Thread]: Message received from main script')
  const result = e.data[0] * e.data[1]

  if (isNaN(result)) {
    postMessage('Please write two valid numbers.')
  } else {
    console.log('[Worker Thread]: Starting work...')
    const workerResult = 'Result: ' + result;
    blockMainThread(10000)
    console.log('[Worker Thread]: Work finished, posting back to main thread.')
    postMessage(workerResult)
  }
}
