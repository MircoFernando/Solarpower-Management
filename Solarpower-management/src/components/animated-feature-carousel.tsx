import {
  forwardRef,
  useCallback,
  useEffect,
  useState,
  type MouseEvent,
} from "react"
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  type MotionStyle,
  type MotionValue,
  type Variants,
} from "framer-motion"
import { CheckCircle2, Circle } from "lucide-react"
import { cn } from "@/lib/utils" // Assuming you have this, or use the helper below

// --- Helper for Classnames (if utils not available) ---
// const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(" ")

// --- Types ---
type StaticImageData = string;

type WrapperStyle = MotionStyle & {
  "--x": MotionValue<string>
  "--y": MotionValue<string>
}

interface ImageSet {
  step1img1: StaticImageData
  step1img2: StaticImageData
  step2img1: StaticImageData
  step2img2: StaticImageData
  step3img: StaticImageData
  step4img: StaticImageData
  alt: string
}

interface FeatureCarouselProps {
  image: ImageSet
  className?: string
}

interface StepImageProps {
  src: StaticImageData
  alt: string
  className?: string
  style?: React.CSSProperties
}

interface Step {
  id: string
  name: string
  title: string
  description: string
}

// --- Constants: Solar Installation Steps ---
const steps: readonly Step[] = [
  {
    id: "1",
    name: "Step 1",
    title: "Apply & Register",
    description: "Start your journey by clicking the dashboard button. Simply register and fill out the application form to request a solar unit installation for your property.",
  },
  {
    id: "2",
    name: "Step 2",
    title: "Review & Consultation",
    description: "Enovex will review your application for eligibility and technical feasibility. We will contact you directly to discuss the project details and approve the setup.",
  },
  {
    id: "3",
    name: "Step 3",
    title: "Installation Phase",
    description: "Once approved, our certified engineering team begins the installation phase. We handle the mounting, wiring, and safety checks to ensure a perfect setup.",
  },
  {
    id: "4",
    name: "Step 4",
    title: "Access Dashboard",
    description: "Upon completion, you receive full access to your personalized dashboard. Monitor your energy generation, track savings, and view system health in real-time.",
  },
]

// --- Animation Presets ---
const ANIMATION_PRESETS = {
  fadeInScale: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    transition: { type: "spring", stiffness: 300, damping: 25, mass: 0.5 },
  },
  slideInRight: {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
    transition: { type: "spring", stiffness: 300, damping: 25, mass: 0.5 },
  },
  slideInLeft: {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
    transition: { type: "spring", stiffness: 300, damping: 25, mass: 0.5 },
  },
} as const

type AnimationPreset = keyof typeof ANIMATION_PRESETS

interface AnimatedStepImageProps extends StepImageProps {
  preset?: AnimationPreset
  delay?: number
}

// --- Hooks ---
function useNumberCycler(totalSteps: number, interval: number = 6000) {
  const [currentNumber, setCurrentNumber] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timerId = setTimeout(() => {
      setCurrentNumber((prev) => (prev + 1) % totalSteps);
    }, interval);
    return () => clearTimeout(timerId);
  }, [currentNumber, totalSteps, interval, isPaused]);

  const setStep = useCallback((stepIndex: number) => {
    setCurrentNumber(stepIndex % totalSteps);
  }, [totalSteps]);

  return { currentNumber, setStep, setIsPaused };
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const checkDevice = () => setIsMobile(window.matchMedia("(max-width: 768px)").matches)
    checkDevice()
    window.addEventListener("resize", checkDevice)
    return () => window.removeEventListener("resize", checkDevice)
  }, [])
  return isMobile
}

// --- Sub-Components ---

const StepImage = forwardRef<HTMLImageElement, StepImageProps>(
  ({ src, alt, className, style, ...props }, ref) => {
    return (
      <img
        ref={ref}
        alt={alt}
        className={cn("object-cover shadow-2xl", className)}
        src={src}
        style={{ position: "absolute", userSelect: "none", maxWidth: "unset", ...style }}
        {...props}
      />
    )
  }
)
StepImage.displayName = "StepImage"

const MotionStepImage = motion(StepImage)

const AnimatedStepImage = ({ preset = "fadeInScale", delay = 0, ...props }: AnimatedStepImageProps) => {
  const presetConfig = ANIMATION_PRESETS[preset]
  return <MotionStepImage {...props} {...presetConfig} transition={{ ...presetConfig.transition, delay }} />
}

