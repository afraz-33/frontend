import Image from "next/image";
import '../src/app/globals.css'
import Navbar from '../components/NavbarLogo';
import Link from 'next/link';

const styles = {
    container: 'container mx-auto px-4 py-8',
    title: 'text-3xl font-bold mb-4',
    author: 'text-sm text-gray-500 mb-6',
    imageWrapper: 'mb-6',
    image: 'rounded-md',
    text: 'text-lg mb-4',
    subheading: 'text-2xl font-semibold mb-4',
    subSubheading: 'text-xl font-semibold mb-4',
    list: 'list-disc ml-8 mb-8',
  };
const BlogSection = () => {
  return (
    <>
    <Navbar/>
    <section className="bg-white py-12">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">
          Blogs, stories, tips and information
        </h2>

        {/* Blog 1 - Natural Burial */}
        <div className="flex flex-col md:flex-row items-start">
          {/* Text Section */}
          <div className="md:w-2/3">
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">
              Natural burial, back to nature
            </h3>
            <p className="text-sm text-gray-500 mb-4">Door: Madelief | 01/09/2024 | 2 minuten lezen</p>

            <p className="text-lg text-gray-800 mb-4">
              More and more people are choosing natural burial as their final
              resting place. Natural burial is a sustainable and environmentally
              friendly way of burial that literally returns to nature. In this
              article, we explain exactly what natural burial entails, why it is
              becoming increasingly popular, and what the benefits are for both
              the environment and the bereaved.
            </p>

            <h4 className="text-xl font-semibold text-gray-700 mb-2">
              What is natural burial?
            </h4>
            <p className="text-lg text-gray-800 mb-4">
              Natural burial involves burying a body in a natural way, without
              the use of, for example, a headstone or concrete. The graves are
              in a natural environment such as a forest or moorland, and are
              not marked with a headstone, but sometimes with a tree or shrub.
            </p>

            <h4 className="text-xl font-semibold text-gray-700 mb-2">
              Why choose natural burial?
            </h4>
            <ul className="list-disc pl-5 text-lg text-gray-800 mb-4">
              <li>Sustainability: It is an eco-friendly alternative to traditional burials.</li>
              <li>
                Calm, natural environment: Next of kin can find comfort in the serene surroundings of nature.
              </li>
              <li>Simple and pure: The focus is on the natural process of life and death.</li>
            </ul>

            <h4 className="text-xl font-semibold text-gray-700 mb-2">How it works</h4>
            <p className="text-lg text-gray-800 mb-4">
              Natural burial uses biodegradable materials, and graves are often
              carefully maintained by nature organisations. It provides a place
              where nature takes over and where the deceased merges into the
              cycle of life.
            </p>
          </div>

          {/* Image Section */}
          <div className="md:w-1/3 md:ml-8 mt-8 md:mt-0">
            <Image
              src="/5.png" // Make sure the image is placed in the /public directory
              alt="Natural burial scenery"
              width={500}
              height={400}
              className="rounded-lg"
              objectFit="cover"
            />
          </div>
        </div>
        <br />
        <hr />
        <br />
        <br />
        {/* Blog 2 - Digital Legacy */}
        <div className="mb-12">
          <div className="w-full flex justify-center">
            <div className="w-full">
              <Image 
                src="/6.jpeg" 
                alt="Digital legacy" 
                width={1200} 
                height={400} 
                className="object-cover mx-auto" 
              />
            </div>
          </div>
          <br />
          <div className="flex md:flex-row">
            <div className="w-full">
              <h3 className="text-2xl font-bold mb-2">Digital legacy: take care of your online legacy</h3>
              <p className="text-sm text-gray-600 mb-2">Door: Madelief | 03/09/2024 | 2 minuten lezen</p>
              <p className="text-lg text-gray-800 leading-relaxed mb-4">
                In our modern world, much of our lives take place online. From social media to email accounts and online
                subscriptions, your digital legacy can be a large and important part of your legacy. But what happens to all that
                data when you are no longer around? In this article, we discuss how to manage your digital legacy, and provide
                tips to ensure that your online accounts and data are closed in a respectful manner.
              </p>

              <h4 className="text-xl font-bold mb-2">What is a digital legacy?</h4>
              <p className="text-lg  text-gray-800 leading-relaxed mb-4">
                A digital legacy refers to all the online data and accounts a person leaves behind after death. This can range
                from Facebook and Instagram, to bank accounts, subscriptions to streaming services and even cryptocurrency.
              </p>

              <h4 className="text-xl font-bold mb-2">Why is it important to sort out your digital legacy?</h4>
              <p className=" text-lg text-gray-800 leading-relaxed mb-4">
                Failing to arrange your digital legacy can lead to inconveniences for relatives. Accounts can be hacked, sensitive
                information can fall into the wrong hands, or family members are left wondering how to manage certain
                accounts.
              </p>

              <h4 className="text-xl font-bold mb-2">Tips on setting your digital estate:</h4>
              <ul className="text-lg list-disc list-inside mb-4 text-gray-800">
                <li>Make a list of all your online accounts and keep them in a safe place.</li>
                <li>Draw up clear instructions for your next of kin.</li>
                <li>Consider drafting a digital will with a professional service.</li>
              </ul>
            </div>
          </div>
        </div>
        <hr />
        <br />
        {/* Blog 3 - Eternal Reefs */}
        <div className="flex flex-col md:flex-row md:space-x-8 md:items-start">
          {/* Text container */}
          <div className="md:w-2/3">
          <h2 className="text-2xl font-bold mb-2">Eternal reefs: turn your loved one's ashes into a living memorial</h2>
        <p className="text-sm text-gray-600 mb-4">Door: Madelief | 29/08/2024 | 2 minuten lezen</p>
            <p className="text-lg  text-gray-800 mb-4">
              A special way to commemorate a loved one is by incorporating their ashes into an Eternal Reef, a living memorial in the ocean. In this article, we tell you what Eternal Reefs are and how this eco-friendly choice can create a beautiful, lasting memory.
            </p>
            <h3 className="text-xl font-bold mb-2">What are Eternal Reefs?</h3>
            <p className="text-lg  text-gray-800 mb-4">
              Eternal Reefs are concrete structures designed to support coral reefs. Mixing your loved one’s ashes with the concrete creates a unique memorial that contributes to ocean restoration.
            </p>
            <h3 className="text-xl  font-bold mb-2">Why choose an Eternal Reef?</h3>
            <ul className="text-lg  list-disc pl-5 text-gray-800 mb-4">
              <li>Environmentally friendly: It helps nature by supporting the recovery of coral reefs.</li>
              <li>Unique memorial: Instead of a traditional urn or grave, your loved one gets a lasting place in nature.</li>
              <li>Special ceremony: Families can participate in the placement of the Eternal Reef in the ocean.</li>
            </ul>
            <h3 className="text-xl font-bold mb-2">How does it work?</h3>
            <p className="text-lg text-gray-800">
              After cremation, some of the ashes are mixed with a special concrete mix. This forms the basis for a reef structure to be placed in the ocean, where it serves as a habitat for marine animals.
            </p>
          </div>

          {/* Image Section */}
          <div className="md:w-1/3 md:ml-8 mt-8 md:mt-0">
            <Image
              src="/4.png"
              alt="Eternal Reefs"
              width={800}
              height={800}
              className="object-cover rounded-lg"
            />
          </div>
        </div>
        <br />
    <hr />
      </div>
    </section>
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">
        The most special places you might not have thought of to say goodbye to
      </h1>
      <p className="text-sm text-gray-500 mb-6">
        Door: Madelief | 25/08/2024 <br />
        6 minuten lezen
      </p>

      {/* Flexbox layout to position the image and text side by side */}
      <div className="flex flex-col md:flex-row items-start gap-8 mb-8">
        {/* Image Section */}
        <div className="w-full md:w-1/2">
          <Image
            src="/6.jpeg" // Add your image path
            alt="Funeral Location"
            width={700}
            height={200}
            className="rounded-md"
          />
        </div>

        {/* Text Section */}
        <div className="md:w-1/2">
          <p className="text-gray-800 text-lg mb-4">
            Saying goodbye to a loved one is one of the most emotional and memorable moments in our lives. It is not only an
            opportunity to mourn, but also a chance to reflect on the life of the deceased and cherish what he or she has left
            behind. A well-chosen location can enrich this experience and help to say goodbye in a meaningful way. While traditional
            funeral locations such as churches and cemeteries are still the norm, more and more people are opting for unique and
            personal places that reflect the bond with their loved one.
          </p>
          <p className="text-gray-800 text-lg">
            In this article, we share some unusual and less traditional funeral locations that you may not have considered yet, but
            which can give the ceremony a special and unforgettable atmosphere.
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-4">1. On the beach: Peace and serenity by the sea</h2>
      <p className="text-gray-800 text-lg mb-4">
        A funeral by the sea offers a serene and comforting environment, where the sound of the waves and the fresh sea air help
        to say goodbye in harmony. The beach is not only a symbolic place of peace and surrender, but also of continuity, as the
        water is always moving. This location can provide a comforting setting for families who want to emphasise the cyclical
        nature of life.
      </p>
      <p className="text-gray-800 text-lg mb-8">
        With a beach funeral, you can opt for an intimate ceremony at sunset, where nature provides the backdrop. Next of kin can
        throw flowers or shells into the water as a final tribute, or scatter the deceased's ashes in the sea, which often offers
        a sense of connection with nature.
      </p>

      <h3 className="text-xl font-semibold mb-4">Why choose a beach cruise?</h3>
      <ul className="list-disc ml-8 mb-8">
        <li className="text-gray-800 mb-2">Soothing sounds of nature, like the rushing of the waves.</li>
        <li className="text-gray-800 mb-2">It symbolises eternity and oneness with nature.</li>
        <li className="text-gray-800 mb-2">The freedom to hold a ceremony in the open air, with the opportunity to add personal touches.</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4">2. In the mountains: Natural beauty and highlights of life</h2>
      <p className="text-gray-800 text-lg mb-4">
        For nature lovers or adventurers, a funeral in the mountains can be a beautiful and symbolic way to say goodbye. Mountains
        often symbolise strength, determination and overcoming challenges, which can make it a meaningful place to pay final
        respects to a loved one.
      </p>
      <p className="text-gray-800 text-lg mb-8">
        A ceremony in the mountains offers an intimate atmosphere, with nature as a witness. The sense of oneness with nature,
        fresh air and impressive views provide a moment of reflection and comfort. Next of kin can, for example, hike to a
        specific spot where the ceremony takes place, or leave flowers at a special peak as a tribute.
      </p>

      <h3 className="text-xl font-semibold mb-4">Why choose a funeral in the mountains?</h3>
      <ul className="list-disc ml-8 mb-8">
        <li className="text-gray-800 mb-2">The mountains provide a powerful and serene backdrop that offers solace and inspiration.</li>
        <li className="text-gray-800 mb-2">
          It is a perfect place for nature lovers or people who like to connect with the outdoors.
        </li>
        <li className="text-gray-800 mb-2">An impressive view can be a powerful reminder of the life of the deceased.</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4">3. On a boat: A floating memorial ceremony</h2>
      <p className="text-gray-800 text-lg mb-4">
        A funeral on a boat is a soothing way to say goodbye to a loved one, surrounded by water and nature. Whether you choose a
        trip on a river, a lake or even at sea, a boat provides an intimate setting for a ceremony that can be both symbolic and
        soothing.
      </p>
      <p className="text-gray-800 text-lg mb-8">
        During a funeral on a boat, bereaved families can scatter the ashes of the deceased on the water or float flowers in the
        water as a final tribute. It offers a unique experience that can be comforting due to the serenity of the water and the
        feeling of freedom.
      </p>
      <h2 className="text-2xl font-semibold mb-4">Why choose a funeral on a boat?</h2>
      <ul className="list-disc ml-8 mb-8">
        <li className="mb-2">The water symbolises letting go and the transition to another state of being.</li>
        <li className="mb-2">A boat ride can give a sense of connection with nature and freedom.</li>
        <li>The ceremony is intimate and can be fully tailored to personal wishes.</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4">Why choose a special location?</h2>
      <p className="text-lg mb-4">
        A funeral in a special location can be a powerful symbol of the deceased's life. By choosing a place that resonates with
        their personality, passions or lifestyle, you not only offer a respectful farewell, but also create an unforgettable
        memory for the bereaved. A personalised venue helps make the farewell more intimate and meaningful, and allows you to
        tailor the ceremony to the deceased's wishes and values.
      </p>
      <p className="text-lg mb-8">
        Whether you choose the tranquillity of nature, the splendour of a historic castle or the serenity of the water, a unique
        location makes it possible to organise a farewell that truly reflects who the deceased was and what he or she meant to
        you.
      </p>
    </div>

    <div className="container mx-auto px-4 py-8">
      <hr />
      <br />
      {/* Image Section */}
      <div className="w-full mb-6 flex justify-center">
        <Image
          src="/6.jpeg" // Add your image path
          alt="Celebrate Life"
          width={800}
          height={50}
          className="rounded-md"
        />
      </div>

      <h2 className="text-xl font-bold mb-2">
        Celebrate life your way: A personalised approach to saying goodbye
      </h2>
      <p className="text-sm text-gray-500 mb-4">Door: Madelief | 25/08/2024 <br /> 2 minuten lezen</p>

      <p className="text-lg mb-4">
        Saying goodbye to a loved one can be done in many different ways. Increasingly, people are choosing to celebrate the life
        of their loved one in a personal and unique way. In this article, we discuss options for a farewell that truly reflects
        who the deceased was, with a focus on personalisation.
      </p>
      <p className="text-lg">
        What does it mean to celebrate life? Instead of just focusing on the loss, a celebration of life can emphasise the
        beautiful moments that were shared. This can be done with music, photos, anecdotes and even a festive atmosphere.
      </p>
      <br />
      <button className="bg-blue-300 text-gray-900 px-4 py-2 rounded-lg font-semibold text-xl flex justify-center hover:bg-blue-200" style={{height:50,width:200}}>
        <Link href="/newblogs" legacyBehavior>
        <a >More on Blogs {`>>`}</a>
            </Link>
    </button>
    </div>
    </>
  );
};

export default BlogSection;

