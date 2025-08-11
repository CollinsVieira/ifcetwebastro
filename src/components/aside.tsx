import { useEffect, useRef, useState } from "react";

const DEFAULT_VIDEO_URL = "/IFCET-asistente-contable-tributario-william-mendoza-tarrillo.mp4";

interface AsideProps {
  videoUrl?: string;
}

export function Aside({ videoUrl = DEFAULT_VIDEO_URL }: AsideProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isFixed, setIsFixed] = useState(false);
  const [fixedLeft, setFixedLeft] = useState(0);
  const [fixedWidth, setFixedWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Offset equivalente a top-20 (5rem => 80px)
  const stickyOffsetPx = 80;

  useEffect(() => {
    const updateMetrics = () => {
      const element = containerRef.current;
      if (!element) return;
      const rect = element.getBoundingClientRect();
      setFixedLeft(rect.left);
      setFixedWidth(rect.width);
    };

    const onScroll = () => {
      const element = containerRef.current;
      if (!element) return;
      const initialTop = element.dataset.initialTop
        ? Number(element.dataset.initialTop)
        : (() => {
            const top = element.getBoundingClientRect().top + window.scrollY;
            element.dataset.initialTop = String(top);
            return top;
          })();
      const shouldFix = window.scrollY >= initialTop - stickyOffsetPx;
      setIsFixed(shouldFix);
    };

    // Inicializar medidas y listeners
    updateMetrics();
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateMetrics);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateMetrics);
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <aside className="hidden lg:block z-10">
      <div
        ref={containerRef}
        className={`${isFixed ? "fixed top-20" : "relative"} h-screen`}
        style={isFixed ? { left: fixedLeft, width: fixedWidth } : undefined}
      >
        <div className="px-4">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
            {/* Header de la publicidad */}
            <div className="bg-[#101fd2] px-4 py-3">
              <div className="flex items-center justify-between">
                <h3 className="text-white font-bold text-sm">PUBLICIDAD</h3>
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-white/50 rounded-full"></div>
                    <div className="w-2 h-2 bg-white/50 rounded-full"></div>
                    <div className="w-2 h-2 bg-white/50 rounded-full"></div>
                  </div>
                  <button
                    onClick={handleClose}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-center items-center">
              <video
                src={videoUrl}
                autoPlay
                loop
                muted
                className="w-full"
              ></video>
            </div>
            

            {/* Footer de la publicidad */}
            <div className="bg-gray-50 px-4 py-2 border-t border-gray-200">
              <p className="text-xs text-gray-500 text-center">
                Publicidad • IFCET Perú
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
