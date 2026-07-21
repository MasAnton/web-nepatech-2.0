import { useState } from "react";
import emailjs from "@emailjs/browser";

function ContactForm({ embedded = false }) {
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
    "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-4 focus:ring-orange-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:ring-orange-950";

  return (
    <section
      id="contact"
      className={
        embedded
          ? "bg-transparent py-0"
          : "light-grid-surface scroll-mt-20 bg-slate-50 py-8 dark:bg-slate-950 sm:scroll-mt-24 sm:py-20 lg:py-28"
      }>
      <div className="container px-0 sm:px-4">
        <div
          data-reveal={embedded ? undefined : ""}
          className={`${embedded ? "" : "reveal-content"} mx-auto grid max-w-6xl overflow-hidden rounded-2xl border border-slate-200 border-t-4 border-t-primary bg-white shadow-[0_30px_70px_-35px_rgba(15,23,42,0.35)] dark:border-slate-700 dark:border-t-primary dark:bg-slate-900 sm:rounded-[32px] lg:grid-cols-[0.8fr_1.2fr]`}>
          <div className="bg-slate-950 p-4 text-white sm:p-10 lg:p-12">
            <span className="inline-flex rounded-full bg-orange-500/15 px-2.5 py-1 text-[11px] font-semibold text-orange-300 sm:px-4 sm:py-2 sm:text-sm">
              Kontak Kami
            </span>
            <h2 className="mt-3 text-[22px] font-bold leading-tight tracking-tight sm:mt-6 sm:text-4xl">
              Mari diskusikan kebutuhan laboratorium Anda.
            </h2>
            <p className="mt-3 text-[13px] leading-5 text-slate-300 sm:mt-5 sm:text-base sm:leading-7">
              Ceritakan alat atau layanan yang Anda butuhkan. Tim kami akan
              menghubungi Anda secepatnya.
            </p>
            <div className="mt-6 border-t border-slate-800 pt-4 text-[13px] text-slate-400 sm:mt-8 sm:pt-6 sm:text-sm">
              <p className="font-semibold text-white">
                PT. Nepatech Global Solusindo
              </p>
              <a
                href="mailto:operation@ntgs.co.id"
                className="mt-2 block transition hover:text-orange-300">
                operation@ntgs.co.id
              </a>
              <a
                href="mailto:nepatech1gs@gmail.com"
                className="mt-2 block transition hover:text-orange-300">
                nepatech1gs@gmail.com
              </a>
              <a
                href="tel:02138716118"
                className="mt-1 block transition hover:text-orange-300">
                Hotline : 02138716118
              </a>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-4 sm:p-10 lg:p-12">
            <div className="mb-4 sm:mb-5">
              <label
                htmlFor="contact-name"
                className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                Nama
              </label>
              <input
                id="contact-name"
                name="from_name"
                required
                autoComplete="name"
                placeholder="Nama lengkap"
                className={fieldClass}
              />
            </div>

            <div className="mb-4 sm:mb-5">
              <label
                htmlFor="contact-email"
                className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                Email
              </label>
              <input
                id="contact-email"
                name="email_id"
                type="email"
                required
                autoComplete="email"
                placeholder="nama@perusahaan.com"
                className={fieldClass}
              />
            </div>

            <div className="mb-4 sm:mb-6">
              <label
                htmlFor="contact-message"
                className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                Pesan
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                placeholder="Jelaskan kebutuhan Anda..."
                className={`${fieldClass} h-28 resize-y sm:h-36`}
              />
            </div>

            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex min-w-32 items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-500 disabled:cursor-not-allowed disabled:opacity-60 sm:px-7 sm:text-base">
                {isSubmitting ? "Mengirim..." : "Kirim Pesan"}
              </button>
              {status && (
                <p
                  role="status"
                  className={`text-sm font-medium ${status.type === "error" ? "text-red-600 dark:text-red-400" : "text-emerald-600 dark:text-emerald-400"}`}>
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
