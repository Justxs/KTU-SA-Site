'use client';

import { ContentBlockResponse } from '@api/helpers';
import { Box } from '@mui/material';
import colors from '@theme/colors';
import { useState } from 'react';
import DocumentDialog from '@components/documents/DocumentDialog';
import ContentImageBlock from './ContentImageBlock';
import ContentImageCarousel from './ContentImageCarousel';
import FullscreenImagePreview from './FullscreenImagePreview';
import ParagraphBlock from './ParagraphBlock';
import PdfBlockCard from './PdfBlockCard';
import VideoBlock from './VideoBlock';
import { getBlockContentKey } from './contentBlockUtils';

type Props = {
  blocks: Array<ContentBlockResponse>;
};

type SelectedPdf = {
  title: string;
  pdfUrl: string;
};

type PreviewImage = {
  url: string;
  alt: string;
};

const rootSx = {
  width: '100%',
  maxWidth: '100%',
  minWidth: 0,
  mb: { xs: '24px', md: '32px' },
  color: colors.nearBlackText,
  fontSize: { xs: '15px', sm: '16px', md: '17px' },
  lineHeight: 1.7,
  wordBreak: 'break-word',
  overflowWrap: 'break-word',
  '& *': {
    maxWidth: '100%',
  },
};

export default function ContentBlocks({ blocks }: Readonly<Props>) {
  const [selectedPdf, setSelectedPdf] = useState<SelectedPdf | null>(null);
  const [selectedImage, setSelectedImage] = useState<PreviewImage | null>(null);

  if (!blocks || blocks.length === 0) return null;

  const keyCounts = new Map<string, number>();
  const headingIdCounts = new Map<string, number>();

  const getUniqueKey = (base: string): string => {
    const count = keyCounts.get(base) ?? 0;
    keyCounts.set(base, count + 1);
    return count === 0 ? base : `${base}-${count}`;
  };

  const openImagePreview = (imageUrl: string, imageAlt: string): void => {
    setSelectedImage({ url: imageUrl, alt: imageAlt });
  };

  const openPdfPreview = (pdfUrl: string, pdfTitle: string): void => {
    setSelectedPdf({ title: pdfTitle, pdfUrl });
  };

  return (
    <Box sx={rootSx}>
      {blocks.map((block, blockIndex) => {
        const blockKey = getUniqueKey(getBlockContentKey(block));

        if (block.type === 'paragraph' && block.html) {
          return <ParagraphBlock key={blockKey} headingIdCounts={headingIdCounts} html={block.html} />;
        }

        if (block.type === 'image' && block.imageUrl) {
          return (
            <ContentImageBlock
              key={blockKey}
              imageAlt={`Content image ${blockIndex + 1}`}
              imageUrl={block.imageUrl}
              onOpen={openImagePreview}
            />
          );
        }

        if (block.type === 'carousel' && block.imageUrls && block.imageUrls.length > 0) {
          return (
            <ContentImageCarousel
              key={blockKey}
              imageUrls={block.imageUrls}
              onImageClick={openImagePreview}
            />
          );
        }

        if (block.type === 'video' && block.videoUrl) {
          return <VideoBlock key={blockKey} videoUrl={block.videoUrl} />;
        }

        if (block.type === 'pdf' && block.pdfUrl) {
          return <PdfBlockCard key={blockKey} onOpen={openPdfPreview} pdfUrl={block.pdfUrl} />;
        }

        return null;
      })}

      <DocumentDialog
        title={selectedPdf?.title}
        pdfUrl={selectedPdf?.pdfUrl}
        open={Boolean(selectedPdf)}
        handleClose={() => setSelectedPdf(null)}
      />

      <FullscreenImagePreview image={selectedImage} onClose={() => setSelectedImage(null)} />
    </Box>
  );
}
