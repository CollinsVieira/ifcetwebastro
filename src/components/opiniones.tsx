import avatar1 from "../assets/av1.webp";
import avatar2 from "../assets/av2.webp";
import avatar3 from "../assets/av3.webp";
import avatar4 from "../assets/av4.webp";

type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
};

export function Opiniones() {
  const testimonials: Testimonial[] = [
    {
      quote:
        "Los cursos de IFCET superaron mis expectativas. El enfoque práctico y los casos reales me ayudaron a aplicar de inmediato lo aprendido en mi trabajo.",
      name: "Diego Fernández",
      designation: "Jefe de Contabilidad",
      src: avatar1.src,
    },
    {
      quote:
        "Excelente metodología y docentes con gran experiencia. La plataforma es clara y dinámica; realmente optimiza el tiempo de estudio.",
      name: "Valeria Muñoz",
      designation: "Analista Financiero",
      src: avatar2.src,
    },
    {
      quote:
        "La calidad de los contenidos y el acompañamiento académico marcaron la diferencia. Recomendado para quienes buscan crecer profesionalmente.",
      name: "Carolina Ríos",
      designation: "Consultora Tributaria",
      src: avatar3.src,
    },
    {
      quote:
        "Encontré contenidos actualizados y orientados a la práctica. El soporte académico fue clave para resolver dudas complejas.",
      name: "Marcelo Ruiz",
      designation: "Auditor",
      src: avatar4.src,
    },
  ];

  // Duplicamos la lista para crear un bucle infinito sin cortes
  const loopItems = [...testimonials, ...testimonials];

  return (
    <section className="w-full bg-white py-10">
      <div className="mx-auto max-w-full">
        <div className="mx-4 md:mx-8">
          <div className="bg-[#101fd2] p-4 rounded-lg w-fit mx-auto md:mx-0">
            <h2 className="text-lg md:text-3xl font-bold text-white text-center">
              Opiniones de nuestros estudiantes
            </h2>
          </div>
        </div>

        <div className="relative mt-6 group">
          {/* Gradientes laterales para desvanecer bordes */}
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-white to-transparent" />

          {/* Cinta/Márquee */}
          <div className="overflow-hidden">
            <div
              className="marquee-track flex w-max items-stretch gap-6 will-change-transform"
              style={{
                animation: "marquee 40s linear infinite",
              }}
            >
              {loopItems.map((t, idx) => (
                <article
                  key={`${t.name}-${idx}`}
                  className="flex-shrink-0 w-[320px] sm:w-[360px] rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={t.src}
                      alt={t.name}
                      className="h-12 w-12 rounded-full object-cover"
                      loading="lazy"
                    />
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-900 truncate">{t.name}</p>
                      <p className="text-xs text-gray-500 truncate">{t.designation}</p>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-gray-700 line-clamp-5">“{t.quote}”</p>
                </article>
              ))}
            </div>
          </div>

          {/* Reglas de animación */}
          <style>{`
@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

.group:hover .marquee-track { 
  animation-play-state: paused; 
}
          `}</style>
        </div>
      </div>
    </section>
  );
}

export default Opiniones;


