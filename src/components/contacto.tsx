import React from "react";
import { ContactForm } from "./ContactForm.tsx";
import { Aside } from "../components/aside.tsx";
import contactoImagen from "../assets/IFCET-contactanos-instituto-formacion-contable-tributaria.webp";

export function ContactoComponent() {
  const paymentMethods = [
    {
      title: "Pagos por Yape y Plin",
      content: "Nuestro número de YAPE es: 939 292 806 \n\n A nombre del Instituto de Formación Contable, Empresarial y Tributaria",
      logos: ["/yape-logo.webp", "/plin-logo.webp"],
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200"
    },
    {
      title: "Transferencia bancaria o depósito",
      content: "Número de cuenta BCP: \n305-2546977-0-46  \n\n CCI:\n 00230500254697704612 \n\n A nombre del Instituto de Formación Contable, Empresarial y Tributaria",
      logos: ["/bcp-logo.svg"],
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      title: "Pago con tarjeta – Débito o Crédito",
      content: "Aceptamos tarjetas de crédito y débito de las principales marcas. \n\n A nombre del Instituto de Formación Contable, Empresarial y Tributaria",
      logos: ["/visa-master.png"],
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    },
    {
      title: "Pago desde el extranjero – Paypal - Western Union",
      content: "Correo electrónico: \nifcet.chiclayo@gmail.com \n\n A nombre del Instituto de Formación Contable, Empresarial y Tributaria",
      logos: ["/paypal-logo.svg", "/western-union-logo.svg"],
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200"
    }
  ];

  const renderLogo = (logoType: string) => {
    const logoComponents: { [key: string]: React.ReactElement } = {
      yape: (
        <div className="bg-purple-600 text-white rounded-xl p-3 shadow-lg">
          <div className="text-lg font-bold">YAPE</div>
        </div>
      ),
      plin: (
        <div className="bg-green-500 text-white rounded-xl p-3 shadow-lg">
          <div className="text-lg font-bold">PLIN</div>
        </div>
      ),
      bcp: (
        <div className="bg-blue-600 text-white rounded-xl p-3 shadow-lg">
          <div className="text-lg font-bold">BCP</div>
        </div>
      ),
      visa: (
        <div className="bg-blue-800 text-white rounded-xl p-3 shadow-lg">
          <div className="text-lg font-bold">VISA</div>
        </div>
      ),
      mastercard: (
        <div className="bg-red-600 text-white rounded-xl p-3 shadow-lg">
          <div className="text-lg font-bold">MC</div>
        </div>
      ),
      paypal: (
        <div className="bg-blue-700 text-white rounded-xl p-3 shadow-lg">
          <div className="text-lg font-bold">PayPal</div>
        </div>
      )
    };
    return logoComponents[logoType] || (
      <div className="bg-gray-500 text-white rounded-xl p-3 shadow-lg">
        <div className="text-lg font-bold">💳</div>
      </div>
    );
  };

  return (
    <div className="w-full">
      {/* Hero superior (por encima de los Aside) */}
      <section className="bg-gradient-to-b from-slate-900 via-slate-900 to-black text-white">
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
          <div className="grid md:grid-cols-2 items-center gap-6 md:gap-10">
            {/* Texto */}
            <div className="flex flex-col gap-4 md:gap-6">
              <h1 className="text-[clamp(1.8rem,4.5vw,3rem)] font-bold leading-tight">
                Contáctanos
              </h1>
              <p className="text-white/80">
                ¿Tienes preguntas sobre nuestros cursos o certificaciones? Déjanos tus datos y
                nuestro equipo te ayudará a elegir el programa ideal para ti.
              </p>
              <div className="flex flex-wrap gap-3 pt-1">
                <a
                  href="/cursos"
                  className="px-5 py-2.5 rounded-lg text-sm font-medium bg-[#ffb403] text-white hover:scale-[1.02] transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ffb403]"
                >
                  Ver cursos
                </a>
                <a
                  href="#contacto"
                  className="px-5 py-2.5 rounded-lg text-sm font-medium bg-white/10 text-white border border-white/30 hover:bg-white/15 hover:scale-[1.02] transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  Ir al formulario
                </a>
              </div>
            </div>
            {/* Imagen/Placeholder */}
            <div className="relative h-[32vh] md:h-[46vh] flex items-center justify-center">
              <div className="h-full w-full flex items-center justify-center rounded-xl overflow-hidden">
                <img src={contactoImagen.src} alt="Contacto" className="w-full h-full object-contain" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Layout con Aside a los lados y contenido al centro */}
      <section className="grid grid-cols-1 lg:grid-cols-[1fr_4fr_1fr] grid-rows-1 min-h-screen">
        <div className="hidden lg:block">
        <Aside videoUrl="/videos/IFCET-Curso-Peritaje-Contable-Tributario-y-Financiero.webm" linkUrl="https://wa.link/ry63wj"/>
        </div>
        <main className="p-4 sm:p-6 lg:p-8 text-black flex justify-center items-center flex-col w-full" >
          <section id="contacto" className="w-full">
            <div className="container mx-auto px-6 md:px-8 py-10 md:py-16">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="flex flex-col gap-6 justify-center bg-white/5 border border-black/10 rounded-xl p-4">
                  <h2 className="text-2xl md:text-3xl font-bold">Información de contacto</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-black/90">
                    <div className="bg-black/5 border border-black/10 rounded-xl p-4 sm:col-span-2">
                      <h3 className="font-semibold">Teléfonos</h3>
                      <p className="text-sm mt-2">+51 983 395 385</p>
                      <p className="text-sm mt-2">+51 993 125 003</p>
                      <p className="text-sm mt-2">+51 950 268 312</p>
                    </div>
                    <div className="bg-black/5 border border-black/10 rounded-xl p-4 sm:col-span-2">
                      <h3 className="font-semibold">Correo</h3>
                      <p className="text-sm">ifcet.chiclayo@gmail.com</p>
                    </div>
                    <div className="bg-black/5 border border-black/10 rounded-xl p-4 sm:col-span-2">
                      <h3 className="font-semibold">Ubicación</h3>
                      <p className="text-sm mt-2">Calle las Rosas #110, Chiclayo, Perú</p>
                      <p className="text-sm mt-2"><b>Referencia:</b> Atrás del colegio María Reyna</p>
                    </div>
                  </div>
                </div>

                <div>
                  <ContactForm />
                </div>
              </div>

              <div className="mt-4 bg-white/5 border border-black/10 rounded-xl p-4">
                <h1 className="text-3xl font-bold">Conoce nuestros medios de pago</h1>
                <p className="text-sm text-pretty text-justify">En <b>IFCET,</b> sabemos que un proceso de matrícula ágil es clave para tu desarrollo académico. Por ello, ofrecemos medios de <b>pago seguros</b>, flexibles y accesibles, <b>incluyendo transferencias bancarias, billeteras digitales, tarjetas y PayPal</b>. A continuación, te detallamos cada opción disponible para que elijas la que mejor se adapte a ti.</p>
                
                <div className="flex flex-col gap-8 pt-6">
                  {paymentMethods.map((method, index) => {
                    const isEven = index % 2 === 0;
                    
                    return (
                      <div key={index} className={`grid grid-cols-1 lg:grid-cols-1 gap-6 items-center ${isEven ? '' : 'lg:grid-flow-col-dense'}`}>
                        {/* Card con logo */}
                        <div className={`${isEven ? '' : 'lg:col-start-1'} ${method.bgColor} ${method.borderColor} border-2 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300`}>
                          <div className="flex flex-col items-center text-center space-y-4">
                            <div className="flex gap-3 items-center justify-center">
                              {method.logos.map((logo, logoIndex) => (
                                <div key={logoIndex}>
                                  <img src={logo} alt={method.title} className="w-auto h-10" />
                                </div>
                              ))}
                            </div>
                            <h3 className="text-xl font-bold text-gray-800">{method.title}</h3>
                            <div className="w-16 h-1 bg-gradient-to-r from-[#ffb403] to-orange-400 rounded-full"></div>
                            <p className="text-sm text-gray-700 whitespace-pre-line">{method.content}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="mt-12">
                <div className="rounded-2xl overflow-hidden border border-black/10">
                  <iframe
                    title="Mapa de ubicación IFCET"
                    src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d306.6193495707982!2d-79.84853575670742!3d-6.78564527942149!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1ses-419!2spe!4v1754672782502!5m2!1ses-419!2spe"
                    width="100%"
                    height="360"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>
          </section>

        </main>
        <div className="hidden lg:block">
        <Aside videoUrl="/videos/IFCET-Curso-Codigo-Tributario-Peruano.webm" linkUrl="https://wa.link/20lh8p"/>
        </div>
      </section>
    </div>
  );
}


