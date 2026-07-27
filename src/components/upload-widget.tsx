import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from "@/constants";
import { UploadWidgetProps, UploadWidgetValue } from "@/types";
import { UploadCloud, Trash, Loader2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";

const UploadWidget = ({
  value = null,
  onChange,
  disabled = false,
}: UploadWidgetProps) => {
  const widgetRef = useRef<CloudinaryWidget | null>(null);
  const onChangeRef = useRef(onChange);

  const [preview, setPreview] = useState<UploadWidgetValue | null>(value);
  const [deleteToken, setDeleteToken] = useState<string | null>(null);
  const [isRemoving, setIsRemoving] = useState<boolean>(false);

  useEffect(() => {
    setPreview((prev) => {
      if (prev?.url === value?.url && prev?.publicId === value?.publicId) {
        return prev;
      }
      return value;
    });
    if (!value) setDeleteToken(null);
  }, [value?.url, value?.publicId, value]);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const initializeWidget = () => {
      if (!window.cloudinary || widgetRef.current) return false;

      widgetRef.current = window.cloudinary.createUploadWidget(
        {
          cloudName: CLOUDINARY_CLOUD_NAME,
          uploadPreset: CLOUDINARY_UPLOAD_PRESET,
          multiple: false,
          folder: "uploads",
          maxFileSize: 5 * 1024 * 1024,
          clientAllowedFormats: ["png", "jpg", "jpeg", "webp"],
        },
        (error: unknown, result: CloudinaryUploadWidgetResults) => {
          if (!error && result.event === "success") {
            const payload: UploadWidgetValue = {
              url: result.info.secure_url,
              publicId: result.info.public_id,
            };

            setPreview(payload);
            setDeleteToken(result.info.delete_token || null);
            onChangeRef.current?.(payload);
            widgetRef.current?.close(); // Close the widget immediately after success
          }

          return true;
        },
      );
      return true;
    };

    if (initializeWidget()) return;

    const intervalId = window.setInterval(() => {
      if (initializeWidget()) {
        window.clearInterval(intervalId);
      }
    }, 500);

    return () => clearInterval(intervalId);
  }, []);

  const openWidget = () => {
    if (!disabled) widgetRef.current?.open();
  };

  const removeFromCloudinary = async () => {
    setIsRemoving(true);
    try {
      if (deleteToken) {
        const url = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/delete_by_token`;
        await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: deleteToken }),
        });
      }
      onChangeRef.current?.(null);
      setPreview(null);
      setDeleteToken(null);
    } catch (error) {
      console.error("Error removing image", error);
    } finally {
      setIsRemoving(false);
    }
  };

  return (
    <div className="space-y-2">
      {preview ? (
        <div className="relative w-full h-48 rounded-lg overflow-hidden border border-border group">
          <img
            src={preview.url}
            alt="Preview"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Button
              type="button"
              variant="destructive"
              size="icon"
              onClick={removeFromCloudinary}
              disabled={isRemoving}
            >
              {isRemoving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Trash className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
      ) : (
        <div
          className="border-2 border-dashed border-border hover:border-primary transition-colors rounded-lg flex flex-col items-center justify-center p-6 cursor-pointer"
          role="button"
          tabIndex={0}
          onClick={openWidget}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              openWidget();
            }
          }}
        >
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <UploadCloud className="w-8 h-8" />
            <div className="text-center">
              <p className="font-medium">Click to upload photo</p>
              <p className="text-sm text-muted-foreground/80">
                PNG, JPG, WEBP up to 5MB
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadWidget;
