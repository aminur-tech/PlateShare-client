import React, { useState } from "react";
import { ChevronDown } from "lucide-react"; // Recommended for professional iconography

const FAQ_DATA = [
  {
    question: "How can I donate food?",
    answer: "You can donate food by signing up and adding food items in the 'Add Food' section of your dashboard.",
  },
  {
    question: "Who can request food?",
    answer: "Anyone who registers on our platform can request available food items based on geographic availability.",
  },
  {
    question: "How is food picked up?",
    answer: "Donators specify pickup windows and locations. Requesters will receive detailed instructions upon approval of their request.",
  },
  {
    question: "Is there a cost for requesting food?",
    answer: "No, our platform is built on community sharing; all donations and requests are entirely free of charge.",
  },
];

const FAQItem = ({ faq, isOpen, toggle }) => {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700">
      <button
        onClick={toggle}
        className="w-full py-6 flex justify-between items-center text-left group focus:outline-none"
        aria-expanded={isOpen}
      >
        <span className={`text-lg font-semibold transition-colors duration-200 ${
          isOpen ? "text-orange-600 dark:text-orange-500" : "text-gray-900 dark:text-gray-100"
        }`}>
          {faq.question}
        </span>
        <ChevronDown 
          className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
            isOpen ? "rotate-180 text-orange-600" : ""
          }`}
        />
      </button>
      
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-64 pb-6 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          {faq.answer}
        </p>
      </div>
    </div>
  );
};

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className=" mt-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          Everything you need to know about our food sharing initiative.
        </p>
      </div>

      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {FAQ_DATA.map((faq, index) => (
          <FAQItem
            key={index}
            faq={faq}
            isOpen={activeIndex === index}
            toggle={() => handleToggle(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default FAQSection;