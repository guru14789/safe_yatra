import { cn } from "@/lib/utils";

interface FeatureCardProps {
  title: string;
  image: string;
  alt: string;
  className?: string;
}

export const FeatureCard = ({ title, image, alt, className }: FeatureCardProps) => {
  return (
    <div 
      className={cn(
        "relative rounded-3xl overflow-hidden border-4 border-accent",
        "shadow-[var(--shadow-orange-glow)] transition-[var(--transition-smooth)]",
        "hover:scale-105 hover:shadow-[0_20px_60px_hsl(var(--orange-accent)/0.4)]",
        "group cursor-pointer",
        className
      )}
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img 
          src={image} 
          alt={alt}
          className="w-full h-full object-cover transition-[var(--transition-smooth)] group-hover:scale-110"
        />
      </div>
      <div className="absolute top-4 left-4 right-4">
        <div className="bg-accent text-accent-foreground px-4 py-2 rounded-full text-sm font-semibold transform -rotate-2 shadow-lg">
          {title}
        </div>
      </div>
    </div>
  );
};