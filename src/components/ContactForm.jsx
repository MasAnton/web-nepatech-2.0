import { useState } from "react";
import emailjs from "@emailjs/browser";

function ContactForm() {
  const [status, setStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const userId = import.meta.env.VITE_EMAILJS_USER_ID;

    if (!serviceId || !templateId || !userId) {
      setStatus({ type: "error", message: "EmailJS not configured. See .env.example." });
      return;
    }

    emailjs
      .sendForm(serviceId, templateId, e.target, userId)
      .then(() => {
        setStatus({ type: "success", message: "Pesan terkirim. Terima kasih!" });
        e.target.reset();
      })
      .catch((err) => {
        console.error(err);
        setStatus({ type: "error", message: "Gagal mengirim pesan." });
      });
  };

  return (
    <section id="contact" className="pb-16 pt-16">
      <div className="container px-4">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold">Kontak Kami</h2>
          <p className="text-sm text-slate-600">Kirim pesan, kami akan membalas secepatnya.</p>
        </div>

        <form onSubmit={handleSubmit} className="mx-auto max-w-xl">
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">Nama</label>
            <input name="from_name" required className="w-full rounded-lg border px-4 py-2" />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">Email</label>
            <input name="email_id" type="email" required className="w-full rounded-lg border px-4 py-2" />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">Pesan</label>
            <textarea name="message" required className="w-full rounded-lg border px-4 py-2 h-32" />
          </div>

          <div className="flex items-center gap-4">
            <button type="submit" className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-2 text-white">Kirim</button>
            {status && (
              <p className={`text-sm ${status.type === "error" ? "text-red-600" : "text-green-600"}`}>{status.message}</p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}

export default ContactForm;
