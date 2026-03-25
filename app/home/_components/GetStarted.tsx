import React from 'react'
import { Button } from '../../ui/Button'

export function GetStarted() {
    return (
        <div className="flex flex-col items-center space-y-8 md:space-y-12 my-8 md:my-12 px-4">
            <p className="max-w-xl text-gray-500 text-base sm:text-lg md:text-2xl leading-relaxed font-medium">
                All things about <span className="text-black font-bold">digital technology</span> and <span className="text-[#4F46E5] font-serif italic">art.</span>
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full sm:w-auto">
                <Button variant="primary" size="lg" className="bg-black text-white hover:bg-zinc-800 uppercase tracking-widest text-[10px] md:text-xs font-black px-8 md:px-10 py-3 md:py-4 shadow-xl w-full sm:w-auto">
                    Get started
                </Button>
                <Button variant="ghost" size="md" className="font-bold text-gray-400 hover:text-black hover:bg-transparent underline underline-offset-8 decoration-2 flex items-center gap-2 group py-2">
                    Contact us
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </Button>
            </div>
        </div>
    );
}

export default GetStarted;