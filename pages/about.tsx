import React from 'react';
import Navbar from '../components/NavbarLogo';

const About = () => {
  return (
    <>
    < Navbar />
    <section className="bg-white py-16 px-8">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-gray-900 mb-8">About Uitvaart Centrum Nederland</h2>
        <p className="text-2xl text-gray-700 leading-relaxed mb-6">
          At <strong>Uitvaart Centrum Nederland</strong>, we understand that planning a funeral is an emotional and often overwhelming process. In these difficult times, making informed decisions can feel challenging, and that’s where we come in. Our mission is to support you by providing a transparent and easy-to-use platform to find the right funeral director that meets your needs and expectations.
        </p>

        <p className="text-2xl text-gray-700 leading-relaxed mb-6">
          We offer an independent service that allows you to compare funeral directors based on key factors such as price, location, and the specific services they offer. By doing this, we empower you to make a well-considered choice that aligns with your personal wishes and budget. Whether you’re looking for a traditional service or something more modern, our platform ensures that you have the information you need to make the right decision.
        </p>

        <p className="text-2xl text-gray-700 leading-relaxed mb-6">
          Transparency and objectivity are our top priorities. We believe that you deserve clear and unbiased information, free from pressure or influence. Our platform is designed to provide you with the peace of mind that comes from knowing you’re making an informed choice based on your preferences.
        </p>

        <p className="text-2xl text-gray-700 leading-relaxed mb-6">
          We are committed to offering a reliable and compassionate resource that helps ease the burden during an already challenging time. Whether you’re planning ahead or need immediate assistance, <strong>Uitvaart Centrum Nederland</strong> is here to guide you through the process with care, clarity, and professionalism.
        </p>

        <p className="text-2xl text-gray-700 leading-relaxed">
          Your needs come first, and we are dedicated to making this difficult process as straightforward and stress-free as possible.
        </p>
      </div>
    </section>
    </>
  );
};

export default About;
