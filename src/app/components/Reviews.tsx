export default function Reviews() {
  const reviews = [
    {
      name: 'Alice Johnson',
      role: 'Product Manager',
      avatar: '/avatar-1.png',
      rating: 5,
      text: 'Exceptional work! Delivered the project on time with outstanding quality.',
    },
    {
      name: 'Bob Smith',
      role: 'CEO',
      avatar: '/avatar-2.png',
      rating: 5,
      text: 'Highly professional and skilled developer. Would recommend to anyone.',
    },
    {
      name: 'Carol Davis',
      role: 'Designer',
      avatar: '/avatar-3.png',
      rating: 5,
      text: 'Great collaboration and amazing attention to detail.',
    },
  ];

  return (
    <section id="reviews" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-16">
          Reviews
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div key={index} className="glass review-card p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-600 rounded-full mr-4 flex items-center justify-center">
                  <span className="text-xl">👤</span>
                </div>
                <div>
                  <h4 className="text-white font-semibold">{review.name}</h4>
                  <p className="text-gray-400 text-sm">{review.role}</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400">★</span>
                ))}
              </div>
              <p className="text-gray-300">{review.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}