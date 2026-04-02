import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/src/lib/utils';
import { LucideIcon } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

interface Step {
  title: string;
  desc: string;
  icon: LucideIcon | string;
}

interface HowItWorksProps {
  steps: Step[];
  categoryColor: string;
  subtitle?: string;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ 
  steps, 
  categoryColor,
  subtitle = "Follow these simple steps to get started"
}) => {
  return (
    <section className="py-[80px]">
      <div className="max-w-[900px] mx-auto px-6">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-[30px] font-bold text-white font-display">How It Works</h2>
          <p className="text-[16px] text-white/40 mt-2">{subtitle}</p>
        </ScrollReveal>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-12 md:gap-4 relative">
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <ScrollReveal 
                delay={index * 100}
                className="flex-1 flex flex-col items-center text-center group"
              >
                {/* Step Number */}
                <div 
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-base transition-all duration-200 group-hover:brightness-110"
                  style={{ backgroundColor: categoryColor }}
                >
                  {index + 1}
                </div>

                {/* Icon */}
                <div className="mt-3 text-[48px] h-12 flex items-center justify-center">
                  {typeof step.icon === 'string' ? (
                    <span>{step.icon}</span>
                  ) : (
                    <step.icon className="w-12 h-12" style={{ color: categoryColor }} />
                  )}
                </div>

                {/* Title */}
                <h3 className="text-base font-semibold text-white mt-3">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-[14px] text-white/40 mt-3 max-w-[220px]">
                  {step.desc}
                </p>
              </ScrollReveal>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:flex flex-1 items-center justify-center h-9 mt-[-140px]">
                   <motion.div 
                    initial={{ width: 0, opacity: 0 }}
                    whileInView={{ width: '100%', opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="h-[2px] border-t-2 border-dashed relative"
                    style={{ borderColor: `${categoryColor}40` }}
                   >
                     <div 
                      className="absolute right-[-8px] top-[-6px] text-[12px]"
                      style={{ color: categoryColor }}
                     >
                       →
                     </div>
                   </motion.div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .group:hover {
          transform: scale(1.03);
        }
      `}} />
    </section>
  );
};
