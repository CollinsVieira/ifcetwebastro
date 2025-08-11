import { Aside } from "./aside";
import docentesData from "../data/docentes.json";
import docentesp from "../assets/IFCET-equipo-docente-estudio-contable-empresarial-tributario-Peru-scaled.webp";


interface Docente {
  id: number;
  quote: string;
  name: string;
  designation: string;
  src: string;
}

export function DocentesComponent() {
  const docentes: Docente[] = docentesData.docentes;

  return (
    <div className="w-full">
      {/* Hero superior (por encima de los Aside) */}
      <section className="bg-gradient-to-b from-slate-900 via-slate-900 to-black text-white">
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
          <div className="grid md:grid-cols-2 items-center gap-6 md:gap-10">
            {/* Texto */}
            <div className="flex flex-col gap-4 md:gap-6">
              <h1 className="text-[clamp(1.6rem,4.5vw,3rem)] font-bold leading-tight">
                Aprende con docentes expertos del Perú
              </h1>
              <p className="text-white/80">
                Nuestro equipo está conformado por especialistas en contabilidad,
                tributación, finanzas y auditoría. Clases con casos reales, enfoque
                práctico y acompañamiento personalizado.
              </p>
              <div className="flex flex-wrap gap-3 pt-1">
                <a
                  href="/cursos"
                  className="px-5 py-2.5 rounded-lg text-sm font-medium bg-[#ffb403] text-black hover:scale-[1.02] transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ffb403]"
                >
                  Ver cursos
                </a>
                <a
                  href="/contacto#contacto"
                  className="px-5 py-2.5 rounded-lg text-sm font-medium bg-white/10 text-white border border-white/30 hover:bg-white/15 hover:scale-[1.02] transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  Contáctanos
                </a>
              </div>
            </div>

            {/* Imagen/Placeholder */}
            <div className="relative h-[32vh] md:h-[46vh] flex items-center justify-center">
              <div className="h-full w-full flex items-center justify-center border border-dashed border-white/30 rounded-xl">
                {/* Insertar imágen aquí: Fotografía de docentes profesionales en ambiente académico, iluminación suave, espacio negativo lateral */}
                <img src={docentesp.src} alt="Docentes" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Layout con Aside a los lados y contenido al centro */}
      <section className="grid grid-cols-1 lg:grid-cols-[1fr_4fr_1fr] grid-rows-1 min-h-screen">
        <div className="hidden lg:block">
          <Aside />
        </div>
        {/* MAIN CONTENT */}
        <main className="p-4 sm:p-6 lg:p-8 text-white flex justify-center items-center flex-col w-full">
          <div className="bg-[#040945] p-3 sm:p-4 rounded-lg w-fit mx-auto lg:mx-0 mt-2 sm:mt-4">
            <h1 className="text-base sm:text-lg md:text-2xl lg:text-3xl font-bold text-white text-center lg:text-left">
              Conoce a nuestros docentes
            </h1>
          </div>
          <div className="w-full max-w-6xl mx-auto mt-8">
            <div className="grid grid-cols-1 gap-6 lg:gap-8">
              {docentes.map((docente) => (
                <div
                  key={docente.id}
                  className="group relative backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:scale-[1.02] hover:border-slate-600/70 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20"
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Imagen del docente */}
                    <div className="relative flex-shrink-0">
                      <div className="w-48 h-48 md:w-56 md:h-56 rounded-xl overflow-hidden bg-gradient-to-br from-slate-700 to-slate-800">
                        <img
                          src={docente.src}
                          alt={docente.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            target.nextElementSibling?.classList.remove('hidden');
                          }}
                        />
                        <div className="hidden w-full h-full flex items-center justify-center text-slate-400">
                          <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                      {/* Badge de especialidad */}
                      <div className="absolute -bottom-3 left-4 bg-[#333] text-white px-4 py-1.5 rounded-full text-sm font-medium shadow-lg">
                        {docente.designation}
                      </div>
                    </div>

                    {/* Información del docente */}
                    <div className="flex-1 space-y-4">
                      <h3 className="text-2xl font-bold text-black group-hover:text-black/50 transition-colors duration-300">
                        {docente.name}
                      </h3>
                      
                      <p className="text-slate-800 leading-relaxed text-base">
                        {docente.quote}
                      </p>
                    </div>
                  </div>

                  {/* Efecto de brillo en hover */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </div>
              ))}
            </div>

            {/* Texto adicional */}
            <div className="text-center mt-12 text-slate-400">
              <p className="text-lg">
                Nuestros docentes cuentan con amplia experiencia en el sector y están comprometidos con tu éxito profesional
              </p>
            </div>
          </div>
        </main>
        <div className="hidden lg:block">
          <Aside />
        </div>
      </section>
    </div>
  );
}
