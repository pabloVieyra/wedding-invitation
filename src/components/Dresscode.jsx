import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import config from "@/config/config";


const forbiddenColors = [
  { name: "Blanco", code: "#FFFFFF" },
  { name: "Azul", code: "#1E3A8A" },    // azul oscuro
  { name: "Celeste", code: "#7DD3FC" }, // celeste claro
];

/**
 * Dresscode component displays a simple card with dress code information
 * for the wedding invitation.
 *
 * @component
 * @example
 * <Dresscode />
 *
 * @returns {JSX.Element} A JSX element representing the dress code card.
 */
const Dresscode = () => {
  return (
    <motion.div
      className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="bg-gold-100 p-3 rounded-full">
            <Sparkles className="w-6 h-6 text-gold-500" />
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Dress Code
          </h3>
          <div className="space-y-2 text-gray-600">
            <p className="font-medium text-gold-600">
              {config.data.dresscode?.style || "Formal Elegante"}
            </p>
            <p className="text-sm">
              {config.data.dresscode?.description || "Te esperamos vestidos con elegancia para celebrar este momento especial"}
            </p>
            {config.data.dresscode?.colors && (
              <div className="mt-3">
                <p className="text-sm font-medium text-gray-700 mb-2">Colores sugeridos:</p>
                <div className="flex justify-center space-x-3">
                  {config.data.dresscode.colors.map((color, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center space-y-1"
                    >
                      <div
                        className="w-6 h-6 rounded-full border-2 border-gray-200"
                        style={{ backgroundColor: color.code }}
                      />
                      <span className="text-xs text-gray-500">{color.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="mt-4">
              <p className="text-sm font-medium text-gold-600 mb-2">Colores Prohibidos!!</p>
                            <p className="text-sm font-medium text-gold-600 mb-2"> Ambos Sexos</p>

              <div className="flex justify-center space-x-3">
                {forbiddenColors.map((color, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center space-y-1"
                  >
                    <div
                      className="w-6 h-6 rounded-full border-2 border-gold-300"
                      style={{ backgroundColor: color.code }}
                    />
                    <span className="text-xs text-gold-500">{color.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Dresscode;
