import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "./swipermodules.css";
import virtual from "../assets/virtual.webp";
import personasMobile from "../assets/4-personas-mobile.webp";
import personapc from "../assets/personapc.webp";


type SlideCta = {
  label: string;
  to?: string; // internal link
  href?: string; // external link or anchor
  variant?: "primary" | "secondary";
};

type Slide = {
  id: string;
  title: string;
  description: string;
  desktopImage?: string;
  mobileImage?: string;
  ctas: SlideCta[];
  backgroundClass?: string;
  imagePosition?: "left" | "right"; // Nueva propiedad para controlar la posición de la imagen
};

const slides: Slide[] = [
  {
    id: "inscribete",
    title: "Impulsa tu carrera en Contabilidad y Finanzas",
    description:
      "Programas prácticos guiados por expertos. Certifícate y avanza a tu ritmo.",
    desktopImage: personapc.src,
    mobileImage: personapc.src,
    imagePosition: "right", // Imagen a la derecha
    ctas: [
      { label: "Inscribirme", to: "/cursos", variant: "primary" },
      {
        label: "Solicitar información",
        href: "/contacto#contacto",
        variant: "secondary",
      },
    ],
    backgroundClass:
      "bg-gradient-to-b from-indigo-950 via-indigo-950 to-slate-950",
  },
  {
    id: "docentes",
    title: "Aprende con docentes expertos del Perú",
    description:
      "Contenidos actualizados, casos reales y acompañamiento personalizado.",
    desktopImage: personasMobile.src,
    mobileImage: personasMobile.src,
    imagePosition: "left", // Imagen a la izquierda
    ctas: [
      { label: "Ver cursos", to: "/cursos", variant: "primary" },
      { label: "Contáctanos", href: "/contacto#contacto", variant: "secondary" },
    ],
    backgroundClass: "bg-gradient-to-b from-blue-900 via-blue-900 to-black",
  },
  {
    id: "sin-imagen",
    title: "Educación que transforma tu futuro",
    description:
      "Clases en vivo, modalidad online y certificación al finalizar.",
    desktopImage: virtual.src,
    mobileImage: virtual.src,
    imagePosition: "right", // Imagen a la derecha
    ctas: [
      { label: "Inscribirme", to: "/cursos", variant: "primary" },
      {
        label: "Solicitar información",
        href: "/contacto#contacto",
        variant: "secondary",
      },
    ],
    backgroundClass: "bg-gradient-to-b from-slate-900 via-slate-900 to-black",
  },
];

