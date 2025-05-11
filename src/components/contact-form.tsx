import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button, Input, Textarea, Card, Tooltip } from "@heroui/react";
import { Icon } from "@iconify/react";

const socialLinks = [
  { icon: "simple-icons:linkedin", label: "LinkedIn", url: "#", color: "#0077B5" },
  { icon: "simple-icons:instagram", label: "Instagram", url: "#", color: "#E4405F" },
  { icon: "simple-icons:twitter", label: "Twitter", url: "#", color: "#1DA1F2" },
  { icon: "simple-icons:dribbble", label: "Dribbble", url: "#", color: "#EA4C89" },
  { icon: "simple-icons:behance", label: "Behance", url: "#", color: "#1769FF" }
];

export const ContactForm = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      console.log("Form submitted:", formState);
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormState({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 px-4 bg-gradient-to-b from-background to-primary-50/30 dark:from-background dark:to-primary-900/10 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary-200/20 dark:bg-primary-800/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent-200/20 dark:bg-accent-800/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium mb-4">
            <Icon icon="lucide:mail" className="text-lg" />
            <span>Contact</span>
          </div>
          <h2 className="text-4xl font-bold font-heading mb-4">Get in Touch</h2>
          <p className="text-xl text-default-600 max-w-2xl mx-auto">
            Have a project in mind or want to discuss a potential collaboration? I'd love to hear from you!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:col-span-3"
          >
            <Card className="p-6 shadow-lg">
              {isSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12"
                >
                  <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mb-4">
                    <Icon icon="lucide:check" className="text-3xl text-primary-500" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                  <p className="text-default-600 text-center">
                    Thank you for reaching out. I'll get back to you as soon as possible.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <Input
                      label="Name"
                      placeholder="Your name"
                      value={formState.name}
                      onValueChange={(value) => setFormState({ ...formState, name: value })}
                      isRequired
                      startContent={<Icon icon="lucide:user" className="text-default-400" />}
                    />
                    <Input
                      label="Email"
                      placeholder="your.email@example.com"
                      type="email"
                      value={formState.email}
                      onValueChange={(value) => setFormState({ ...formState, email: value })}
                      isRequired
                      startContent={<Icon icon="lucide:mail" className="text-default-400" />}
                    />
                  </div>
                  <Input
                    label="Subject"
                    placeholder="What's this about?"
                    value={formState.subject}
                    onValueChange={(value) => setFormState({ ...formState, subject: value })}
                    isRequired
                    startContent={<Icon icon="lucide:message-circle" className="text-default-400" />}
                  />
                  <Textarea
                    label="Message"
                    placeholder="Tell me about your project or inquiry"
                    value={formState.message}
                    onValueChange={(value) => setFormState({ ...formState, message: value })}
                    minRows={5}
                    isRequired
                  />
                  <Button
                    color="primary"
                    type="submit"
                    className="w-full"
                    size="lg"
                    isLoading={isSubmitting}
                    startContent={!isSubmitting && <Icon icon="lucide:send" />}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              )}
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 space-y-6"
          >
            <Card className="p-6 bg-gradient-to-br from-primary-100 to-primary-50 dark:from-primary-900/40 dark:to-primary-900/20 border-none shadow-lg">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Icon icon="lucide:map-pin" className="text-primary-500" />
                <span>Location</span>
              </h3>
              <div className="space-y-3">
                <p className="text-default-600 flex items-center gap-2">
                  <Icon icon="lucide:home" className="text-default-500" />
                  <span>San Francisco, California</span>
                </p>
                <p className="text-default-600 flex items-center gap-2">
                  <Icon icon="lucide:globe" className="text-default-500" />
                  <span>Available for remote work worldwide</span>
                </p>
                <p className="text-default-600 flex items-center gap-2">
                  <Icon icon="lucide:clock" className="text-default-500" />
                  <span>Mon - Fri: 9:00 AM - 6:00 PM PST</span>
                </p>
              </div>
            </Card>

            <Card className="p-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Icon icon="lucide:share-2" className="text-primary-500" />
                <span>Connect With Me</span>
              </h3>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((link) => (
                  <Tooltip key={link.label} content={link.label} placement="bottom">
                    <a
                      href={link.url}
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300`}
                      style={{ backgroundColor: `${link.color}20`, color: link.color }}
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = link.color;
                        e.currentTarget.style.color = 'white';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = `${link.color}20`;
                        e.currentTarget.style.color = link.color;
                      }}
                    >
                      <Icon icon={link.icon} className="text-xl" />
                    </a>
                  </Tooltip>
                ))}
              </div>
              
              <div className="mt-6 pt-6 border-t border-divider">
                <a 
                  href="mailto:rahul.tiwari@example.com" 
                  className="flex items-center gap-2 text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-colors"
                >
                  <Icon icon="lucide:mail" />
                  <span>rahul.tiwari@example.com</span>
                </a>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
