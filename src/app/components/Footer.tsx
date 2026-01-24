export default function Footer() {
  return (
    <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <p className="text-gray-400 text-sm">
          © 2024 John Doe. All rights reserved.
        </p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            <span className="text-xl">🐙</span>
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            <span className="text-xl">💼</span>
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            <span className="text-xl">📧</span>
          </a>
        </div>
      </div>
    </footer>
  );
}