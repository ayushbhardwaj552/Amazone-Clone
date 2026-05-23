"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { CheckIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      // Base — Amazon uses a plain square checkbox with blue accent
      "peer h-[15px] w-[15px] shrink-0 rounded-[2px] border border-[#888C8C] bg-white shadow-[inset_0_1px_2px_rgba(0,0,0,.1)]",
      // Focus
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e77600] focus-visible:ring-offset-1",
      // Disabled
      "disabled:cursor-not-allowed disabled:opacity-50",
      // Checked state — Amazon blue
      "data-[state=checked]:bg-[#066FA1] data-[state=checked]:border-[#066FA1]",
      // Hover
      "hover:border-[#ADB1B8] transition-colors duration-100",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-white")}
    >
      <CheckIcon className="h-[11px] w-[11px] stroke-[1.5]" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
