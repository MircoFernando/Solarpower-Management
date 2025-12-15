import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Link } from "react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { X } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const multiStepFormVariants = cva("flex flex-col", {
  variants: {
    size: {
      default: "md:w-[700px]",
      sm: "md:w-[550px]",
      lg: "md:w-[850px]",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

interface MultiStepFormProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof multiStepFormVariants> {
  currentStep: number;
  totalSteps: number;
  title: string;
  description: string;
  onBack: () => void;
  onNext: () => void;
  onClose?: () => void;
  backButtonText?: string;
  nextButtonText?: string;
  footerContent?: React.ReactNode;
}

const MultiStepForm = React.forwardRef<HTMLDivElement, MultiStepFormProps>(
  (
    {
      className,
      size,
      currentStep,
      totalSteps,
      title,
      description,
      onBack,
      onNext,
      isSubmitted,
      onClose,
      backButtonText = "Back",
      nextButtonText = "Next Step",
      footerContent,
      children,
      ...props
    },
    ref
  ) => {
    const progress = Math.round((currentStep / totalSteps) * 100);

    const variants = {
      hidden: { opacity: 0, x: 100 },
      enter: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -100 },
    };

    if (currentStep == 4) {
      nextButtonText = "Submit";
    }

    return (
      <Card
        ref={ref}
        className={cn(multiStepFormVariants({ size }), className)}
        {...props}
      >
        <CardHeader>
          <div className="flex items-start justify-between">
            <CardTitle>{title}</CardTitle>
            {onClose && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          <CardDescription>{description}</CardDescription>
          <div className="flex items-center gap-4 pt-2">
            <Progress value={progress} className="w-full" />
            <p className="text-sm text-muted-foreground whitespace-nowrap">
              {currentStep}/{totalSteps} completed
            </p>
          </div>
        </CardHeader>

        <CardContent className="min-h-[300px] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              variants={variants}
              initial="hidden"
              animate="enter"
              exit="exit"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </CardContent>

        <CardFooter className="flex justify-between">
          <div>{footerContent}</div>
          <div className="flex gap-2">
            {currentStep > 1 && (
              <Button variant="outline" onClick={onBack}>
                {backButtonText}
              </Button>
            )}
            <Button onClick={onNext}>{nextButtonText}</Button>
              <AlertDialog open={open} onOpenChange={isSubmitted}>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Your request has been submitted successfully!
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      We will get back to you after reviewing your request,
                      after solar unit installation your dashboard will be
                      ready. Thank you!
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogAction>
                      <Link to="/">Go to Home</Link>
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
          </div>
        </CardFooter>
      </Card>
    );
  }
);

MultiStepForm.displayName = "MultiStepForm";

export { MultiStepForm };
