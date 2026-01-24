import PhysicsThreadQuote from './PhysicsThreadQuote';

export default function Quote() {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden min-h-[60vh]">
      <PhysicsThreadQuote 
        quote="The only way to do great work is to love what you do."
        author="Steve Jobs"
      />
    </section>
  );
}