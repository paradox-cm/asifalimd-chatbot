import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-clinical-600 text-white hover:bg-clinical-700 dark:bg-clinical-600 dark:hover:bg-clinical-700 shadow-sm",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-foreground/20 bg-transparent text-foreground hover:bg-foreground/5 hover:border-foreground/30 dark:border-slate-600 dark:text-foreground dark:hover:bg-card dark:hover:border-clinical-400 shadow-sm",
        secondary:
          "bg-foreground/5 text-foreground hover:bg-foreground/10 dark:bg-secondary dark:text-foreground dark:hover:bg-secondary/80 shadow-sm",
        ghost: "hover:bg-foreground/5 hover:text-foreground dark:hover:bg-secondary dark:hover:text-foreground",
        link: "text-clinical-600 underline-offset-4 hover:underline dark:text-clinical-400",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 text-sm rounded-md px-3 py-1",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }
