export default function Skills() {
  const skills = [
    {
      title: 'Frontend',
      technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
      icon: '🎨',
    },
    {
      title: 'Backend',
      technologies: ['Node.js', 'Express', 'Python', 'PostgreSQL'],
      icon: '⚙️',
    },
    {
      title: 'Full Stack',
      technologies: ['MERN', 'MEAN', 'Serverless', 'GraphQL'],
      icon: '🚀',
    },
    {
      title: 'CMS',
      technologies: ['WordPress', 'Strapi', 'Contentful', 'Sanity'],
      icon: '📝',
    },
    {
      title: 'Database',
      technologies: ['MongoDB', 'MySQL', 'Redis', 'Firebase'],
      icon: '🗄️',
    },
    {
      title: 'Project Management',
      technologies: ['Agile', 'Scrum', 'Jira', 'Git'],
      icon: '📊',
    },
  ];

  return (
    <section id="skills" className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-12">
          Skills & Expertise
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <div key={index} className="glass skill-item p-6 rounded-lg hover:scale-105 transition-transform glow">
              <div className="text-4xl mb-4">{skill.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-4">{skill.title}</h3>
              <ul className="text-gray-300">
                {skill.technologies.map((tech, i) => (
                  <li key={i} className="mb-1">• {tech}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}