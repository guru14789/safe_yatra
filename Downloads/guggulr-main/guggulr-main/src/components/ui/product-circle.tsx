import { cn } from "@/lib/utils";

interface ProductCircleProps {
  image: string;
  alt: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const ProductCircle = ({ image, alt, size = "md", className }: ProductCircleProps) => {
  const sizeClasses = {
    sm: "w-20 h-20",
    md: "w-32 h-32",
    lg: "w-40 h-40"
  };

  return (
    <div 
      className={cn(
        "rounded-full border-4 border-accent overflow-hidden animate-float",
        "shadow-[var(--shadow-orange-glow)] transition-[var(--transition-smooth)]",
        "hover:scale-105 hover:shadow-[0_15px_50px_hsl(var(--orange-accent)/0.5)]",
        sizeClasses[size],
        className
      )}
    >
      <img 
        src={image} 
        alt={alt}
        className="w-full h-full object-cover"
      />
    </div>
  );
};