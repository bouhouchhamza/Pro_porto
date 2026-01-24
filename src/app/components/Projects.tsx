import Image from 'next/image';

export default function Projects() {
  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce solution with React, Node.js, and Stripe integration.',
      image: 'https://picsum.photos/400/250?random=1',
      link: '#',
    },
    {
      title: 'Task Management App',
      description: 'A collaborative task management tool built with Next.js and real-time updates.',
      image: 'https://picsum.photos/400/250?random=2',
      link: '#',
    },
    {
      title: 'Portfolio Website',
      description: 'A modern portfolio website showcasing projects and skills with animations.',
      image: 'https://picsum.photos/400/250?random=3',
      link: '#',
    },
  ];

  return (
    <section id="projects" className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-12">
          Some of My Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="glass p-6 rounded-lg overflow-hidden hover:scale-105 transition-transform glow">
              <Image
                src={project.image}
                alt={project.title}
                width={400}
                height={250}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
              <p className="text-gray-300 mb-4">{project.description}</p>
              <a
                href={project.link}
                className="text-purple-400 hover:text-purple-300 transition-colors"
              >
                Read more →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}