this.addEventListener('message', (e) => {
  console.log('[WORKER THREAD]: Message Received')

  const result = e.data[0] * e.data[1];
  if (isNaN(result)) {
    postMessage('Please write two valid numbers.')
  } else {
    postMessage(`Result: ${result}`)
  }
})
