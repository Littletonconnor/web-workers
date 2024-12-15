if (window.Worker) {
	const worker = new Worker("worker.js");
	worker.postMessage("FIRE_PIXEL");

	worker.onmessage = function () {
		console.log("[MAIN THREAD]: Message Received.");
	};
} else {
	console.log("[MAIN THREAD]: Workers not supported.");
}
