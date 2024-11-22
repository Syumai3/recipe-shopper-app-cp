'use client';

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Image,
} from '@chakra-ui/react';
import React, { useRef, useState } from 'react';
import { ImageInput } from './ImageInput';

const IMAGE_ID = 'image';

export function SendImageForm() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState('');
  const [imageSource, setImageSource] = useState('');

  const selectFile = () => {
    if (!fileInputRef.current) return;
    fileInputRef.current.click();
  };

  const generateImageSource = (files: FileList) => {
    const file = files[0];
    const fileReader = new FileReader();
    setFileName(file.name);
    fileReader.onload = () => {
      setImageSource(fileReader.result as string);
    };
    fileReader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length <= 0) return;

    generateImageSource(files);
    setImageFile(files[0]);
  };

  const handleClickCancelButton = () => {
    setFileName('');
    setImageSource('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  console.log(imageFile);

  return (
    <Box
      as="form"
      w="250px"
      h="150px"
      p={4}
      borderWidth={1}
      borderRadius="md"
      boxShadow="md"
    >
      <FormControl mb={3}>
        <Button
          onClick={selectFile}
          variant="outline"
          width="100%"
          height="80px"
          aspectRatio={16 / 9}
        >
          {fileName ? (
            <Image
              src={imageSource}
              alt="アップロード画像"
              objectFit="contain"
              maxWidth="100%"
              maxHeight="100%"
            />
          ) : (
            '画像をアップロード'
          )}
        </Button>
        <ImageInput
          fileInputRef={fileInputRef}
          onChange={handleFileChange}
          id={IMAGE_ID}
        />
      </FormControl>

      {/* キャンセルボタン */}
      <HStack spacing={4} justify="flex-end">
        <Button onClick={handleClickCancelButton} variant="outline" size="sm">
          ×
        </Button>
      </HStack>
    </Box>
  );
}
