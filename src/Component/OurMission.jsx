import React from "react";
import { motion } from "framer-motion";

const OurMission = () => {
  return (
    <section className="relative bg-gray-900 text-white py-24 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://i.ibb.co.com/5dPRcjn/compressed-vitaly-gariev-e-Ql-U4-7-PGHw-unsplash.jpg')",
        }}
      ></div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="md:w-2/3"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
            Our Mission:{" "}
            <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">Sharing Food, Spreading Smiles</span>
          </h2>

          <p className="text-lg text-gray-200/90 mb-10 leading-relaxed">
            We’re on a mission to reduce food waste and hunger by connecting those
            with extra food to those who need it most. Through community compassion
            and care, we strive to create a world where no meal is wasted and
            everyone has access to nourishment.
          </p>

          <div className="grid sm:grid-cols-3 gap-6 mt-12 text-center">
            {[
              { number: "5K+", label: "Meals Shared" },
              { number: "1K+", label: "Active Donors" },
              { number: "50+", label: "Communities Served" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-xl hover:bg-white/20 hover:scale-[1.03] transition-transform duration-300"
              >
                <h3 className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent font-bold text-3xl mb-2">
                  {item.number}
                </h3>
                <p className="text-gray-200">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom Gradient Accent */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent"></div>
    </section>
  );
};

export default OurMission;
