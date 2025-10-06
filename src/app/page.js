"use client";

export default function Home() {

  function postToApp(payload) {
    const raw = typeof payload === "string" ? payload : JSON.stringify(payload);

    if (window.PlatformInterface) {
      console.log("[JS] Android -> onEvent:", raw);
      window.PlatformInterface.onEvent(raw);
      return true;
    }

    if (window.webkit?.messageHandlers?.PlatformInterface) {
      console.log("[JS] iOS -> postMessage:", raw);
      try {
        const obj = typeof payload === "string" ? { raw } : payload;
        window.webkit.messageHandlers.PlatformInterface.postMessage(obj);
      } catch {
        window.webkit.messageHandlers.PlatformInterface.postMessage({ raw });
      }
      return true;
    }

    console.warn("No native bridge available");
    return false;
  }

  function rateUs() {
    return postToApp("open_rate_us");
  }

  return (
    <main className="flex flex-col items-center justify-center h-screen gap-6">
      <h1 className="text-4xl font-bold">Mozo test app page</h1>
      <button
        onClick={rateUs}
        className="px-6 py-3 text-white bg-green-600 rounded-lg hover:bg-green-700 transition"
      >
        Rate Us
      </button>
    </main>
  );
}
