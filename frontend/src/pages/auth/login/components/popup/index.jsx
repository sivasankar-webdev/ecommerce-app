

export function LoadingOverlay({ message = "Server is processing, please wait..." }) {
  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ background: "rgba(0, 0, 0, 0.55)", backdropFilter: "blur(4px)" }}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl px-8 py-8 flex flex-col items-center gap-5 mx-4"
        style={{
          maxWidth: 340,
          width: "100%",
          animation: "overlayIn 0.25s cubic-bezier(.16,1,.3,1) both",
        }}
      >
        {/* Spinner */}
        <div className="relative w-16 h-16">
          {/* Outer ring */}
          <div
            className="absolute inset-0 rounded-full border-4 border-gray-100"
          />
          {/* Spinning arc */}
          <div
            className="absolute inset-0 rounded-full border-4 border-transparent"
            style={{
              borderTopColor: "#629d23",
              animation: "spin 0.8s linear infinite",
            }}
          />
          {/* Inner dot */}
          <div
            className="absolute inset-0 flex items-center justify-center"
          >
            <div
              className="w-3 h-3 rounded-full"
              style={{
                background: "#629d23",
                animation: "pulse 1.2s ease-in-out infinite",
              }}
            />
          </div>
        </div>

        {/* Text */}
        <div className="text-center">
          <p className="text-base font-bold text-gray-800 leading-snug">
            Please wait
          </p>
          <p className="text-sm text-gray-500 mt-1.5 leading-relaxed">
            {message}
          </p>
        </div>

        {/* Animated dots */}
        <div className="flex gap-1.5">
          {[0, 1, 2].map(i => (
            <div
              key={i}
              className="w-2 h-2 rounded-full"
              style={{
                background: "#629d23",
                animation: `dotBounce 1.2s ease-in-out ${i * 0.2}s infinite`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Keyframes injected once */}
      <style>{`
        @keyframes overlayIn {
          from { opacity: 0; transform: scale(0.92) translateY(12px); }
          to   { opacity: 1; transform: scale(1)    translateY(0); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.5; transform: scale(0.75); }
        }
        @keyframes dotBounce {
          0%, 80%, 100% { transform: translateY(0);    opacity: 0.4; }
          40%            { transform: translateY(-6px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}