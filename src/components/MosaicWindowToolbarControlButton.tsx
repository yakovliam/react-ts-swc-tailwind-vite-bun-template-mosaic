type MosaicWindowToolbarControlButtonProps = {
  text?: string;
  icon: React.ReactNode;
  onClick: () => void;
};

const MosaicWindowToolbarControlButton = ({
  text,
  icon,
  onClick,
}: MosaicWindowToolbarControlButtonProps) => {
  return (
    <button
      className="px-3 text-black flex items-center gap-2"
      onClick={onClick}
    >
      {text}
      {icon}
    </button>
  );
};

export default MosaicWindowToolbarControlButton;
