import React from 'react';
import HeroSection from '../Component/HeroSection';
import { Link, useLoaderData } from 'react-router';
import FoodCard from '../Component/FoodCard';
import HowItWorks from '../Component/HowItWorks';
import OurMission from '../Component/OurMission';

const Home = () => {
    const foods = useLoaderData()
    // console.log(foods)
    return (
        <div>
            {/* hero section */}
            <div>
                <HeroSection></HeroSection>
            </div>
            {/* featured-foods */}
            <div className='text-center mb-10 mt-12'>
                <h2 className='text-3xl md:text-4xl font-bold text-gray-800 mb-3'>
                    🍴 Featured Food Donations
                </h2>
                <p className='text-gray-600 max-w-2xl mx-auto text-sm md:text-base'>
                    Discover freshly prepared meals and surplus food generously donated by our community members.
                    Each item is available for pickup before its expiration date — helping reduce food waste and feed those in need.
                </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mt-10 mb-10'>
                {
                    foods.map(food => <FoodCard food={food} key={food._id}></FoodCard>)
                }
            </div>
            <div className='flex justify-center'>
                <Link to='/available-foods' className='btn bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold py-2.5  hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-md hover:shadow-lg hover:rounded-2xl'>Show All</Link>
            </div>

            <div className='mt-10 mb-10'>
                <HowItWorks></HowItWorks>
            </div>

            <div className='mt-16 mb-16'>
                <OurMission></OurMission>
            </div>
        </div>
    );
};

export default Home;