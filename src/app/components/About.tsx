import TypingCodeCard from './TypingCodeCard';

export default function About() {
  return (
    <section id="about" className="about-section py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-12">
          About Me
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="about-content">
            <p className="text-lg text-gray-300 mb-6">
              I'm a passionate Full Stack Developer with over 5 years of experience in creating
              innovative web applications. My journey started with a curiosity about technology
              and has evolved into a career dedicated to building solutions that make a difference.
            </p>
            <p className="text-lg text-gray-300 mb-6">
              I specialize in modern web technologies, from responsive front-end designs to
              scalable back-end architectures. When I'm not coding, you can find me exploring
              new technologies, contributing to open-source projects, or sharing knowledge
              with the developer community.
            </p>
            <p className="text-lg text-gray-300">
              Let's collaborate and bring your ideas to life!
            </p>
          </div>
          <div className="glass p-6 rounded-lg">
            <pre className="text-sm text-green-400 font-mono">
              <code>{`const developer = {
  name: "John Doe",
  role: "Full Stack Developer",
  skills: ["React", "Node.js", "TypeScript"],
  experience: "5+ years",
  passion: "Building amazing web experiences"
};

export default developer;`}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}