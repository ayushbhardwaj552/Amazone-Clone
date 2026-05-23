import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-normal transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e77600] focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.99] select-none",
  {
    variants: {
      variant: {
        // Amazon primary — yellow gradient pill
        default:
          "rounded-[20px] border border-[#FCD200] bg-gradient-to-b from-[#FFE814] to-[#F0C14B] text-[#0F1111] shadow-[0_1px_0_rgba(255,255,255,.4)_inset,0_-1px_0_rgba(0,0,0,.1)_inset] hover:from-[#F7D000] hover:to-[#e8b900] active:from-[#e8b900] active:to-[#d4a800]",
        // Amazon orange CTA — "Add to Cart"
        destructive:
          "rounded-[20px] border border-[#E47911] bg-gradient-to-b from-[#f9a825] to-[#E47911] text-white shadow-[0_1px_0_rgba(255,255,255,.2)_inset] hover:from-[#f0a020] hover:to-[#d4690a] active:from-[#d4690a] active:to-[#b85c08]",
        // Outlined — secondary actions
        outline:
          "rounded-[20px] border border-[#D5D9D9] bg-gradient-to-b from-[#FAFAFA] to-[#F0F0F0] text-[#0F1111] shadow-[0_1px_0_rgba(255,255,255,.6)_inset] hover:from-[#F5F5F5] hover:to-[#E8E8E8] hover:border-[#ADB1B8]",
        // Muted secondary
        secondary:
          "rounded-[3px] border border-[#D5D9D9] bg-[#F0F2F2] text-[#0F1111] shadow-sm hover:bg-[#E3E6E6] hover:border-[#ADB1B8]",
        // Ghost — nav / icon buttons
        ghost:
          "rounded-[3px] bg-transparent text-[#0F1111] hover:bg-[#F0F2F2] hover:text-[#0F1111]",
        // Link style — matches Amazon's teal link colour
        link: "rounded-none text-[#007185] underline-offset-2 hover:text-[#C7511F] hover:underline p-0 h-auto",
      },
      size: {
        default: "h-9 px-5 py-2 text-[13px]",
        sm: "h-8 px-4 text-[12px]",
        lg: "h-10 px-6 text-[14px]",
        icon: "h-9 w-9 rounded-full",
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
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
