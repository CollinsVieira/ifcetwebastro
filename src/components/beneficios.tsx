import { Sparkles, Wifi, GraduationCap, BookOpen } from "lucide-react";

export function Beneficios() {
  const beneficios = [
    {
      id: 1,
      title: "+8 años de experiencia",
      description:
        "Somos un Instituto que lleva más de 8 años brindando cursos especializados que complementan tus conocimientos, es por ello que tenemos como objetivo prepararte para afrontar con éxito el mundo laboral.",
      icon: <Sparkles />,
    },

    {
      id: 2,
      title: "Clases virtuales",
      description:
        "Todas nuestras clases se realizan a través de la plataforma ZOOM, además, se utilizan herramientas durante las sesiones como: recursos y casos prácticos, que ayudan a identificar, entender o intuir la utilidad práctica que se tendrá en la vida real.",
      icon: <Wifi />,
    },
    {
      id: 3,
      title: "Docentes calificados",
      description:
        "Contamos con una plana docente altamente calificada, con una amplia experiencia, comprometidos con el aprendizaje, consultoría y formación pedagógica, consolidando la enseñanza y formación de manera efectiva.",
      icon: <GraduationCap />,
    },
    {
      id: 4,
      title: "Material actualizado",
      description:
        "Sostenemos nuestros módulos con material, herramientas, recursos y casos de estudio 100% actualizados en cada uno de los cursos, garantizando una enseñanza de calidad.",
      icon: <BookOpen />,
    },
  ];
  return (
    <>
      <div className="relative bg-white rounded-2xl p-4 overflow-x-hidden">
        {/* Borde en L - superior e izquierdo */}

        {/* Título azul alineado con el borde */}
        <div className="bg-[#101fd2] p-4 rounded-lg w-fit mb-4 mx-auto md:mx-0">
          <h1 className="text-lg md:text-3xl font-bold text-white">
            Descubre nuestros beneficios
          </h1>
        </div>

        <div className="text-gray-500 text-pretty mb-6">
          <h1 className="font-bold mb-2 text-pretty">
            Más de 8 años impulsando tu carrera profesional con cursos de alta
            calidad
          </h1>
          <p className="text-sm md:text-base text-justify">
            En el <b>Instituto IFCET</b>, llevamos más de 8 años ayudando a
            profesionales en Perú a crecer y desarrollar sus habilidades con
            cursos de alta calidad. Estamos comprometidos en brindarte las
            herramientas que necesitas para alcanzar tu máximo potencial.
            ¡Inscríbete hoy y da un paso más hacia el éxito profesional con
            IFCET!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-4">
          {beneficios.map((beneficio) => (
            <div key={beneficio.id} className="text-center">
              <div className="bg-[#101fd2] w-16 h-16 rounded-full flex items-center 
              justify-center mx-auto mb-3 hover:scale-110 transition-all duration-300 hover:bg-[#ffb204]/80">
                <span className="text-white text-2xl ">{beneficio.icon}</span>
              </div>
              <div>
                <div>
                  <h1 className="text-xl font-bold text-[#101fd2] mb-2">
                    {beneficio.title}
                  </h1>
                </div>
                <div>
                  <p className="text-gray-500 text-pretty text-sm text-justify">
                    {beneficio.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
