import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X, RotateCcw, ZoomIn, ZoomOut, Move } from "lucide-react";

interface VirtualTryOnProps {
  sareeImage: string;
  sareeName: string;
}

export const VirtualTryOn = ({ sareeImage, sareeName }: VirtualTryOnProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [userPhoto, setUserPhoto] = useState<string | null>(null);
  const [sareeScale, setSareeScale] = useState(1);
  const [sareePosition, setSareePosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [sareeOpacity, setSareeOpacity] = useState(0.7);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      setUserPhoto(ev.target?.result as string);
      setSareePosition({ x: 0, y: 0 });
      setSareeScale(1);
    };
    reader.readAsDataURL(file);
  };

  const handleReset = () => {
    setUserPhoto(null);
    setSareeScale(1);
    setSareePosition({ x: 0, y: 0 });
    setSareeOpacity(0.7);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      setIsDragging(true);
      setDragStart({ x: e.clientX - sareePosition.x, y: e.clientY - sareePosition.y });
    },
    [sareePosition]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging) return;
      setSareePosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    },
    [isDragging, dragStart]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (!isDragging) return;
    const up = () => setIsDragging(false);
    window.addEventListener("mouseup", up);
    return () => window.removeEventListener("mouseup", up);
  }, [isDragging]);

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      const touch = e.touches[0];
      setIsDragging(true);
      setDragStart({ x: touch.clientX - sareePosition.x, y: touch.clientY - sareePosition.y });
    },
    [sareePosition]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isDragging) return;
      const touch = e.touches[0];
      setSareePosition({
        x: touch.clientX - dragStart.x,
        y: touch.clientY - dragStart.y,
      });
    },
    [isDragging, dragStart]
  );

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        variant="outline"
        className="w-full gap-2 border-dashed border-2 border-primary/50 text-primary hover:bg-primary/5 font-body"
      >
        <span className="text-lg">👗</span>
        Virtual Try-On
      </Button>
    );
  }

  return (
    <div className="border border-border rounded-xl p-4 bg-card shadow-soft space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-display font-semibold text-foreground">
          👗 Virtual Try-On
        </h3>
        <button
          onClick={() => setIsOpen(false)}
          className="p-1 hover:bg-muted rounded-full transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <p className="text-sm text-muted-foreground font-body">
        Upload your photo, then drag, resize and adjust the saree overlay to see how it looks on you.
      </p>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileUpload}
      />

      {!userPhoto ? (
        <button
          onClick={() => fileInputRef.current?.click()}
          className="w-full border-2 border-dashed border-muted-foreground/30 rounded-lg p-8 flex flex-col items-center gap-3 hover:border-primary/50 hover:bg-primary/5 transition-colors"
        >
          <Upload className="h-8 w-8 text-muted-foreground" />
          <span className="text-sm text-muted-foreground font-body">
            Click to upload your photo
          </span>
          <span className="text-xs text-muted-foreground/60 font-body">
            JPG, PNG up to 10MB
          </span>
        </button>
      ) : (
        <>
          {/* Overlay Canvas */}
          <div
            ref={containerRef}
            className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-muted select-none"
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {/* User Photo */}
            <img
              src={userPhoto}
              alt="Your photo"
              className="absolute inset-0 w-full h-full object-cover"
              draggable={false}
            />
            {/* Saree Overlay */}
            <img
              src={sareeImage}
              alt={sareeName}
              className="absolute cursor-move"
              draggable={false}
              style={{
                width: `${60 * sareeScale}%`,
                left: `50%`,
                top: `50%`,
                transform: `translate(calc(-50% + ${sareePosition.x}px), calc(-50% + ${sareePosition.y}px))`,
                opacity: sareeOpacity,
                mixBlendMode: "multiply",
                pointerEvents: "auto",
              }}
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleMouseUp}
            />
          </div>

          {/* Controls */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground font-body flex items-center gap-1">
                <Move className="h-3 w-3" /> Drag saree to reposition
              </span>
              <div className="flex items-center gap-1">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setSareeScale((s) => Math.max(0.3, s - 0.1))}
                  className="h-8 w-8 p-0"
                >
                  <ZoomOut className="h-3 w-3" />
                </Button>
                <span className="text-xs font-body w-12 text-center">
                  {Math.round(sareeScale * 100)}%
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setSareeScale((s) => Math.min(3, s + 0.1))}
                  className="h-8 w-8 p-0"
                >
                  <ZoomIn className="h-3 w-3" />
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground font-body shrink-0">
                Opacity
              </span>
              <input
                type="range"
                min="0.2"
                max="1"
                step="0.05"
                value={sareeOpacity}
                onChange={(e) => setSareeOpacity(parseFloat(e.target.value))}
                className="flex-1 h-1.5 accent-primary"
              />
              <span className="text-xs font-body w-10 text-right">
                {Math.round(sareeOpacity * 100)}%
              </span>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleReset}
                className="flex-1 font-body"
              >
                <RotateCcw className="mr-1 h-3 w-3" />
                Reset
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                className="flex-1 font-body"
              >
                <Upload className="mr-1 h-3 w-3" />
                Change Photo
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
