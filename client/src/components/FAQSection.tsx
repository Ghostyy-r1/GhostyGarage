
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { motion } from 'framer-motion';

export function FAQSection() {
  const faqs = [
    {
      question: "What is Ghosty's Garage?",
      answer: "Ghosty's Garage is a community platform for motorcycle enthusiasts to connect, share experiences, and grow together. We offer route planning, maintenance tracking, and community events."
    },
    {
      question: "Do I need to be an experienced rider to join?",
      answer: "Not at all! We welcome riders of all experience levels. Our community is built on mutual support and learning from each other."
    },
    {
      question: "How can I participate in community rides?",
      answer: "Community rides are regularly posted in our events calendar. Simply join our community, RSVP to an event, and show up ready to ride!"
    },
    {
      question: "Are there membership fees?",
      answer: "We offer both free and premium memberships. Free members get access to basic features, while premium members enjoy additional benefits like maintenance tracking and exclusive events."
    },
    {
      question: "How do I get help with motorcycle maintenance?",
      answer: "We offer maintenance guides, community forums, and workshops. Premium members also get access to our maintenance tracking tools and expert advice."
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-3xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-400">Find answers to common questions about Ghosty's Garage</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-gray-900/50 backdrop-blur-md rounded-xl border border-purple-600/20"
              >
                <AccordionTrigger className="px-6 text-white hover:text-purple-400">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 text-gray-300">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
