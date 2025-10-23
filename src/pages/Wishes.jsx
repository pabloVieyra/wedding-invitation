import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import {
  Calendar,
  ChevronDown,
  User,
  MessageCircle,
  Send,
  Smile,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function Wishes() {
  const [showConfetti, setShowConfetti] = useState(false);
  const [newWish, setNewWish] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [attendance, setAttendance] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [companions, setCompanions] = useState([""]);
  const [maxCompanions, setMaxCompanions] = useState(0);
  const [guestName, setGuestName] = useState("");
  const [alreadySent, setAlreadySent] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const companionsParam = urlParams.get("companions");
    let max = 0;
    if (companionsParam) {
      const parsed = parseInt(companionsParam, 10);
      if (!isNaN(parsed) && parsed >= 0 && parsed <= 5) {
        max = parsed;
      }
    }
    setMaxCompanions(max);
    setCompanions(max > 0 ? [""] : []);
    // guest name
    const guestParam = urlParams.get("guest");
    if (guestParam) setGuestName(guestParam);

    // Verifica en localStorage si ya envió
    const sent = localStorage.getItem("weddingWishSent");
    if (sent === "true") setAlreadySent(true);
  }, []);

  const options = [
    { value: "Si", label: "Sí, asistiré" },
    { value: "No", label: "No, no puedo asistir" },
    // { value: "Tal vez", label: "Tal vez, confirmaré más tarde" },
  ];

  const handleCompanionChange = (index, value) => {
    setCompanions((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  const handleAddCompanion = () => {
    if (companions.length < maxCompanions) {
      setCompanions((prev) => [...prev, ""]);
    }
  };

  const handleSubmitWish = async (e) => {
    e.preventDefault();
    if (!attendance || !e.target.name.value.trim()) return;
    setIsSubmitting(true);
    const sheetUrl = import.meta.env.VITE_SHEET_URL;
    const name = e.target.name.value.trim();
    const wish = newWish.trim();
    const companionsList = companions.filter((c) => c.trim()).join(", ");
    // Fecha en formato Argentina (DD/MM/YYYY HH:mm)
    const now = new Date();
    const fecha = now.toLocaleString("es-AR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    });
    const data =
      `Nombre=${encodeURIComponent(name)}` +
      `&Asistira=${encodeURIComponent(attendance)}` +
      `&Acompanantes=${encodeURIComponent(companionsList)}` +
      `&Comentarios=${encodeURIComponent(wish)}` +
      `&Fecha=${encodeURIComponent(fecha)}`;
    try {
      const res = await fetch(sheetUrl, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: data,
      });
      await res.text();
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
      setNewWish("");
      setAttendance("");
      setCompanions(maxCompanions > 0 ? [""] : []);
      if (!guestName) e.target.name.value = "";
      // Marca como enviado en localStorage
      localStorage.setItem("weddingWishSent", "true");
      setAlreadySent(true);
    } catch {
      // Puedes mostrar un error si quieres
    }
    setIsSubmitting(false);
  };

  return (
    <>
      <section id="wishes" className="min-h-screen relative overflow-hidden">
        {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}
        <div className="container mx-auto px-4 py-20 relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-4 mb-16"
          >
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block text-gold-500 font-medium"
            >
              Envíe sus mejores deseos
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl font-serif text-gray-800"
            >
              Mensajes
            </motion.h2>

            {/* Decorative Divider */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center justify-center gap-4 pt-4"
            >
              <div className="h-[1px] w-12 bg-gold-200" />
              <MessageCircle className="w-5 h-5 text-gold-400" />
              <div className="h-[1px] w-12 bg-gold-200" />
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="max-w-2xl mx-auto mt-12"
          >
            {alreadySent ? (
              <div className="bg-white/80 p-8 rounded-2xl border border-gold-100/50 shadow-lg text-center">
                <h3 className="text-2xl font-semibold text-gold-700 mb-4">¡Gracias por confirmar y enviar tus deseos!</h3>
                <p className="text-gray-600">Ya has enviado tu confirmación. Si necesitas modificarla, contacta a los novios.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitWish} className="relative">
                <div className="backdrop-blur-sm bg-white/80 p-6 rounded-2xl border border-gold-100/50 shadow-lg">
                  <div className="space-y-2">
                    {/* Name Input */}
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-gray-500 text-sm mb-1">
                        <User className="w-4 h-4" />
                        <span>Tu Nombre</span>
                      </div>
                      <input
                        name="name"
                        type="text"
                        placeholder="Ingresa tu nombre..."
                        className="w-full px-4 py-2.5 rounded-xl bg-white/50 border border-gold-100 focus:border-gold-300 focus:ring focus:ring-gold-200 focus:ring-opacity-50 transition-all duration-200 text-gray-700 placeholder-gray-400"
                        required
                        defaultValue={guestName}
                        readOnly={!!guestName}
                      />
                    </div>
                    {/* Companions Input */}
                    {maxCompanions > 0 && (
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-gray-500 text-sm mb-1">
                        <User className="w-4 h-4" />
                        <span>Acompañantes</span>
                        <button
                          type="button"
                          onClick={handleAddCompanion}
                          className={`ml-2 px-2 py-0.5 rounded-full bg-gold-100 text-gold-600 font-bold text-lg hover:bg-gold-200 transition-colors ${companions.length >= maxCompanions ? 'opacity-50 cursor-not-allowed' : ''}`}
                          aria-label="Agregar acompañante"
                          disabled={companions.length >= maxCompanions}
                        >
                          +
                        </button>
                      </div>
                      {companions.map((companion, idx) => (
                        <input
                          key={idx}
                          type="text"
                          placeholder={`Nombre del acompañante ${idx + 1}`}
                          className="w-full px-4 py-2.5 rounded-xl bg-white/50 border border-gold-100 focus:border-gold-300 focus:ring focus:ring-gold-200 focus:ring-opacity-50 transition-all duration-200 text-gray-700 placeholder-gray-400 mb-2"
                          value={companion}
                          onChange={e => handleCompanionChange(idx, e.target.value)}
                        />
                      ))}
                    </div>
                    )}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="space-y-2 relative"
                    >
                      <div className="flex items-center space-x-2 text-gray-500 text-sm mb-1">
                        <Calendar className="w-4 h-4" />
                        <span>¿Asistirás?</span>
                      </div>

                      {/* Custom Select Button */}
                      <button
                        type="button"
                        onClick={() => setIsOpen(!isOpen)}
                        className="w-full px-4 py-2.5 rounded-xl bg-white/50 border border-gold-100 focus:border-gold-300 focus:ring focus:ring-gold-200 focus:ring-opacity-50 transition-all duration-200 text-left flex items-center justify-between"
                      >
                        <span
                          className={
                            attendance ? "text-gray-700" : "text-gray-400"
                          }
                        >
                          {attendance
                            ? options.find((opt) => opt.value === attendance)
                                ?.label
                            : "Selecciona tu asistencia..."}
                        </span>
                        <ChevronDown
                          className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                            isOpen ? "transform rotate-180" : ""
                          }`}
                        />
                      </button>

                      {/* Dropdown Options */}
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute z-10 w-full mt-1 bg-white rounded-xl shadow-lg border border-gold-100 overflow-hidden"
                          >
                            {options.map((option) => (
                              <motion.button
                                key={option.value}
                                type="button"
                                onClick={() => {
                                  setAttendance(option.value);
                                  setIsOpen(false);
                                }}
                                whileHover={{
                                  backgroundColor: "rgb(255, 241, 242)",
                                }}
                                className={`w-full px-4 py-2.5 text-left transition-colors
                                          ${
                                            attendance === option.value
                                              ? "bg-gold-50 text-gold-600"
                                              : "text-gray-700 hover:bg-gold-50"
                                          }`}
                              >
                                {option.label}
                              </motion.button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                    {/* Wish Textarea */}
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-gray-500 text-sm mb-1">
                        <MessageCircle className="w-4 h-4" />
                        <span>Tus deseos</span>
                      </div>
                      <textarea
                        name="wish"
                        placeholder="Envía tus deseos y oraciones para los novios..."
                        className="w-full h-32 p-4 rounded-xl bg-white/50 border border-gold-100 focus:border-gold-300 focus:ring focus:ring-gold-200 focus:ring-opacity-50 resize-none transition-all duration-200"
                        required
                        value={newWish}
                        onChange={e => setNewWish(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-2 text-gray-500">
                      <Smile className="w-5 h-5" />
                      <span className="text-sm">Deja tus deseos</span>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`flex items-center space-x-2 px-6 py-2.5 rounded-xl text-white font-medium transition-all duration-200
                      ${
                        isSubmitting
                          ? "bg-gray-300 cursor-not-allowed"
                          : "bg-gold-500 hover:bg-gold-600"
                      }`}
                    >
                      <Send className="w-4 h-4" />
                      <span>
                        {isSubmitting ? "Enviando..." : "Enviar Confirmación"}
                      </span>
                    </motion.button>
                  </div>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </>
  );
}
