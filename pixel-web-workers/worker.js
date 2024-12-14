self.addEventListener("message", (e) => {
	console.log("[WORKER THREAD]: Message Received:", e.data);

	if (e.data === "FIRE_PIXEL") {
		// Perform the HTTP request to fire the pixel
		// Replace the URL with your actual pixel URL
		const pixelUrl = "https://httpbin.org/delay/10"; // Example URL with a 10-second delay

		fetch(pixelUrl, {
			method: "GET",
			headers: {
				"Content-Type": "text/javascript",
			},
		})
			.then(() => {
				// Notify the main thread about the successful pixel firing
				self.postMessage({ type: "PIXEL_SUCCESS" });
				console.log("[WORKER THREAD]: Pixel fired successfully.");
			})
			.catch((error) => {
				// Notify the main thread about the failure
				self.postMessage({ type: "PIXEL_ERROR" });
				console.error("[WORKER THREAD]: Failed to fire pixel:", error);
			});
	}
});
