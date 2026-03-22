import React, { useState } from 'react';
import { motion } from 'framer-motion';
import RotatingText from '../ui/RotatingText';

const Home = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const bgColors = ["bg-cyan-300", "bg-emerald-300", "bg-indigo-300", "bg-purple-300"];

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <h1 className="text-4xl font-bold flex items-center gap-2">
                <motion.span
                    layout
                    layoutDependency={currentIndex}
                    transition={{
                        backgroundColor: { duration: 0.8 },
                        layout: { type: 'spring', damping: 25, stiffness: 120, mass: 1 }
                    }}
                    className={`px-2 sm:px-2 md:px-3 text-black overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg inline-flex shadow-md whitespace-nowrap transition-colors duration-500 ${bgColors[currentIndex]}`}
                >
                    <RotatingText
                        texts={['React', 'Bits', 'Is', 'Cool!']}
                        staggerFrom={"first"}
                        initial={{ y: "-100%", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: "100%", opacity: 0 }}
                        staggerDuration={0.04}
                        splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                        transition={{ type: "spring", damping: 25, stiffness: 150 }}
                        rotationInterval={3000}
                        onNext={(index) => setCurrentIndex(index)}
                        animatePresenceMode="popLayout"
                    />
                </motion.span>
            </h1>
        </div>
    );
}

export default Home;