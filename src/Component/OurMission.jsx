import React from "react";
import { motion } from "framer-motion";
import { 
  CheckCircle2, 
  Utensils, 
  Users2, 
  Globe2, 
  Heart, 
  Leaf, 
  ArrowRight 
} from "lucide-react";

const OurMission = () => {
  return (
    <section id="our-mission" className="relative overflow-hidden py-20 lg:py-28 bg-slate-900">
      {/* Background with optimized overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80" 
          alt="Community support"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-900/90 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left Side: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="h-px w-8 bg-orange-500"></div>
              <span className="text-orange-500 font-bold tracking-widest uppercase text-xs">
                Impact at a Glance
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-[1.1]">
              Bridging the Gap Between <br />
              <span className="text-orange-500 italic">Surplus</span> & <span className="text-orange-500 italic">Need</span>
            </h2>

            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
              We believe that food is a fundamental right, not a privilege. By leveraging 
              technology and community kindness, we’ve built a network that ensures 
              no nutritious meal ever goes to waste.
            </p>

            {/* Icon-based Feature List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6 mb-10">
              {[
                { icon: <Heart size={18} />, text: "Kindness Driven" },
                { icon: <Leaf size={18} />, text: "Zero Waste Goal" },
                { icon: <Users2 size={18} />, text: "Local Impact" },
                { icon: <CheckCircle2 size={18} />, text: "Verified Donors" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-slate-200 group cursor-default">
                  <span className="text-orange-500 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </span>
                  <span className="font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Side: Interactive Stat Cards */}
          <div className="lg:w-1/2 w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { 
                num: "5,400+", 
                label: "Meals Shared", 
                icon: <Utensils className="text-orange-500" />,
                desc: "Direct impact on local families."
              },
              { 
                num: "1,200+", 
                label: "Hero Donors", 
                icon: <Heart className="text-orange-500" />,
                desc: "Businesses and individuals."
              },
              { 
                num: "50+", 
                label: "Cities", 
                icon: <Globe2 className="text-orange-500" />,
                desc: "Expanding our reach daily."
              },
              { 
                num: "100%", 
                label: "Free Access", 
                icon: <CheckCircle2 className="text-orange-500" />,
                desc: "No costs for those in need."
              },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-orange-500/50 transition-all duration-500"
              >
                <div className="bg-slate-800 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:bg-orange-500/20 transition-colors">
                  {stat.icon}
                </div>
                <h3 className="text-3xl font-bold text-white mb-1">{stat.num}</h3>
                <p className="text-orange-500 font-semibold text-sm mb-2">{stat.label}</p>
                <p className="text-slate-400 text-xs leading-relaxed">{stat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurMission;