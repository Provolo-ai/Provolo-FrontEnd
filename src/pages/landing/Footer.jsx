import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Copyright,
  Instagram,
  Linkedin,
  Twitter,
  LibraryBig,
} from "lucide-react";
import Vector3 from "../../assets/img/Vector3.png";
import Vector4 from "../../assets/img/Vector4.png";
import Vector5 from "../../assets/img/Vector5.png";
import freelancers from "../../assets/img/freelancers.png";
import upwork from "../../assets/img/upwork.png";
import proposals from "../../assets/img/proposals.png";

// Reusable styles
const linkBase =
  "p-3 flex items-center gap-3 rounded text-gray-500 hover:text-gray-950 transition-all duration-300 text-sm";

function SocialLink({ to, icon: Icon }) {
  return (
    <motion.div
      whileHover={{ 
        scale: 1.05,
        transition: { duration: 0.2, ease: "easeOut" }
      }}
      whileTap={{ scale: 0.95 }}
    >
      <Link target="_blank" to={to} className={linkBase}>
        <Icon size={20} />
      </Link>
    </motion.div>
  );
}

function HeroSection() {
  // Subtle container animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  // Minimal fade up for text elements
  const fadeUpVariants = {
    hidden: { 
      opacity: 0, 
      y: 20
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  // Gentle floating for decorative images
  const floatingVariants = {
    animate: {
      y: [-5, 5, -5],
      rotate: [-1, 1, -1],
      transition: {
        duration: 8,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  };

  // Background vectors with subtle entrance
  const vectorVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 0.5,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div 
      className="relative isolate overflow-hidden bg-[#0F56EE] px-6 pt-16 rounded-3xl sm:px-16 flex lg:gap-x-20 lg:px-24 min-h-[600px]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      {/* Gradient Overlay */}
      <motion.div 
        className="absolute z-20 h-full left-0 w-full bg-gradient-to-b from-white/0 to-white/30 top-32"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 1,
          transition: { duration: 1, delay: 0.5 }
        }}
      />

      <motion.div 
        className="text-center lg:w-[703px] m-auto flex flex-col lg:gap-[20px] gap-[15px] relative z-20"
        variants={containerVariants}
      >
        <motion.p 
          className="tracking-tight leading-tight text-balance lg:text-[44px] text-2xl font-headingmd text-white"
          variants={fadeUpVariants}
        >
          Stop Guessing. <br />
          Start Winning More Jobs on Upwork.
        </motion.p>

        <motion.p 
          className="text-white/70 lg:text-base md:text-[20px] text-[14px] mx-auto"
          variants={fadeUpVariants}
        >
          Your skills deserve to be seen and paid. Provolo helps you attract clients, rank higher, and turn views into interviews. Make every word work for you.
        </motion.p>

        <motion.div
          variants={fadeUpVariants}
          whileHover={{ 
            scale: 1.02,
            transition: { duration: 0.2, ease: "easeOut" }
          }}
          whileTap={{ scale: 0.98 }}
        >
          <Link
            to="/signup"
            className='bg-white hover:bg-white/90 transition-all duration-300 py-[18px] px-[30px] rounded-full mx-auto w-[180px] h-[45px] flex items-center justify-center text-sm text-black font-headingmd'
          >
            Get Started
          </Link>
        </motion.div>

        {/* Floating decorative images with minimal animations */}
        <motion.img 
          alt="Provolo" 
          src={proposals} 
          className='absolute lg:-top-20 lg:-right-14 right-0 -bottom-16 lg:w-32 w-[100px]'
          initial={{ opacity: 0, x: 20, rotate: 5 }}
          animate={{ 
            opacity: 1, 
            x: 0, 
            rotate: 0,
            transition: { duration: 0.6, delay: 0.8, ease: "easeOut" }
          }}
          variants={floatingVariants}
          whileInView="animate"
          whileHover={{ 
            scale: 1.05,
            rotate: 3,
            transition: { duration: 0.2, ease: "easeOut" }
          }}
        />
        
        <motion.img 
          alt="Freelancing" 
          src={freelancers} 
          className='absolute lg:-left-48 -top-20 lg:w-32 w-[100px]'
          initial={{ opacity: 0, x: -20, rotate: -5 }}
          animate={{ 
            opacity: 1, 
            x: 0, 
            rotate: 0,
            transition: { duration: 0.6, delay: 0.6, ease: "easeOut" }
          }}
          variants={floatingVariants}
          whileInView="animate"
          whileHover={{ 
            scale: 1.05,
            rotate: -3,
            transition: { duration: 0.2, ease: "easeOut" }
          }}
        />
        
        <motion.img
          alt="Upwork profile optimization graphic"
          src={upwork}
          className="absolute w-[100px] lg:w-32 -bottom-20 left-0 lg:left-auto lg:-right-32 lg:top-50"
          initial={{ opacity: 0, y: 20, rotate: 8 }}
          animate={{ 
            opacity: 1, 
            y: 0, 
            rotate: 0,
            transition: { duration: 0.6, delay: 1.0, ease: "easeOut" }
          }}
          variants={floatingVariants}
          whileInView="animate"
          whileHover={{ 
            scale: 1.05,
            rotate: 5,
            transition: { duration: 0.2, ease: "easeOut" }
          }}
        />
      </motion.div>

      {/* Background vectors with subtle animation */}
      <motion.img 
        alt="Upwork Optimiser" 
        src={Vector4} 
        className='absolute lg:top-0 bottom-0 left-0 lg:w-1/4 w-1/2 z-0 opacity-50'
        variants={vectorVariants}
      />
      <motion.img 
        alt="Upwork Optimiser" 
        src={Vector5} 
        className='absolute top-0 right-0 lg:w-1/4 w-1/2 z-0 opacity-50 lg:hidden md:hidden'
        variants={vectorVariants}
      />
      <motion.img 
        alt="Upwork Optimiser" 
        src={Vector3} 
        className='absolute bottom-0 right-0 w-1/4 z-0 opacity-50'
        variants={vectorVariants}
      />
    </motion.div>
  );
}

function FooterSection() {
  // Minimal footer animation
  const footerVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 5 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div 
      className="lg:flex mt-10 lg:justify-between items-center border-t border-gray-200 pt-10 px-6 lg:px-8 bg-white"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={footerVariants}
    >
      <motion.p 
        className="hidden lg:flex items-center gap-3 text-sm"
        variants={itemVariants}
      >
        <Copyright size={15} />
        Provolo '25
      </motion.p>

      <motion.div 
        className="flex flex-col lg:flex-row md:flex-row w-fu items-center gap-10 justify-center"
        variants={itemVariants}
      >
        <motion.span 
          className="flex lg:flex-row md:flex-row flex-col justify-center items-center"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.03,
                delayChildren: 0.1
              }
            }
          }}
        >
          <motion.div
            variants={itemVariants}
            whileHover={{ 
              x: 2,
              transition: { duration: 0.2, ease: "easeOut" }
            }}
          >
            <Link
              target="_blank"
              to="https://buildsbyesuoladaniel.hashnode.space/provolo/terms-and-conditions"
              className={linkBase}
            >
              Terms & Conditions
            </Link>
          </motion.div>
          <motion.div
            variants={itemVariants}
            whileHover={{ 
              x: 2,
              transition: { duration: 0.2, ease: "easeOut" }
            }}
          >
            <Link
              target="_blank"
              to="https://buildsbyesuoladaniel.hashnode.space/provolo/privacy-policy"
              className={linkBase}
            >
              Privacy Policy
            </Link>
          </motion.div>
          <motion.div
            variants={itemVariants}
            whileHover={{ 
              x: 2,
              transition: { duration: 0.2, ease: "easeOut" }
            }}
          >
            <Link
              target="_blank"
              to="https://buildsbyesuoladaniel.hashnode.space/provolo/provoloai-project-documentation"
              className={linkBase}
            >
              Documentation
            </Link>
          </motion.div>
        </motion.span>

        <motion.span 
          className="flex items-center justify-center"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.05,
                delayChildren: 0.2
              }
            }
          }}
        >
          <motion.div variants={itemVariants}>
            <SocialLink to="https://x.com/provoloai" icon={Twitter} />
          </motion.div>
          <motion.div variants={itemVariants}>
            <SocialLink to="https://www.linkedin.com/company/provoloai" icon={Linkedin} />
          </motion.div>
          <motion.div variants={itemVariants}>
            <SocialLink to="https://www.instagram.com/provoloai" icon={Instagram} />
          </motion.div>
          <motion.div variants={itemVariants}>
            <SocialLink to="https://substack.com/@provoloai" icon={LibraryBig} />
          </motion.div>
        </motion.span>
      </motion.div>
    </motion.div>
  );
}

export default function Example() {
  return (
    <div className="bg-white p-5">
      <div className="mx-auto max-w-[93.75rem] lg:py-24 sm:py-10 lg:p-0">
        <HeroSection />
        <FooterSection />
      </div>
    </div>
  );
}