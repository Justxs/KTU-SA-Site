'use client';

import {
  ContentBlockResponse,
  getPdfTitleFromUrl,
  isDirectVideoFileUrl,
  toVideoEmbedUrl,
} from '@api/helpers';
import CloseIcon from '@mui/icons-material/Close';
import OpenInFullRoundedIcon from '@mui/icons-material/OpenInFullRounded';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { Box, Dialog, IconButton, Typography } from '@mui/material';
import colors from '@theme/colors';
import stringService from '@utils/stringService';
import Image from 'next/image';
import { useState } from 'react';
import DocumentDialog from '@components/documents/DocumentDialog';
import DocumentListCard from '@components/documents/DocumentListCard';
import ContentImageCarousel from './ContentImageCarousel';

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

const pdfIconSx = { fontSize: 26, color: colors.mediumBlue, transition: 'color 0.2s ease' };

function getBlockContentKey(block: ContentBlockResponse): string {
  if (block.type === 'paragraph') return `paragraph-${block.html ?? ''}`;
  if (block.type === 'image') return `image-${block.imageUrl ?? ''}`;
  if (block.type === 'video') return `video-${block.videoUrl ?? ''}`;
  if (block.type === 'pdf') return `pdf-${block.pdfUrl ?? ''}`;
  if (block.type === 'carousel') return `carousel-${(block.imageUrls ?? []).join('|')}`;
  return block.type;
}

