// 画像アップロード機能は未実装
import type { InputHTMLAttributes } from 'react';

export type ImageInputProps = {
  id: InputHTMLAttributes<HTMLInputElement>['id'];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  fileInputRef: React.MutableRefObject<HTMLInputElement | null>;
};

export function ImageInput({
  id,
  onChange,
  fileInputRef,
  ...rest
}: ImageInputProps) {
  return (
    <input
      id={id}
      ref={fileInputRef}
      type="file"
      accept="image/*"
      onChange={onChange}
      hidden
      {...rest}
    />
  );
}
