import { useState } from 'react';
import placeholderPhoto from '../../assets/photo-placeholder.svg';

// const CLOUD_BASE_URL = 'https://storage.yandexcloud.net/ed-platform-lectors';
const CLOUD_BASE_URL = 'https://raw.githubusercontent.com/acakp/ed-platform/refs/heads/main/lectors';

function getPhotoUrl(photoKey) {
  return `${CLOUD_BASE_URL}/${encodeURIComponent(photoKey)}.png`;
}

function LectorPhoto({ lector }) {
  const [hasError, setHasError] = useState(false);

  const src =
    hasError || !lector.photoKey ? placeholderPhoto : getPhotoUrl(lector.photoKey);

  return (
    <img
      src={src}
      alt=""
      width={480}
      height={480}
      decoding="async"
      onError={() => setHasError(true)}
    />
  );
}

export default LectorPhoto;
