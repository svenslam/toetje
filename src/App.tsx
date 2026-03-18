import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Check, Utensils, MessageSquare, Calendar } from 'lucide-react';

const DESSERTS = [
  { id: 'vla', name: 'Vla met Slagroom', image: 'https://picsum.photos/seed/custard/400/600', description: 'De klassieke Nederlandse vla.' },
  { id: 'ijs', name: 'Ijs met Vruchtjes', image: 'https://picsum.photos/seed/sorbet/400/600', description: 'Heerlijk verfrissend ijs.' },
  { id: 'fruit', name: 'Vers Fruit', image: 'https://picsum.photos/seed/berries/400/600', description: 'Gezond en lekker van het seizoen.' },
  { id: 'pudding', name: "Opa's zelfgemaakt toetje", image: 'https://picsum.photos/seed/homemade/400/600', description: "Opa's specialiteit." },
];

export default function App() {
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [customSuggestion, setCustomSuggestion] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('dessertPreference');
    if (saved) setSelected(saved);
  }, []);

  const handleSelect = (id: string) => {
    setSelected(id);
    localStorage.setItem('dessertPreference', id);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen px-6 py-12 max-w-4xl mx-auto">
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-olive text-white rounded-full mb-6">
          <Utensils size={32} />
        </div>
        <h1 className="text-5xl md:text-6xl font-serif font-light mb-4 tracking-tight">
          Toetje bij Opa Gerard
        </h1>
        <div className="flex items-center justify-center gap-2 text-brand-olive/70 font-sans text-sm uppercase tracking-widest font-medium">
          <Calendar size={14} />
          <span>Elke Dinsdagavond</span>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="space-y-16">
        {/* Selection Grid */}
        <section>
          <h2 className="text-2xl font-serif italic mb-8 text-center opacity-80">
            Waar heb je deze week zin in?
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {DESSERTS.map((dessert, index) => (
              <motion.button
                key={dessert.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleSelect(dessert.id)}
                className={`group relative flex flex-col items-center text-center focus:outline-none`}
              >
                <div className={`relative mb-4 transition-transform duration-500 group-hover:scale-105 ${selected === dessert.id ? 'ring-4 ring-brand-olive ring-offset-4 rounded-full' : ''}`}>
                  <img 
                    src={dessert.image} 
                    alt={dessert.name}
                    className="pill-image w-full max-w-[150px]"
                    referrerPolicy="no-referrer"
                  />
                  {selected === dessert.id && (
                    <div className="absolute inset-0 bg-brand-olive/20 rounded-full flex items-center justify-center">
                      <div className="bg-brand-olive text-white p-2 rounded-full shadow-lg">
                        <Check size={20} />
                      </div>
                    </div>
                  )}
                </div>
                <span className="font-serif text-lg font-medium">{dessert.name}</span>
                <span className="font-sans text-xs opacity-50 mt-1">{dessert.description}</span>
              </motion.button>
            ))}
          </div>
        </section>

        {/* Custom Suggestion */}
        <section className="card p-8 md:p-12 max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <MessageSquare className="text-brand-olive" size={24} />
            <h3 className="text-2xl font-serif">Iets anders in gedachten?</h3>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <textarea
                value={customSuggestion}
                onChange={(e) => setCustomSuggestion(e.target.value)}
                placeholder="Laat opa weten wat je lekker vindt..."
                className="w-full bg-brand-cream/50 border-none rounded-2xl p-4 font-sans focus:ring-2 focus:ring-brand-olive/20 min-h-[100px] resize-none"
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={!customSuggestion && !selected}
                className="olive-button bg-brand-olive text-white px-10 py-4 rounded-full font-sans font-medium tracking-wide hover:opacity-90 transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {submitted ? (
                  <>
                    <Check size={18} />
                    <span>Verzonden!</span>
                  </>
                ) : (
                  <>
                    <Heart size={18} />
                    <span>Voorkeur Doorgeven</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-24 pt-12 border-t border-brand-olive/10 text-center">
        <p className="font-serif italic opacity-40 text-sm">
          "Eten bij opa is altijd een feestje."
        </p>
      </footer>

      {/* Success Notification */}
      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-brand-ink text-white px-6 py-3 rounded-full shadow-2xl font-sans text-sm z-50"
          >
            Bedankt! Opa Gerard heeft je voorkeur ontvangen.
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
