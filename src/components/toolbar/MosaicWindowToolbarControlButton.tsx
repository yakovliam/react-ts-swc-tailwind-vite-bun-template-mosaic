import { Button } from "@/components/ui/button";

type MosaicWindowToolbarControlButtonProps = {
  text?: string;
  icon: React.ReactNode;
  onClick: () => void;
  variant: "default" | "destructive" | "secondary" | "ghost" | "link";
};

const MosaicWindowToolbarControlButton = ({
  text,
  icon,
  onClick,
  variant,
}: MosaicWindowToolbarControlButtonProps) => {
  return (
    <Button onClick={onClick} variant={variant} className="h-[30px]">
      {text}
      {icon}
    </Button>
  );
};

export default MosaicWindowToolbarControlButton;
