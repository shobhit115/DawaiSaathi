import RecommendationCard from "./RecommendationCard";

const RecommendationSection = () => {
  const medicines = [
    {
      name: "Paracetamol 500mg",
      category: "Pain Relief",
      description: "Used to treat mild to moderate pain and fever."
    },
    {
      name: "Azithromycin",
      category: "Antibiotic",
      description: "Used to treat bacterial infections."
    },
    {
      name: "Cetirizine",
      category: "Allergy",
      description: "Used for allergy symptoms and cold."
    }
  ];

  return (
    <div className="mt-12 px-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Recommended Medicines
      </h2>

      <div className="flex gap-4 overflow-x-auto pb-4">
        {medicines.map((med, index) => (
          <RecommendationCard key={index} {...med} />
        ))}
      </div>
    </div>
  );
};

export default RecommendationSection;