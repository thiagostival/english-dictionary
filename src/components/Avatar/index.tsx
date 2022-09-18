import { useCallback, useEffect, useState } from 'react';

import { FaUserCircle } from 'react-icons/fa';

// STYLES
import { WrapperAvatar } from './styles';

// TYPES
interface IAvatarProps {
  src?: string;
}

export function Avatar({ src }: IAvatarProps) {
  const [imgAvatar, setImgAvatar] = useState<string>('');

  //! Pre Cache img
  const preloadImage = useCallback((url: string) => {
    return new Promise<string>((resolve, reject) => {
      const img = new Image();
      img.referrerPolicy = 'no-referrer';
      img.src = url;

      img.onload = () => {
        const cachedImage = url;
        resolve(cachedImage);
      };

      img.onerror = () => {
        reject(new Error('Error to load image'));
      };
    });
  }, []);

  const loadImage = useCallback(async () => {
    try {
      if (!src) return;

      const response = await preloadImage(src);
      setImgAvatar(response);
    } catch {
      //
    }
  }, [preloadImage, src]);

  useEffect(() => {
    loadImage();
  }, [loadImage]);

  return (
    <WrapperAvatar>
      {imgAvatar ? (
        <img
          referrerPolicy="no-referrer"
          src={imgAvatar}
          data-testid="avatar-img"
          alt="profile-avatar"
        />
      ) : (
        <FaUserCircle data-testid="avatar-icon" />
      )}
    </WrapperAvatar>
  );
}
