// components/common/ProfileAvatar.tsx
import { User } from 'lucide-react';
import { useState } from 'react';

interface ProfileAvatarProps {
  imageUrl?: string;
  phoneNumber?: string;
  isOnline?: boolean;
  size?: number;
  borderRadius?: number;
}

const ProfileAvatar = ({
  imageUrl,
  phoneNumber,
  isOnline = false,
  borderRadius = 9999,
  size = 44,
}: ProfileAvatarProps) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="relative shrink-0">
      <div
        style={{ width: size, height: size, borderRadius: borderRadius }}
        className="overflow-hidden"
      >
        {imageUrl && !imgError ? (
          <img
            src={imageUrl}
            alt={`Profile ${phoneNumber}`}
            loading="lazy"
            onError={() => setImgError(true)}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="bg-muted flex h-full w-full items-center justify-center">
            <User size={size * 0.5} className="text-muted-foreground" />
          </div>
        )}
      </div>

      {/* Online indicator */}
      {isOnline && (
        <span className="border-background absolute right-3 bottom-1 h-3 w-3 rounded-full border-2 bg-green-500" />
      )}
    </div>
  );
};

export default ProfileAvatar;
