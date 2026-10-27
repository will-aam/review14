"use client";

import * as React from "react";
import { cn } from "../lib/utils";

export interface UploadedMediaItem {
  id: string;
  file?: File;
  previewUrl: string;
  type: "IMAGE" | "VIDEO";
  sizeBytes: number;
}

export interface MediaUploaderProps {
  maxFiles?: number;
  maxSizeBytes?: number; // default 15MB
  value?: UploadedMediaItem[];
  onChange?: (items: UploadedMediaItem[]) => void;
  className?: string;
  disabled?: boolean;
}

export function MediaUploader({
  maxFiles = 4,
  maxSizeBytes = 15 * 1024 * 1024,
  value = [],
  onChange,
  className,
  disabled = false,
}: MediaUploaderProps) {
  const [dragActive, setDragActive] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleFiles = (incomingFiles: FileList | null) => {
    if (!incomingFiles || incomingFiles.length === 0) return;
    setErrorMessage(null);

    const newItems: UploadedMediaItem[] = [...value];

    for (let i = 0; i < incomingFiles.length; i++) {
      if (newItems.length >= maxFiles) {
        setErrorMessage(`Limite máximo de ${maxFiles} arquivos atingido.`);
        break;
      }

      const file = incomingFiles[i];
      if (file.size > maxSizeBytes) {
        setErrorMessage(
          `O arquivo "${file.name}" ultrapassa o limite de ${Math.round(
            maxSizeBytes / (1024 * 1024)
          )}MB.`
        );
        continue;
      }

      const isVideo = file.type.startsWith("video/");
      const isImage = file.type.startsWith("image/");

      if (!isImage && !isVideo) {
        setErrorMessage(`Apenas fotos e vídeos são permitidos.`);
        continue;
      }

      const previewUrl = URL.createObjectURL(file);
      newItems.push({
        id: `${file.name}-${Date.now()}-${i}`,
        file,
        previewUrl,
        type: isVideo ? "VIDEO" : "IMAGE",
        sizeBytes: file.size,
      });
    }

    onChange?.(newItems);
  };

  const handleRemove = (id: string) => {
    const target = value.find((item) => item.id === id);
    if (target?.previewUrl?.startsWith("blob:")) {
      URL.revokeObjectURL(target.previewUrl);
    }
    const updated = value.filter((item) => item.id !== id);
    onChange?.(updated);
  };

  return (
    <div className={cn("w-full space-y-3", className)}>
      {/* Área de Dropzone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          if (!disabled) setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragActive(false);
          if (!disabled) handleFiles(e.dataTransfer.files);
        }}
        onClick={() => !disabled && inputRef.current?.click()}
        className={cn(
          "relative border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all",
          dragActive
            ? "border-primary bg-primary/5 scale-[1.01]"
            : "border-border/80 hover:border-primary/50 hover:bg-muted/30",
          disabled && "opacity-50 cursor-not-allowed hover:border-border/80 hover:bg-transparent"
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*,video/*"
          multiple
          disabled={disabled}
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />

        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-3">
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
        </div>

        <p className="text-sm font-semibold text-foreground">
          Adicionar fotos ou vídeos da experiência
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Arraste e solte ou toque para selecionar (máx. {maxFiles} arquivos até 15MB)
        </p>
      </div>

      {errorMessage && (
        <p className="text-xs font-medium text-destructive">{errorMessage}</p>
      )}

      {/* Grid de Previews */}
      {value.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          {value.map((item) => (
            <div
              key={item.id}
              className="relative group rounded-xl overflow-hidden border border-border aspect-square bg-muted/20"
            >
              {item.type === "IMAGE" ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.previewUrl}
                  alt="Pré-visualização"
                  className="w-full h-full object-cover"
                />
              ) : (
                <video
                  src={item.previewUrl}
                  className="w-full h-full object-cover"
                />
              )}

              {/* Tag de tipo */}
              <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-md text-white text-[10px] px-2 py-0.5 rounded-full font-medium">
                {item.type === "IMAGE" ? "Foto" : "Vídeo"}
              </div>

              {/* Botão de exclusão */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(item.id);
                }}
                className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/70 hover:bg-destructive text-white flex items-center justify-center transition-colors shadow-sm"
                aria-label="Remover mídia"
              >
                <svg
                  className="w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
