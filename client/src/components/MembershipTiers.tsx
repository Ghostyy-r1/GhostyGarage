
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Star } from "lucide-react";

const tiers = [
  {
    name: "Basic",
    price: 9.99,
    description: "Essential features for motorcycle enthusiasts",
    features: [
      "Access to basic community features",
      "Monthly digital magazine",
      "Basic route planning tools",
      "10% discount on merchandise",
      "Community forum access"
    ],
    recommended: false,
    delay: 0.1
  },
  {
    name: "Pro",
    price: 19.99,
    description: "Advanced features for serious riders",
    features: [
      "All Basic features",
      "Priority customer support",
      "Advanced route planning",
      "20% discount on merchandise",
      "Exclusive monthly workshops",
      "Track day discounts",
      "Premium community badge"
    ],
    recommended: true,
    delay: 0.2
  },
  {
    name: "Elite",
    price: 39.99,
    description: "Ultimate experience for passionate motorcyclists",
    features: [
      "All Pro features",
      "24/7 premium support",
      "30% discount on merchandise",
      "VIP event access",
      "Custom route creation",
      "Personal riding coach",
      "Exclusive gear previews",
      "Free track day annually"
    ],
    recommended: false,
    delay: 0.3
  }
];

export function MembershipTiers() {
  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-white mb-4"
          >
            Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">Membership</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-gray-400 max-w-2xl mx-auto"
          >
            Join our community and unlock exclusive benefits designed for riders like you
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: tier.delay }}
              className="relative"
            >
              <Card className={`h-full bg-gradient-to-br from-gray-900 to-black border-purple-500/20 backdrop-blur-sm ${tier.recommended ? 'ring-2 ring-purple-500' : ''}`}>
                {tier.recommended && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                      <Star className="w-4 h-4" /> Recommended
                    </span>
                  </div>
                )}
                
                <CardHeader className="text-center pt-8">
                  <CardTitle className="text-2xl font-bold text-white">{tier.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-purple-400">${tier.price}</span>
                    <span className="text-gray-400 ml-2">/month</span>
                  </div>
                  <p className="text-gray-400 mt-4">{tier.description}</p>
                </CardHeader>
                
                <CardContent>
                  <ul className="space-y-3">
                    {tier.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-3 text-gray-300">
                        <Check className="w-5 h-5 text-purple-400 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                
                <CardFooter>
                  <Button 
                    className={`w-full ${tier.recommended ? 'bg-purple-600 hover:bg-purple-700' : 'bg-gray-800 hover:bg-gray-700'}`}
                    size="lg"
                  >
                    Choose {tier.name}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
