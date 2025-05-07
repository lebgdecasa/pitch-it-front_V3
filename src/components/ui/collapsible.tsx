// src/components/ui/collapsible.tsx
"use client"

import * as React from "react"
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"

// Assuming you have this utility function, adjust the import path if necessary
import { cn } from "@/lib/utils" // Or wherever your cn function lives

const Collapsible = CollapsiblePrimitive.Root

const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger

const CollapsibleContent = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.CollapsibleContent>,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.CollapsibleContent>
>(({ className, children, ...props }, ref) => (
  <CollapsiblePrimitive.CollapsibleContent
    ref={ref}
    className={cn(
      "overflow-hidden text-sm transition-all data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down",
      className
    )}
    {...props}
  >
    {/* Shadcn UI often adds an extra div inside for padding/margin separation, like below */}
    {/* You can adjust this based on whether your usage applies padding directly or expects it */}
    {/* <div className="pt-0">{children}</div> */}
    {/* Or just render children directly if padding is handled outside or by className */}
    {children}
  </CollapsiblePrimitive.CollapsibleContent>
))

CollapsibleContent.displayName = "CollapsibleContent"


export { Collapsible, CollapsibleTrigger, CollapsibleContent }
