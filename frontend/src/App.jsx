import React, { useState } from 'react';
import { generateExplanation } from './services/api';
import { Brain, Sparkles, GraduationCap, Microscope, Loader2 } from 'lucide-react';

function App() {
  const [topic, setTopic] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!topic) return;

    setLoading(true);
    setError("");
    setData(null);

    try {
      const res = await generateExplanation(topic);

      console.log("API RESPONSE:", res.data); // 🔍 debug

      // ✅ FIXED HERE (no .explanations)
      setData(res.data);

    } catch (err) {
      console.error(err);
      setError("❌ Failed to connect to AI backend");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      
      {/* Header */}
      <header className="bg-white border-b py-6 px-4">
        <div className="max-w-5xl mx-auto flex items-center gap-2">
          <Brain className="text-indigo-600 w-8 h-8" />
          <h1 className="text-2xl font-bold tracking-tight">
            Lumina <span className="text-indigo-600">AI</span>
          </h1>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-6">

        {/* Hero */}
        <div className="text-center my-12">
          <h2 className="text-4xl font-extrabold mb-4">
            Learn Anything, Instantly.
          </h2>
          <p className="text-slate-600 text-lg">
            Enter a complex topic and get explanations for every level of understanding.
          </p>
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mb-10">
          <div className="relative group">
            <input
              type="text"
              placeholder="e.g. Quantum Physics, Photosynthesis, Blockchain..."
              className="w-full p-5 pl-6 pr-32 text-lg rounded-2xl border-2 border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all shadow-sm"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />

            <button
              type="submit"
              disabled={loading}
              className="absolute right-2 top-2 bottom-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 rounded-xl font-semibold flex items-center gap-2 transition-colors disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="animate-spin w-5 h-5" />
              ) : (
                <Sparkles className="w-5 h-5" />
              )}
              {loading ? 'Thinking...' : 'Explain'}
            </button>
          </div>
        </form>

        {/* Error */}
        {error && (
          <div className="text-center text-red-500 font-semibold mb-6">
            {error}
          </div>
        )}

        {/* Results */}
        {data && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            {/* Child */}
            <div className="bg-white p-6 rounded-3xl shadow-md border-t-8 border-yellow-400">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-yellow-100 rounded-lg text-yellow-600">
                  <Sparkles size={20} />
                </div>
                <h3 className="font-bold text-xl text-slate-800">5-Year Old</h3>
              </div>
              <p className="text-slate-600 italic">"{data.child}"</p>
            </div>

            {/* Student */}
            <div className="bg-white p-6 rounded-3xl shadow-md border-t-8 border-blue-500">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                  <GraduationCap size={20} />
                </div>
                <h3 className="font-bold text-xl text-slate-800">High School</h3>
              </div>
              <p className="text-slate-600">{data.student}</p>
            </div>

            {/* Expert */}
            <div className="bg-white p-6 rounded-3xl shadow-md border-t-8 border-indigo-600">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
                  <Microscope size={20} />
                </div>
                <h3 className="font-bold text-xl text-slate-800">Expert</h3>
              </div>
              <p className="text-slate-700 font-medium">{data.expert}</p>
            </div>

          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="text-center text-slate-400 text-sm mt-20 pb-10">
        <p>© Dipankar Mandal 2026 | AI Powered Subject Explainer</p>
      </footer>
    </div>
  );
}

export default App;