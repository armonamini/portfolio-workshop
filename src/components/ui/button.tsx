import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden after:absolute after:inset-0 after:rounded-md after:bg-[radial-gradient(120px_80px_at_center,hsl(var(--accent)/.35),transparent_60%)] after:opacity-0 data-[flare=true]:after:opacity-100",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        hero:
          "bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-[var(--shadow-glow)] hover:shadow-[var(--shadow-glow-strong)]",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    const [flare, setFlare] = React.useState(false)

    const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
      props.onMouseEnter?.(e)
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
      const x = rect.left + rect.width / 2
      const y = rect.top + rect.height / 2
      window.dispatchEvent(new CustomEvent("shooting-star", { detail: { x, y } }))
      setFlare(true)
      window.setTimeout(() => setFlare(false), 700)
    }

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        data-flare={flare ? "true" : undefined}
        onMouseEnter={handleMouseEnter}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
