export default function Certifications() {
  const certifications = [
    {
      title: 'AWS Certified Solutions Architect',
      provider: 'Amazon Web Services',
      date: '2023',
      image: '/cert-neutral.svg',
    },
    {
      title: 'Google Cloud Professional Developer',
      provider: 'Google Cloud',
      date: '2022',
      image: '/cert-neutral.svg',
    },
    {
      title: 'Certified Scrum Master',
      provider: 'Scrum Alliance',
      date: '2021',
      image: '/cert-neutral.svg',
    },
  ];

  return (
    <section id="certifications" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-16">
          Professional Certifications
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert, index) => (
            <div key={index} className="glass p-6 rounded-lg hover:scale-105 transition-transform glow">
              <div className="w-full h-32 bg-gray-700 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-4xl">🏆</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{cert.title}</h3>
              <p className="text-gray-300 mb-1">{cert.provider}</p>
              <p className="text-gray-400 mb-4">{cert.date}</p>
              <button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2 rounded-full font-medium hover:from-purple-600 hover:to-blue-600 transition-all">
                View Certificate
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}