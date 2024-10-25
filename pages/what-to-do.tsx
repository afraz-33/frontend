import Image from "next/image";
import React from "react";
import Navbar from "../components/NavbarLogo"; // Assuming you have a Navbar
import '../src/app/what-to-do.css'
const WhatToDo = () => {
  return (
    <>
      <Navbar />

      {/* Hero Image Section */}
      <section className="relative -mt-1"> {/* Remove the space between navbar and image */}
        <Image
          src="/6.jpeg" // Replace this with the actual image path
          alt="Flowers background"
          layout="responsive"
          width={1920}
          height={400} // Set the height to reduce the size of the image
          objectFit="cover" // Ensures the image covers the container proportionally
        />
      </section> 

      {/* Main Content */}
      <section className="py-12 px-4 lg:px-24">
        <h1 className="text-3xl font-bold text-center mb-8">
          What to do when your loved one dies
        </h1>
        <hr />
        <br />

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-blue-100 p-20 rounded-3xl shadow-lg">
            <h2 className="text-3xl font-semibold text-center mb-4">
              Step 1: Contact your GP
            </h2>
            <p className="text-xl text-center text-gray-700">
              Have the GP come as soon as <br /> possible to officially establish the
              death. <br/> This is an important first step to set everything in
              motion.
            </p>
          </div>

          <div className="bg-blue-50 p-20 rounded-3xl shadow-lg">
            <h2 className="text-3xl font-semibold text-center mb-4">
              Step 2: Inform the funeral director
            </h2>
            <p className="text-xl text-center text-gray-700">
              Contact the funeral director of your <br /> choice.They will guide you
              further in this process <br /> and help you arrange all the details.
            </p>
          </div>

          <div className="bg-blue-50 p-20 rounded-3xl shadow-lg">
            <h2 className="text-3xl font-semibold text-center mb-4">
              Step 3: Collect important documents
            </h2>
            <p className="text-xl text-center text-gray-700">
              Make sure you have documents such as <br /> the will and insurance papers
              to hand. <br /> This will help with smooth preparations.
            </p>
          </div>

          <div className="bg-blue-100 p-20 rounded-3xl shadow-lg">
            <h2 className="text-3xl font-semibold text-center mb-4">
              Step 4: Inform family and friends
            </h2>
            <p className="text-xl text-center text-gray-700">
              Take time to inform loved ones of the death. <br /> You can also ask for
              help from the funeral director  <br /> to do this in a respectful manner.
            </p>
          </div>
        </div>
      </section>
      <section className="py-12 bg-white px-4">
      <div className="container mx-auto">
        {/* Rest and Care after the farewell */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Rest and Care after the farewell
          </h3>
          <p className="text-gray-700 leading-relaxed mb-6">
            After the loss of a loved one, it is important to arrange everything calmly and step by step.
            Here is a gentle and clear guide to what you can do after the funeral or cremation:
          </p>
          <ul className="list-decimal list-inside text-gray-700 leading-relaxed mb-6">
            <li>
              <strong>Thank you people:</strong> Send a card or message to thank everyone who offered support.
            </li>
            <li>
              <strong>Arrange paperwork:</strong> Consider cancelling subscriptions, informing banks, and dealing with inheritance.
            </li>
            <li>
              <strong>Process your grief:</strong> Take time to grieve. Seek support from family, friends, or a grief counsellor.
            </li>
            <li>
              <strong>Commemorate your loved one:</strong> Plan moments to come together to remember your loved one, for example on the anniversary or death anniversary.
            </li>
          </ul>
          <p className="text-gray-700 leading-relaxed">
            These steps will help you navigate through this difficult period in a calm manner.
          </p>
        </div>
        <hr />
        <br />
        {/* Funeral Insurance Section */}
        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Your Funeral Care properly arranged: Everything you need to know about Funeral Insurance
          </h3>
          <h4 className="text-xl font-semibold text-gray-800 mb-4">
            What is funeral insurance?
          </h4>
          <p className="text-gray-700 leading-relaxed mb-6">
            Funeral insurance is a financial provision that covers the cost of your funeral so that your loved ones do not face unexpected expenses. By paying a monthly or annual premium, you ensure that your funeral is arranged according to your wishes, without financial pressure on your loved ones.
          </p>

          <h4 className="text-xl font-semibold text-gray-800 mb-4">
            Types of funeral insurance
          </h4>
          <ul className="list-decimal list-inside text-gray-700 leading-relaxed mb-6">
            <li>
              <strong>Capital insurance:</strong> Upon death, your next of kin will receive an agreed amount of money. This amount can be used for the funeral but offers flexibility to spend the money as they wish. However, this requires them to organize the funeral themselves.
            </li>
            <li>
              <strong>Natura insurance:</strong> Instead of paying out money, this insurance ensures that the cost of the funeral is covered. The insurer arranges the main parts of the funeral, such as the coffin, funeral transport, and the ceremony. This offers less flexibility but takes a lot of worry away from your next of kin.
            </li>
            <li>
              <strong>Combination insurance:</strong> This policy combines the advantages of capital and in-kind insurance. Part of the funeral costs are covered directly by the insurer, while another part is paid as a cash sum to your next of kin. This is useful for extra wishes that fall outside the standard package.
            </li>
          </ul>

          <h4 className="text-xl font-semibold text-gray-800 mb-4">
            Important: Even if you have insurance, choose your own funeral director
          </h4>
          <p className="text-gray-700 leading-relaxed">
          It is essential to know that while funeral insurance covers the costs, you or your next of kin must choose a funeral
        director yourself. This means that even though the financial side is settled, the organisation and execution of the
        funeral must be done by a chosen funeral director. By thinking about this in advance and possibly already making a
        choice, you can save your next of kin a lot of worry during a difficult time.
          </p>
          <br />
          <h4 className="text-xl font-semibold text-gray-800 mb-4">
          What happens if you do not have funeral insurance?
          </h4>
          <p className="text-gray-700 leading-relaxed">
          If you do not have funeral insurance, your next of kin will have to bear the full cost of your funeral. A funeral can
        range from €7,000 to €10,000, depending on the choices made. Without insurance, these costs have to be paid from your
        own resources or inheritance, which can be a big financial burden for many families. <br /> <br />In addition to the financial worries, your next of kin will also have to deal with all the practical matters. This can be
        overwhelming, especially during an emotional time. Without clear guidelines or insurance, organising the funeral can
        become an arduous task. Funeral insurance not only provides financial security, but also ensures that many
        organisational aspects of the funeral are already taken care of.
          </p>
          <br />
          <h4 className="text-xl font-semibold text-gray-800 mb-4">What to look out for when choosing funeral insurance?</h4>
          <p>
        When choosing a funeral insurance policy, it is important to pay attention to a few factors:
      </p> <br />
        <ul className="list-decimal list-inside text-gray-700 leading-relaxed mb-6">
          <li><strong>Coverage:</strong> What costs and services are covered? This can range from basic provisions such as the coffin
          and funeral transport to more elaborate options such as flowers, music, and catering.</li>
          <li><strong>Contribution:</strong> How much do you have to pay and for how long?The premium often depends on your age,
          health, and the coverage chosen. The younger you are when you take out your policy, the lower the premium is usually.</li>
          <li><strong>Flexibility:</strong> Can you adjust the insurance if your wishes or circumstances change? Some insurance
          policies allow you to make interim changes, for example when you move house or change funeral wishes.</li>
          <li><strong>Exclusions:</strong> What is not covered? It is important to read the small print to avoid any costs that are
          not covered at the time the insurance is triggered.</li>
        </ul>
        <h4 className="text-xl font-semibold text-gray-800 mb-4">Benefits of funeral insurance</h4>
          <p>
          Funeral insurance offers several benefits:
      </p> <br />
      <ul className="list-decimal list-inside text-gray-700 leading-relaxed mb-6">
      <li>
          <strong>Financial peace:</strong> Your next of kin need not worry about the cost of your funeral.
        </li>
        <li>
          <strong>Security:</strong> Your funeral wishes will be carried out as you wish, without burdening your loved ones with
          difficult choices.
        </li>
        <li>
          <strong>Convenience:</strong> The funeral director takes care of the organisation, relieving your family during a
          difficult period.
        </li>
        </ul>
        <h4 className="text-xl font-semibold text-gray-800 mb-4">When to close?</h4>
        <p>
        It is wise to take out funeral insurance at a younger age, as the premiums will be lower. However, even later in life,
        taking out insurance can still be a good option to ensure that your next of kin are not left with financial worries.
      </p> <br />
      <h4 className="text-xl font-semibold text-gray-800 mb-4">What to do in case of death?</h4>
      <p>
        When an insured person dies, the next of kin contact the funeral insurer. The insurer helps them arrange the funeral
        according to the policy terms and ensures that everything goes according to plan. This takes a lot of organisational
        pressure off the shoulders of the bereaved, allowing them to focus on saying goodbye.
      </p>
      <br />
      <p>
        Funeral insurance is therefore a valuable investment in the future. It offers financial security, relieves your next of
        kin, and ensures that your funeral is carried out according to your wishes. Taking out funeral insurance is an important
        step to ensure that everything is well arranged when the time comes.
      </p>
        </div>
      </div>
    </section>
  
    </>
  );
};

export default WhatToDo;
