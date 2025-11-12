import React from 'react';
import { Link, useLoaderData } from 'react-router';
import FoodCard from '../Component/FoodCard';

const AvailableFoods = () => {
    const foods = useLoaderData()
    // console.log(foods)
    return (
        <div >
            <div className="text-center mb-10 mt-10">
                <h1 className="text-3xl md:text-4xl font-bold text-base-content mb-3">
                    🍱 Available Foods for Donation
                </h1>
                <p className="text-base-content/70 max-w-2xl mx-auto text-sm md:text-base">
                    Explore the list of available food items donated by kind-hearted individuals.  
                    You can request your desired meal before it expires. Let’s reduce food waste and help those in need.
                </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mt-10 mb-15'>
                {
                    foods.map(food => <FoodCard food={food} key={food._id}></FoodCard>)
                }
            </div>
            
             <div className='flex justify-center mb-15'>
                <Link to='/' className='btn bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold py-2.5  hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-md hover:shadow-lg hover:rounded-2xl'>Go Home</Link>
            </div>
        </div>
    );
};

export default AvailableFoods;