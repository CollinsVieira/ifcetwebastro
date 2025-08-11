import { useState } from "react";

type ContactFormData = {
  fullName: string;
  email: string;
  phone?: string;
  course?: string;
  message: string;
};

const initialForm: ContactFormData = {
  fullName: "",
  email: "",
  phone: "",
  course: "",
  message: "",
};

export function ContactForm() {
  const [form, setForm] = useState<ContactFormData>(initialForm);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");

    try {
      // TODO: Integrar API real. Por ahora simulamos el envío.
      await new Promise((resolve) => setTimeout(resolve, 900));
      setStatus("success");
      setForm(initialForm);
    } catch (err) {
      setStatus("error");
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-4 bg-white/5 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-black/10"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
          <div className="flex flex-col gap-2">
            <label htmlFor="fullName" className="text-sm text-black/80 ">
              Nombre completo
            </label>
            <input
              id="fullName"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              required
              placeholder="Tu nombre y apellido"
              className="px-4 py-2.5 rounded-lg bg-white text-black border border-black/10 placeholder:text-black/60 focus:outline-none focus:ring-2 focus:ring-[#ffb403]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm text-black/80">
              Correo electrónico
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="tu@email.com"
              className="px-4 py-2.5 rounded-lg bg-white border border-black/10 text-black placeholder:text-black/60 focus:outline-none focus:ring-2 focus:ring-[#ffb403]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="phone" className="text-sm text-black/80">
              Teléfono (opcional)
            </label>
            <input
              id="phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="+51 999 999 999"
              className="px-4 py-2.5 rounded-lg bg-white border border-black/10 text-black placeholder:text-black/60 focus:outline-none focus:ring-2 focus:ring-[#ffb403]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="course" className="text-sm text-black/80">
              Curso de interés (opcional)
            </label>
            <select
              id="course"
              name="course"
              value={form.course}
              onChange={handleChange}
              className="px-4 py-2.5 rounded-lg bg-white border border-black/10  text-black placeholder:text-black/60 focus:outline-none focus:ring-2 focus:ring-[#ffb403]"
            >
              <option value="">Selecciona un curso</option>
              <option value="Peritaje Contable">Peritaje Contable</option>
              <option value="Contabilidad de Costos">Contabilidad de Costos</option>
              <option value="Contabilidad Comercial">Contabilidad Comercial</option>
              <option value="Presupuesto Público">Presupuesto Público</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="message" className="text-sm text-black/80">
            Mensaje
          </label>
          <textarea
            id="message"
            name="message"
            value={form.message}
            onChange={handleChange}
            required
            rows={5}
            placeholder="Cuéntanos qué información necesitas o en qué curso estás interesado/a"
            className="px-4 py-2.5 rounded-lg bg-white border border-black/10 text-black placeholder:text-black/60 focus:outline-none focus:ring-2 focus:ring-[#ffb403]"
          />
        </div>

        <div className="flex gap-3 justify-start">
          <button
            type="submit"
            disabled={status === "submitting"}
            className="px-5 py-2.5 rounded-lg text-sm font-medium bg-[#ffb403]  text-black hover:scale-[1.02] transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ffb403]"
          >
            {status === "submitting" ? "Enviando…" : "Solicitar información"}
          </button>
          {status === "success" && (
            <span className="text-sm text-green-400 self-center">
              ¡Recibimos tu solicitud! Te contactaremos pronto.
            </span>
          )}
          {status === "error" && (
            <span className="text-sm text-red-400 self-center">
              Ocurrió un error. Inténtalo nuevamente.
            </span>
          )}
        </div>
      </form>
    </div>
  );
}