function addHeadingIds(html: string, usedIds: Map<string, number>): string {
  return html.replaceAll(
    /<h([1-6])([^>]*)>([\s\S]*?)<\/h\1>/gi,
    (fullMatch, level, attrs, inner) => {
      const headingText = inner
        .replaceAll(/<[^>]*>/g, ' ')
        .replaceAll(/\s+/g, ' ')
        .trim();
      const slug = stringService.toSlug(headingText);
      if (!slug) return fullMatch;

      const count = (usedIds.get(slug) ?? 0) + 1;
      usedIds.set(slug, count);
      const uniqueId = count === 1 ? slug : `${slug}-${count}`;
      const attrsWithoutId = String(attrs).replaceAll(/\sid\s*=\s*(".*?"|'.*?'|[^\s>]+)/gi, '');

      return `<h${level}${attrsWithoutId} id="${uniqueId}">${inner}</h${level}>`;
    },
  );
}

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

  return (
    <Box
      sx={{
        mb: '32px',
        color: colors.nearBlackText,
        fontSize: '17px',
        lineHeight: 1.7,
        wordBreak: 'break-word',
        overflowWrap: 'break-word',
        '@media (max-width: 768px)': {
          fontSize: '16px',
          lineHeight: 1.65,
        },
      }}
    >
      {blocks.map((block, blockIndex) => {
        const blockKey = getUniqueKey(getBlockContentKey(block));

        if (block.type === 'paragraph' && block.html) {
          const paragraphHtml = addHeadingIds(block.html, headingIdCounts);

          return (
            <Box
              // Paragraph content is trusted CMS HTML.
              dangerouslySetInnerHTML={{ __html: paragraphHtml }}
              key={blockKey}
              sx={{
                mb: '12px',
                '& p': {
                  mt: 0,
                  mb: '12px',
                  lineHeight: 1.7,
                },
                '& h1, & h2': {
                  color: colors.primaryDark,
                  fontSize: '24px',
                  fontWeight: 700,
                  lineHeight: 1.35,
                  mt: '44px',
                  mb: '16px',
                  letterSpacing: '-0.015em',
                },
                '& h3, & h4, & h5, & h6': {
                  color: colors.darkBlueSecondary,
                  fontSize: '20px',
                  fontWeight: 700,
                  lineHeight: 1.4,
                  mt: '36px',
                  mb: '12px',
                  letterSpacing: '-0.01em',
                },
                '& h1:first-child, & h2:first-child, & h3:first-child, & h4:first-child, & h5:first-child, & h6:first-child':
                  {
                    mt: 0,
                  },
                '& a': {
                  color: colors.linkBlue,
                  letterSpacing: '0.01em',
                  textDecoration: 'underline',
                  textDecorationColor: 'rgba(35, 131, 212, 0.3)',
                  textDecorationThickness: '1.5px',
                  textUnderlineOffset: '3px',
                  borderRadius: '3px',
                  p: '1px 3px',
                  m: '-1px -3px',
                },
                '& strong, & b': {
                  fontWeight: 700,
                  color: '#1a2a3a',
                },
                '& ul, & ol': {
                  pl: '24px',
                  mt: 0,
                  mb: '18px',
                },
                '& li': {
                  mb: '8px',
                  lineHeight: 1.75,
                  pl: '4px',
                },
                '& li::marker': {
                  color: colors.linkBlue,
                },
                '& blockquote': {
                  borderLeft: `4px solid ${colors.linkBlue}`,
                  m: '28px 0',
                  p: '14px 24px',
                  bgcolor: colors.lightBlueBg,
                  borderRadius: '0 8px 8px 0',
                  color: colors.darkBlueSecondary,
                  fontStyle: 'italic',
                  lineHeight: 1.7,
                },
                '& blockquote p:last-child': {
                  mb: 0,
                },
                '@media (max-width: 768px)': {
                  '& h1, & h2': {
                    fontSize: '20px',
                    mt: '32px',
                    mb: '12px',
                  },
                  '& h3, & h4, & h5, & h6': {
                    fontSize: '18px',
                    mt: '26px',
                    mb: '10px',
                  },
                },
              }}
            />
          );
        }

        if (block.type === 'image' && block.imageUrl) {
          const imageAlt = `Content image ${blockIndex + 1}`;

          return (
            <Box
              key={blockKey}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                m: '24px 0',
              }}
            >
              <Box
                component="button"
                type="button"
                aria-label={`Open ${imageAlt} preview`}
                onClick={() => openImagePreview(block.imageUrl as string, imageAlt)}
                sx={{
                  position: 'relative',
                  width: '100%',
                  maxWidth: { xs: '100%', md: '920px' },
                  border: '1px solid rgba(14, 38, 67, 0.08)',
                  p: 0,
                  m: 0,
                  bgcolor: '#fff',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  cursor: 'zoom-in',
                  display: 'block',
                  boxShadow: '0 8px 24px rgba(14, 38, 67, 0.08)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  '&:hover': {
                    transform: 'translateY(-1px)',
                    boxShadow: '0 14px 32px rgba(14, 38, 67, 0.14)',
                  },
                }}
              >
                <Image
                  src={block.imageUrl}
                  alt={imageAlt}
                  width={1400}
                  height={900}
                  sizes="(max-width: 768px) calc(100vw - 32px), 920px"
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 34,
                    height: 34,
                    borderRadius: '50%',
                    bgcolor: 'rgba(0, 0, 0, 0.55)',
                    color: '#fff',
                    pointerEvents: 'none',
                  }}
                >
                  <OpenInFullRoundedIcon sx={{ fontSize: 18 }} />
                </Box>
              </Box>
            </Box>
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
          const videoUrl = block.videoUrl.trim();

          if (isDirectVideoFileUrl(videoUrl)) {
            return (
              <Box
                key={blockKey}
                sx={{
                  m: '24px 0',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 2px 12px rgba(14, 38, 67, 0.08)',
                }}
              >
                <Box
                  component="video"
                  controls
                  preload="metadata"
                  src={videoUrl}
                  sx={{
                    display: 'block',
                    width: '100%',
                    height: 'auto',
                    maxHeight: '70vh',
                    bgcolor: '#000',
                  }}
                />
              </Box>
            );
          }

          const embedUrl = toVideoEmbedUrl(videoUrl);

          return (
            <Box
              key={blockKey}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                m: '28px 0',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 2px 12px rgba(14, 38, 67, 0.08)',
                '@media (max-width: 768px)': {
                  m: '20px -16px',
                  borderRadius: 0,
                },
              }}
            >
              <Box
                component="iframe"
                src={embedUrl}
                title="Embedded video"
                loading="lazy"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                sx={{
                  border: 'none',
                  borderRadius: '12px',
                  maxWidth: '100%',
                  width: '100%',
                  aspectRatio: '16 / 9',
                  '@media (max-width: 768px)': {
                    borderRadius: 0,
                  },
                }}
              />
            </Box>
          );
        }

        if (block.type === 'pdf' && block.pdfUrl) {
          const pdfUrl = block.pdfUrl;
          const pdfTitle = getPdfTitleFromUrl(pdfUrl);

          return (
            <Box key={blockKey} sx={{ m: '16px 0' }}>
              <DocumentListCard
                icon={<PictureAsPdfIcon sx={pdfIconSx} />}
                onClick={() => {
                  setSelectedPdf({ title: pdfTitle, pdfUrl });
                }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: 14, sm: 15 },
                    fontWeight: 600,
                    color: colors.primaryDark,
                    lineHeight: 1.4,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {pdfTitle}
                </Typography>
                <Typography
                  sx={{
                    fontSize: 12,
                    color: colors.grayText,
                    mt: 0.25,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    fontWeight: 500,
                  }}
                >
                  PDF
                </Typography>
              </DocumentListCard>
            </Box>
          );
        }

        return null;
      })}

      <DocumentDialog
        title={selectedPdf?.title}
        pdfUrl={selectedPdf?.pdfUrl}
        open={Boolean(selectedPdf)}
        handleClose={() => setSelectedPdf(null)}
      />

      <Dialog
        open={Boolean(selectedImage)}
        onClose={() => setSelectedImage(null)}
        maxWidth={false}
        fullScreen
        disableScrollLock
        slotProps={{
          backdrop: {
            sx: {
              bgcolor: 'rgba(6, 21, 40, 0.86)',
              backdropFilter: 'blur(4px)',
            },
          },
          paper: {
            sx: {
              m: 0,
              borderRadius: 0,
              bgcolor: 'transparent',
              boxShadow: 'none',
              overflow: 'visible',
            },
          },
        }}
      >
        <Box
          sx={{
            height: '100dvh',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            p: { xs: 2, md: 4 },
          }}
        >
          {selectedImage && (
            <Box
              sx={{
                display: 'inline-flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 1.5,
              }}
            >
              <Image
                src={selectedImage.url}
                alt={selectedImage.alt}
                width={2200}
                height={1400}
                sizes="100vw"
                style={{
                  width: 'auto',
                  height: 'auto',
                  maxWidth: 'min(94vw, 1400px)',
                  maxHeight: 'calc(100dvh - 80px)',
                  objectFit: 'contain',
                  borderRadius: '10px',
                  boxShadow: '0 18px 44px rgba(0, 0, 0, 0.45)',
                  background: '#fff',
                }}
              />
            </Box>
          )}

          <IconButton
            aria-label="Close image preview"
            onClick={() => setSelectedImage(null)}
            sx={{
              position: 'fixed',
              top: { xs: 10, md: 18 },
              right: { xs: 10, md: 18 },
              color: '#fff',
              bgcolor: 'rgba(0, 0, 0, 0.38)',
              '&:hover': {
                bgcolor: 'rgba(0, 0, 0, 0.56)',
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </Dialog>
    </Box>
  );
}