export function HeroSlider() {
  return (
    <div className="h-[calc(100vh-110px)] md:h-[75vh]  overflow-x-hidden ">
      <Swiper
        pagination={{ dynamicBullets: true, clickable: true }}
        navigation
        autoplay={{ delay: 5000, disableOnInteraction: true }}
        modules={[Pagination, Navigation, Autoplay]}
        className="h-full w-full"
        loop
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <section
              className={`${
                slide.backgroundClass ??
                "bg-gradient-to-b from-slate-900 to-black"
              } h-full w-full 2xl:px-60`}
            >
              <div className="w-full h-full grid md:grid-cols-2 items-center gap-6 px-6 md:px-10 text-white">
                {/* Contenido dinámico basado en imagePosition */}
                {[
                  // Renderizamos el contenido en el orden correcto según imagePosition
                  ...(slide.imagePosition === "left"
                    ? [
                        // Imagen a la izquierda
                        <div key="image" className="relative h-[36vh] md:h-[60vh] flex items-center justify-center">
                          {slide.desktopImage || slide.mobileImage ? (
                            <>
                              <img
                                src={slide.desktopImage ?? slide.mobileImage}
                                alt="Ilustración educativa del curso"
                                className="hidden md:block h-full w-full object-contain"
                              />
                              <img
                                src={slide.mobileImage ?? slide.desktopImage}
                                alt="Ilustración educativa del curso"
                                className="md:hidden h-full w-full object-contain"
                              />
                            </>
                          ) : (
                            <div className="h-full w-full flex items-center justify-center border border-dashed border-white/30 rounded-xl">
                              {/* Insertar imágen aquí */}
                            </div>
                          )}
                        </div>,
                        // Contenido a la derecha
                        <div key="content" className="flex flex-col gap-4 md:gap-6 max-w-xl md:ml-auto justify-center items-center 2xl:items-end 2xl:text-right">
                          <h1 className="text-[clamp(1.6rem,4.5vw,3rem)] font-bold leading-tight">
                            {slide.title}
                          </h1>
                          <p className="text-base md:text-lg text-white/90">
                            {slide.description}
                          </p>
                          <div className="flex flex-wrap gap-3 pt-2">
                            {slide.ctas.map((cta) => {
                              const baseBtn =
                                "px-5 py-2.5 rounded-lg text-sm font-medium transition-transform duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent";
                              const primary =
                                "bg-[#ffb403] text-black hover:scale-[1.03] focus-visible:ring-[#ffb403]";
                              const secondary =
                                "bg-white/10 text-white border border-white/30 hover:bg-white/15 hover:scale-[1.02] focus-visible:ring-white";

                              const className = `${baseBtn} ${
                                cta.variant === "secondary" ? secondary : primary
                              }`;

                              if (cta.to) {
                                return (
                                  <a key={cta.label} href={cta.to} className={className}>
                                    {cta.label}
                                  </a>
                                );
                              }
                              return (
                                <a key={cta.label} href={cta.href} className={className}>
                                  {cta.label}
                                </a>
                              );
                            })}
                          </div>
                        </div>,
                      ]
                    : [
                        // Contenido a la izquierda (por defecto)
                        <div key="content" className="flex flex-col gap-4 md:gap-6 max-w-xl 2xl:text-left 2xl:text-pretty">
                          <h1 className="text-[clamp(1.6rem,4.5vw,3rem)] font-bold leading-tight">
                            {slide.title}
                          </h1>
                          <p className="text-base md:text-lg text-white/90">
                            {slide.description}
                          </p>
                          <div className="flex flex-wrap gap-3 pt-2 2xl:justify-start justify-center ">
                            {slide.ctas.map((cta) => {
                              const baseBtn =
                                "px-5 py-2.5 rounded-lg text-sm font-medium transition-transform duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent";
                              const primary =
                                "bg-[#ffb403] text-black hover:scale-[1.03] focus-visible:ring-[#ffb403]";
                              const secondary =
                                "bg-white/10 text-white border border-white/30 hover:bg-white/15 hover:scale-[1.02] focus-visible:ring-white";

                              const className = `${baseBtn} ${
                                cta.variant === "secondary" ? secondary : primary
                              }`;

                              if (cta.to) {
                                return (
                                  <a key={cta.label} href={cta.to} className={className}>
                                    {cta.label}
                                  </a>
                                );
                              }
                              return (
                                <a key={cta.label} href={cta.href} className={className}>
                                  {cta.label}
                                </a>
                              );
                            })}
                          </div>
                        </div>,
                        // Imagen a la derecha
                        <div key="image" className="relative h-[36vh] md:h-[60vh] flex items-center justify-center">
                          {slide.desktopImage || slide.mobileImage ? (
                            <>
                              <img
                                src={slide.desktopImage ?? slide.mobileImage}
                                alt="Ilustración educativa del curso"
                                className="hidden md:block h-full w-full object-contain"
                              />
                              <img
                                src={slide.mobileImage ?? slide.desktopImage}
                                alt="Ilustración educativa del curso"
                                className="md:hidden h-full w-full object-contain"
                              />
                            </>
                          ) : (
                            <div className="h-full w-full flex items-center justify-center border border-dashed border-white/30 rounded-xl">
                              {/* Insertar imágen aquí */}
                            </div>
                          )}
                        </div>,
                      ]),
                ]}
              </div>
            </section>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
