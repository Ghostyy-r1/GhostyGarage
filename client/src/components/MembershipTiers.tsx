
import { motion } from "framer-motion";
import { Check, Star, Shield, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const tiers = [
  {
    name: "Basic",
    price: 0,
    description: "Perfect for getting started",
    icon: Star,
    features: [
      "Access to community forums",
      "Basic maintenance guides",
      "Public events access",
      "Route sharing"
    ],
    recommended: false,
    delay: 0.1
  },
  {
    name: "Premium",
    price: 9.99,
    description: "For dedicated riders",
    icon: Shield,
    features: [
      "All Basic features",
      "Premium maintenance guides",
      "Priority support",
      "Exclusive events access",
      "Route planning tools",
      "Garage management tools"
    ],
    recommended: true,
    delay: 0.2
  },
  {
    name: "Pro",
    price: 19.99,
    description: "Ultimate motorcycle experience",
    icon: Crown,
    features: [
      "All Premium features",
      "1-on-1 mechanic consultations",
      "Custom route generation",
      "Early access to new features",
      "VIP event invitations",
      "Exclusive merchandise discounts"
    ],
    recommended: false,
    delay: 0.3
  }
];

export function MembershipTiers() {
  return (
    <section className="py-20 bg-gradient-to-b from-black via-purple-900/20 to-black relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block rounded-full bg-purple-900/30 px-4 py-1 text-sm text-purple-400 font-medium mb-4"
          >
            MEMBERSHIP TIERS
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-white mb-4"
          >
            Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">Perfect Plan</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-2xl mx-auto text-gray-400 text-lg"
          >
            Join our community and unlock exclusive benefits designed for every type of rider
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 15,
                delay: tier.delay
              }}
              className="h-full"
            >
              <Card className={`h-full relative overflow-hidden backdrop-blur-sm border-gray-800/50 hover:border-purple-500/30 transition-all duration-300 ${
                tier.recommended ? 'bg-gradient-to-b from-purple-900/40 via-purple-900/20 to-black border-purple-500/30' : 'bg-gradient-to-b from-gray-900/90 via-gray-900 to-black'
              }`}>
                {tier.recommended && (
                  <div className="absolute top-0 right-0">
                    <Badge variant="default" className="rounded-none rounded-bl-lg bg-purple-600 text-white">
                      Recommended
                    </Badge>
                  </div>
                )}

                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-purple-600/20">
                      <tier.icon className="w-6 h-6 text-purple-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">{tier.name}</h3>
                  </div>
                  <div className="flex items-baseline text-white">
                    <span className="text-4xl font-bold tracking-tight">${tier.price}</span>
                    <span className="ml-1 text-sm font-medium text-gray-400">/month</span>
                  </div>
                  <p className="text-gray-400 mt-2">{tier.description}</p>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-3">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-center">
                        <Check className="h-4 w-4 text-purple-400 mr-3" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter>
                  <Button 
                    className={`w-full ${
                      tier.recommended 
                        ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                        : 'bg-gray-800 hover:bg-gray-700 text-white'
                    }`}
                  >
                    Get Started
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
