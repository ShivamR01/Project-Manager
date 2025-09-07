import { motion } from "framer-motion";
import { Check, X, Star, ArrowRight, Zap, Crown, Building } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { HomeHeader } from "@/components/home/HomeHeader";
import { Footer } from "@/components/layout/Footer";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const PricingPage = () => {
  const navigate = useNavigate();
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      name: "Starter",
      icon: <Zap className="h-5 w-5" />,
      description: "Perfect for small teams getting started",
      monthlyPrice: 0,
      yearlyPrice: 0,
      popular: false,
      cta: "Start Free",
      features: [
        "Up to 5 team members",
        "10 projects",
        "Basic task management",
        "File sharing (1GB)",
        "Email support",
        "Mobile apps",
      ],
      notIncluded: [
        "Advanced analytics",
        "Time tracking",
        "Custom workflows",
        "API access",
        "Priority support"
      ]
    },
    {
      name: "Professional",
      icon: <Star className="h-5 w-5" />,
      description: "Ideal for growing teams and businesses",
      monthlyPrice: 12,
      yearlyPrice: 120,
      popular: true,
      cta: "Start Trial",
      features: [
        "Up to 25 team members",
        "Unlimited projects",
        "Advanced task management",
        "Time tracking & reporting",
        "File sharing (100GB)",
        "Custom workflows",
        "Advanced analytics",
        "Priority email support",
        "Mobile apps",
        "Integrations"
      ],
      notIncluded: [
        "Custom branding",
        "Advanced security",
        "Dedicated support"
      ]
    },
    {
      name: "Enterprise",
      icon: <Crown className="h-5 w-5" />,
      description: "For large organizations with advanced needs",
      monthlyPrice: 25,
      yearlyPrice: 250,
      popular: false,
      cta: "Contact Sales",
      features: [
        "Unlimited team members",
        "Unlimited projects",
        "Advanced task management",
        "Advanced time tracking",
        "Unlimited file storage",
        "Custom workflows",
        "Advanced analytics",
        "Custom branding",
        "Advanced security (SSO)",
        "API access",
        "Dedicated account manager",
        "24/7 phone support",
        "On-premise deployment"
      ],
      notIncluded: []
    }
  ];

  const faqs = [
    {
      question: "Can I change plans anytime?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately for upgrades, or at the next billing cycle for downgrades."
    },
    {
      question: "Is there a free trial?",
      answer: "Yes, we offer a 14-day free trial for all paid plans. No credit card required to start your trial."
    },
    {
      question: "What happens to my data if I cancel?",
      answer: "Your data remains accessible for 30 days after cancellation. You can export all your data during this period."
    },
    {
      question: "Do you offer refunds?",
      answer: "We offer a 30-day money-back guarantee for annual subscriptions. Monthly subscriptions can be canceled anytime."
    },
    {
      question: "Is my data secure?",
      answer: "Absolutely. We use bank-level encryption and security measures. All data is backed up daily and stored securely."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <HomeHeader />
      
      <main>
        {/* Hero Section */}
        <section className="py-20 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-blue-500/5"></div>
          <div className="container px-4 mx-auto relative">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              <Badge className="mb-4" variant="secondary">
                💳 Simple, Transparent Pricing
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Choose the perfect
                <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                  {" "}plan for your team
                </span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                Start free and scale as you grow. No hidden fees, no surprises. 
                Cancel anytime with our 30-day money-back guarantee.
              </p>
              
              {/* Billing Toggle */}
              <div className="flex items-center justify-center gap-4 mb-12">
                <span className={`text-sm ${!isYearly ? 'font-medium' : 'text-muted-foreground'}`}>
                  Monthly
                </span>
                <Switch
                  checked={isYearly}
                  onCheckedChange={setIsYearly}
                />
                <span className={`text-sm ${isYearly ? 'font-medium' : 'text-muted-foreground'}`}>
                  Yearly
                </span>
                <Badge variant="secondary" className="ml-2">
                  Save 17%
                </Badge>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-20">
          <div className="container px-4 mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {plans.map((plan, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  whileHover={{ y: -10 }}
                  className="relative"
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <Badge className="bg-gradient-to-r from-primary to-blue-600 text-primary-foreground px-4 py-1">
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  
                  <Card className={`h-full border-0 shadow-xl ${
                    plan.popular 
                      ? 'ring-2 ring-primary shadow-2xl scale-105' 
                      : 'hover:shadow-2xl'
                  } transition-all duration-300 group`}>
                    <CardHeader className="text-center pb-8">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <div className={`p-2 rounded-lg ${
                          plan.popular 
                            ? 'bg-gradient-to-r from-primary to-blue-600 text-white' 
                            : 'bg-muted text-muted-foreground'
                        }`}>
                          {plan.icon}
                        </div>
                        <CardTitle className="text-2xl">{plan.name}</CardTitle>
                      </div>
                      <p className="text-muted-foreground">{plan.description}</p>
                      
                      <div className="pt-4">
                        <div className="flex items-baseline justify-center gap-1">
                          <span className="text-4xl font-bold">
                            ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                          </span>
                          <span className="text-muted-foreground">
                            /{isYearly ? 'year' : 'month'}
                          </span>
                        </div>
                        {isYearly && plan.monthlyPrice > 0 && (
                          <p className="text-sm text-muted-foreground mt-1">
                            ${Math.round(plan.yearlyPrice / 12)}/month billed annually
                          </p>
                        )}
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-6">
                      <Button 
                        className={`w-full ${plan.popular ? 'bg-gradient-to-r from-primary to-blue-600' : ''}`}
                        variant={plan.popular ? "default" : "outline"}
                        size="lg"
                        onClick={() => navigate(plan.name === 'Enterprise' ? '/contact' : '/signup')}
                      >
                        {plan.cta}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                      
                      <div className="space-y-3">
                        <h4 className="font-semibold text-sm">What's included:</h4>
                        <ul className="space-y-2">
                          {plan.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm">
                              <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                        
                        {plan.notIncluded.length > 0 && (
                          <ul className="space-y-2 pt-2">
                            {plan.notIncluded.map((feature, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <X className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Enterprise CTA */}
        <section className="py-20 bg-muted/30">
          <div className="container px-4 mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto"
            >
              <Card className="border-0 shadow-xl bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
                <CardContent className="p-8 md:p-12">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <Building className="h-6 w-6 text-primary" />
                        <Badge variant="secondary">Enterprise Solutions</Badge>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold mb-4">
                        Need something custom?
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        We work with enterprise customers to create custom solutions 
                        that fit your specific needs. Get dedicated support, custom 
                        integrations, and white-label options.
                      </p>
                      <ul className="space-y-2 text-sm mb-6">
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-500" />
                          <span>Custom deployment options</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-500" />
                          <span>Advanced security & compliance</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-500" />
                          <span>Dedicated account management</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-500" />
                          <span>Custom integrations & API</span>
                        </li>
                      </ul>
                    </div>
                    <div className="text-center lg:text-right">
                      <Button size="lg" onClick={() => navigate("/contact")}>
                        Contact Sales Team
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                      <p className="text-sm text-muted-foreground mt-4">
                        Speak with our enterprise team about your specific needs
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20">
          <div className="container px-4 mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Have questions? We have answers. If you can't find what you're looking for, 
                feel free to contact our support team.
              </p>
            </motion.div>

            <div className="max-w-3xl mx-auto space-y-6">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PricingPage;