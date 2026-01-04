import React, { useEffect, useState } from 'react';
import { Link } from 'react-router'; 
import HeroSection from '../Component/HeroSection';
import FoodCard from '../Component/FoodCard';
import HowItWorks from '../Component/HowItWorks';
import OurMission from '../Component/OurMission';
import SkeletonCard from '../Component/SkeletonCard';
import FAQSection from '../Component/FAQSection';

const Home = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(4); 
  useEffect(() => {
    fetch('http://localhost:3000/foods')
      .then(res => res.json())
      .then(data => {
        setFoods(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <main>
      <HeroSection />

      {/* Featured Foods Section */}
      <section >
        <div className="text-center mt-16 mb-10 px-4">
          <h2 className="text-3xl md:text-5xl font-extrabold text-base-content  mt-2 mb-4">
            Featured Food Donations
          </h2>
          <p className="max-w-2xl mx-auto text-base-content/70 text-lg">
            Discover freshly prepared meals and surplus food generously donated by our community members.
          </p>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
            : foods.slice(0, visibleCount).map(food => <FoodCard key={food._id} food={food} />)
          }
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
          {visibleCount < foods.length && (
            <button
              onClick={() => setVisibleCount(prev => prev + 4)}
              className="px-8 py-3 bg-white border-2 border-orange-500 text-orange-600 font-bold rounded-full hover:bg-orange-50 transition-all duration-300"
            >
              Load More
            </button>
          )}
          
          <Link 
            to="/available-foods" 
            className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-full shadow-lg hover:shadow-orange-200 hover:-translate-y-1 transition-all duration-300"
          >
            See All Available Foods
          </Link>
        </div>
      </section>

      {/* Informational Sections with Alternating Backgrounds */}
      <section className="bg-white  mt-20">
        <div>
          <HowItWorks />
        </div>
      </section>

      <section className="mt-20">
        <div>
          <OurMission />
        </div>
      </section>

      <section className='mb-20'>
        <div>
          <FAQSection/>
        </div>
      </section>
    </main>
  );
};

export default Home;