function FeatureCard({ children, step, onHover }: { children: React.ReactNode; step: number, onHover: (isHovering: boolean) => void }) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const isMobile = useIsMobile()

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    if (isMobile) return
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  return (
    <motion.div
      className="group relative w-full rounded-3xl"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      style={{ "--x": useMotionTemplate`${mouseX}px`, "--y": useMotionTemplate`${mouseY}px` } as WrapperStyle}
    >
      {/* Glow Effect */}
      <div className="absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100 bg-gradient-to-r from-blue-500/20 via-cyan-400/20 to-blue-500/20 blur-lg" />
      
      <div className="relative w-full overflow-hidden rounded-3xl border border-neutral-200 bg-white/50 backdrop-blur-sm transition-colors duration-300 dark:border-neutral-800 dark:bg-neutral-900/80">
        <div className="flex flex-col md:flex-row min-h-[500px] w-full">
          
          {/* Text Content Side */}
          <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center z-10 bg-gradient-to-r from-white/90 to-transparent dark:from-neutral-900/90">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="space-y-6"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 w-fit">
                   <span className="text-xs font-bold uppercase tracking-wider">{steps[step].name}</span>
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white">
                  {steps[step].title}
                </h2>
                
                <p className="text-lg leading-relaxed text-neutral-600 dark:text-neutral-400">
                  {steps[step].description}
                </p>

                {/* Status Indicator */}
                <div className="flex items-center gap-2 text-sm font-medium text-emerald-600 dark:text-emerald-400 mt-4">
                   <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                   Active Step
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Image Side */}
          <div className="w-full md:w-1/2 relative min-h-[300px] md:min-h-full overflow-hidden">
             {children}
          </div>

        </div>
      </div>
    </motion.div>
  )
}

function StepsNav({ steps: stepItems, current, onChange }: { steps: readonly Step[]; current: number; onChange: (index: number) => void; }) {
  return (
    <nav aria-label="Progress" className="flex justify-center px-4 w-full">
      <ol className="flex flex-wrap items-center justify-center gap-3" role="list">
        {stepItems.map((step, stepIdx) => {
          const isCompleted = current > stepIdx;
          const isCurrent = current === stepIdx;
          return (
            <motion.li 
                key={step.name} 
                className="relative"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
              <button
                type="button"
                onClick={() => onChange(stepIdx)}
                className={cn(
                  "group flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 border",
                  isCurrent
                    ? "bg-neutral-900 text-white border-neutral-900 shadow-lg scale-105"
                    : "bg-white text-neutral-600 border-neutral-200 hover:bg-neutral-50 hover:border-neutral-300"
                )}
              >
                <span className={cn(
                  "flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-colors",
                  isCompleted 
                    ? "bg-emerald-500 text-white" 
                    : isCurrent 
                        ? "bg-white text-neutral-900" 
                        : "bg-neutral-200 text-neutral-500"
                )}>
                   {isCompleted ? <CheckCircle2 className="h-4 w-4" /> : <span className="text-xs">{stepIdx + 1}</span>}
                </span>
                <span className="hidden sm:inline-block">{step.title}</span>
              </button>
            </motion.li>
          );
        })}
      </ol>
    </nav>
  );
}

// --- Layout Configurations for Images ---
const imgClasses = {
  base: "rounded-xl border border-neutral-200 dark:border-neutral-700 shadow-xl",
  // Step 1: Two images stacked
  s1_1: "w-[65%] left-[5%] top-[15%] z-10",
  s1_2: "w-[55%] left-[35%] top-[40%] z-20 shadow-2xl",
  // Step 2: Two images split
  s2_1: "w-[55%] right-[5%] top-[10%] z-10",
  s2_2: "w-[60%] left-[5%] top-[45%] z-20",
  // Step 3 & 4: Single large images
  full: "w-[85%] left-[7.5%] top-[15%] aspect-video z-10",
} as const

// --- Main Exported Component ---

export function FeatureCarousel({ image, className }: FeatureCarouselProps) {
  const { currentNumber: step, setStep, setIsPaused } = useNumberCycler(steps.length)

  const renderStepImages = () => {
    switch (step) {
      case 0: // Step 1: Apply
        return (
          <div className="relative w-full h-full">
            <AnimatedStepImage alt="Register Form" className={cn(imgClasses.base, imgClasses.s1_1)} src={image.step1img1} preset="slideInLeft" />
            <AnimatedStepImage alt="Application" className={cn(imgClasses.base, imgClasses.s1_2)} src={image.step1img2} preset="slideInRight" delay={0.2} />
          </div>
        )
      case 1: // Step 2: Review
        return (
          <div className="relative w-full h-full">
            <AnimatedStepImage alt="Review Meeting" className={cn(imgClasses.base, imgClasses.s2_1)} src={image.step2img1} preset="fadeInScale" />
            <AnimatedStepImage alt="Consultation" className={cn(imgClasses.base, imgClasses.s2_2)} src={image.step2img2} preset="slideInLeft" delay={0.2} />
          </div>
        )
      case 2: // Step 3: Install
        return <AnimatedStepImage alt="Installation" className={cn(imgClasses.base, imgClasses.full)} src={image.step3img} preset="fadeInScale" />
      case 3: // Step 4: Dashboard
        return <AnimatedStepImage alt="Dashboard" className={cn(imgClasses.base, imgClasses.full)} src={image.step4img} preset="fadeInScale" />
      default: return null
    }
  }

  return (
    <div className={cn("flex flex-col gap-8 w-full max-w-6xl mx-auto", className)}>
        <FeatureCard step={step} onHover={setIsPaused}>
            <AnimatePresence mode="wait">
                <motion.div 
                    key={step} 
                    className="w-full h-full absolute inset-0 bg-neutral-50/50 dark:bg-neutral-800/50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                   {/* Background Elements to fill empty space */}
                   <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-50" />
                   {renderStepImages()}
                </motion.div>
            </AnimatePresence>
        </FeatureCard>
        
        <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
        >
            <StepsNav current={step} onChange={setStep} steps={steps} />
        </motion.div>
    </div>
  )
}