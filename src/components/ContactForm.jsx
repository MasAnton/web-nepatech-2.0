import { useState } from "react";
import emailjs from "@emailjs/browser";

function ContactForm() {
  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const userId = import.meta.env.VITE_EMAILJS_USER_ID;

    if (!serviceId || !templateId || !userId) {
      setStatus({
        type: "error",
        message: "EmailJS belum dikonfigurasi. Periksa file environment.",
      });
      return;
    }

    setIsSubmitting(true);
    setStatus(null);
    try {
      await emailjs.sendForm(serviceId, templateId, event.target, userId);
      setStatus({
        type: "success",
        message: "Pesan sudah terkirim. Kami akan segera membalas.",
      });
      event.target.reset();
    } catch (error) {
      console.error(error);
      setStatus({
        type: "error",
        message: "Pesan gagal dikirim. Silakan coba lagi.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldClass =
    "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-4 focus:ring-orange-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:ring-orange-950";

  return (
    <section
      id="contact"
      data-reveal
      className="reveal-section bg-slate-50 py-20 dark:bg-slate-950 lg:py-28">
      <div className="container px-4">
        <div className="mx-auto grid max-w-6xl overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_30px_70px_-35px_rgba(15,23,42,0.35)] dark:border-slate-700 dark:bg-slate-900 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="bg-slate-950 p-7 text-white sm:p-10 lg:p-12">
            <span className="inline-flex rounded-full bg-orange-500/15 px-4 py-2 text-sm font-semibold text-orange-300">
              Kontak Kami
            </span>
            <h2 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
              Mari diskusikan kebutuhan laboratorium Anda.
            </h2>
            <p className="mt-5 leading-7 text-slate-300">
              Ceritakan alat atau layanan yang Anda butuhkan. Tim kami akan
              menghubungi Anda secepatnya.
            </p>
            <div className="mt-8 border-t border-slate-800 pt-6 text-sm text-slate-400">
              <p className="font-semibold text-white">
                PT. Nepatech Global Solusindo
              </p>
              <p className="mt-2">nepatech1gs@gmail.com</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-7 sm:p-10 lg:p-12">
            <div className="mb-5">
              <label htmlFor="contact-name" className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                Nama
              </label>
              <input id="contact-name" name="from_name" required autoComplete="name" placeholder="Nama lengkap" className={fieldClass} />
            </div>

            <div className="mb-5">
              <label htmlFor="contact-email" className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                Email
              </label>
              <input id="contact-email" name="email_id" type="email" required autoComplete="email" placeholder="nama@perusahaan.com" className={fieldClass} />
            </div>

            <div className="mb-6">
              <label htmlFor="contact-message" className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                Pesan
              </label>
              <textarea id="contact-message" name="message" required placeholder="Jelaskan kebutuhan Anda..." className={`${fieldClass} h-36 resize-y`} />
            </div>

            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <button type="submit" disabled={isSubmitting} className="inline-flex min-w-32 items-center justify-center rounded-full bg-primary px-7 py-3 font-semibold text-white transition hover:bg-orange-500 disabled:cursor-not-allowed disabled:opacity-60">
                {isSubmitting ? "Mengirim..." : "Kirim Pesan"}
              </button>
              {status && (
                <p role="status" className={`text-sm font-medium ${status.type === "error" ? "text-red-600 dark:text-red-400" : "text-emerald-600 dark:text-emerald-400"}`}>
                  {status.message}
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ContactForm;
