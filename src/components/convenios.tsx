import CPSM from "../assets/CPSM.webp";
import CPL from "../assets/CPL.webp";

export function Convenios() {
  return (
    <>
      <div className="relative bg-white rounded-2xl p-4 overflow-x-hidden pt-22">
        <div className="bg-[#101fd2] p-4 rounded-lg w-fit mb-4 mx-auto md:mx-0">
          <h1 className="text-lg md:text-3xl font-bold text-white">
            Convenios
          </h1>
        </div>
      </div>
      <div className="relative bg-white rounded-2xl p-4 overflow-x-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="bg-[#f4f8f9] md:min-w-[100px] md:w-1/2 w-[30%] md:h-1/2  min-h-[100px] rounded-full flex items-center justify-center mx-auto mb-3">
              <img
                src={CPSM.src}
                alt="convenio"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div>
                <h1 className="text-xl font-bold text-[#101fd2] mb-2">
                  Colegio de Contadores Públicos de San Martín
                </h1>
              </div>
              <div>
                <p className="text-gray-500 text-pretty text-sm text-justify">
                  Con el objetivo validar, acreditar y dar peso a los cursos y
                  certificados que son validos a nivel nacional en el sector
                  publico y privado, tenemos un convenio con el Colegio de
                  Contadores Publicos de San Martin para garantizar la calidad
                  en cada sesión de nuestras capacitaciones.
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="bg-[#f4f8f9] md:min-w-[100px] md:w-1/2 w-[30%] md:h-1/2 min-h-[100px] rounded-full flex items-center justify-center mx-auto mb-3">
              <img
                src={CPL.src}
                alt="convenio"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div>
                <h1 className="text-xl font-bold text-[#101fd2] mb-2">
                  Cámara de Comercio de Lambayeque
                </h1>
              </div>
              <div>
                <p className="text-gray-500 text-pretty text-sm text-justify">
                  IFCET firma un convenio con la Cámara de Comercio de Lambayeque
                  para impulsar tu negocio. Accede a capacitaciones exclusivas,
                  asesorías especializadas y oportunidades únicas de networking
                  para el crecimiento de tu empresa en Chiclayo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
