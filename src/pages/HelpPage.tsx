import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Mail, Phone, MapPin, MessageSquare, AlertCircle } from 'lucide-react';

const faqs = [
  { q: 'How do I find previous year papers?', a: 'Navigate to the Papers section from the main menu, select your department and semester. You can filter by subject and exam type.' },
  { q: 'How do I bookmark resources?', a: 'Click the bookmark icon on any resource card. You can view all your saved items in the Bookmarks page.' },
  { q: 'How do I navigate the campus map?', a: 'Open the Campus Map page. You can drag to pan, scroll to zoom, and click on map markers to see details about specific locations.' },
  { q: 'How do I change my department preferences?', a: 'Go to your Profile or Settings page and update your default Academic Preferences.' },
  { q: 'Is my data stored securely?', a: 'Yes, this is a local application. All your preferences, bookmarks, and study plans are stored securely on your device.' },
  { q: 'How do I report incorrect information?', a: 'Use the "Report an issue" form at the bottom of this page or contact technical support.' },
  { q: 'Can I contribute resources?', a: 'Currently, resource addition is restricted to the Admin dashboard. You can contact administration to suggest additions.' },
  { q: 'How do I contact administration?', a: 'Please find the contact details in the section below.' }
];

const HelpPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-serif text-forest mb-4">Help & Support</h1>
        <p className="text-ink/70 max-w-xl mx-auto">Find answers to common questions or reach out to us for assistance.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-serif mb-6">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div key={index} className="card overflow-hidden">
                <button
                  className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span className="font-medium pr-4">{faq.q}</span>
                  <ChevronDown className={`transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`} size={20} />
                </button>
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-6 pb-4 text-ink/70"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="card p-6 bg-forest text-white">
            <h2 className="text-xl font-serif mb-4 flex items-center gap-2">
              <Phone size={20} /> Contact Us
            </h2>
            <div className="space-y-4 text-sm text-white/80">
              <div>
                <p className="font-medium text-white mb-1">Administration (Demo)</p>
                <p>+91 98765 43210</p>
                <p>admin@soit.edu</p>
              </div>
              <div className="pt-2 border-t border-white/20">
                <p className="font-medium text-white mb-1">Technical Support (Demo)</p>
                <p>support@campusly.dev</p>
              </div>
              <div className="pt-2 border-t border-white/20">
                <p className="font-medium text-white mb-1">Visit Us</p>
                <p className="flex items-start gap-2 mt-1">
                  <MapPin size={16} className="shrink-0 mt-0.5" />
                  <span>Main Block, Saint Oxford Institute of Technology Campus</span>
                </p>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <h2 className="text-xl font-serif mb-4 flex items-center gap-2">
              <MessageSquare size={20} className="text-mustard" /> Report an Issue
            </h2>
            <form className="space-y-4" onSubmit={e => e.preventDefault()}>
              <div>
                <label className="block text-sm font-medium mb-1">Type</label>
                <select className="input-field py-2 text-sm">
                  <option>Bug Report</option>
                  <option>Missing Content</option>
                  <option>Feature Request</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea 
                  className="input-field text-sm min-h-[100px] resize-none" 
                  placeholder="Please describe the issue in detail..."
                ></textarea>
              </div>
              <button className="btn-primary w-full justify-center text-sm">Submit Report</button>
              <p className="text-xs text-center text-ink/50 mt-2 flex items-center justify-center gap-1">
                <AlertCircle size={12} /> This is a demo form.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
