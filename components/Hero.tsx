"use client";

import Image from "next/image"
import { CustomButton } from "."

const Hero = () => {
    const handleScroll = () => {
        const nextSection = document.getElementById("discover");

        if (nextSection) {
          nextSection.scrollIntoView({ behavior: "smooth" });
        }
    }

    return (
        <div className="hero">
            <div className="flex-1 pt-36 padding-x">
                <h1 className="hero__title">
                    Explore the Ultimate Pokémon Library
                </h1>

                <p className="hero__subtitle">
                    Discover, Search, and Dive into the Fascinating Details of Every Pokémon
                </p>

                <CustomButton 
                    title="Explore Library"
                    containerStyles="bg-primary-blue
                    text-white rounded-full mt-10"
                    handleClick={handleScroll}
                />
            </div>
            <div className="hero__image-container">
                <div className="hero__image">
                    <Image src="/hero-poke-logo.png" alt="hero" fill className="object-contain" />
                </div>  
                  
                <div className="hero__image-overlay" />
            </div>
        </div>
    )
}

export default Hero