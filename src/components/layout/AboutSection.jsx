const AboutSection = () => {
  return (
    <div className="mt-16 bg-gray-50 py-16 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl font-semibold text-gray-800">
          About Vaisaati
        </h2>

        <p className="mt-6 text-gray-600 leading-relaxed">
          Vaisaati helps users quickly identify medicines by scanning or searching.
          It provides detailed composition, usage, and safety information in a
          simple chat-style interface.
        </p>

        <p className="mt-4 text-gray-600 leading-relaxed">
          Whether you want to verify a medicine strip or understand its purpose,
          Vaisaati makes medical information accessible and easy to understand.
        </p>

        <p className="mt-6 text-xs text-gray-500">
          Disclaimer: This platform provides informational content only and is not
          a substitute for professional medical advice.
        </p>
      </div>
    </div>
  );
};

export default AboutSection;