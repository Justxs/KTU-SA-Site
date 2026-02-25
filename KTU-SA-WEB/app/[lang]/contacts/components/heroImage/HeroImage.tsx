import { Box, Stack, Tooltip, Typography } from '@mui/material';
import { getLocale, getTranslations } from 'next-intl/server';
import { getHeroImage } from '@api/GetHeroImage';
import { getMainContacts } from '@api/GetContacts';
import { SA_UNITS } from '@constants/saUnits';
import { SOCIAL_LINKS } from '@constants/SocialLinks';
import Image from 'next/image';
import colors from '@theme/colors';
import {
    HERO_BLUR_PLACEHOLDER,
    bottomAccentBar,
    iconBox,
    socialIconBtn,
    contactLink,
} from '@theme/styles';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FacebookIcon from '@public/icons/social/icon-facebook.svg';
import InstagramIcon from '@public/icons/social/icon-instagram.svg';
import LinkedInIcon from '@public/icons/social/icon-linkedin.svg';

const ACCENT = colors.mediumBlue;
const contactLinkSx = contactLink();
const iconBoxSx = iconBox();
const socialBtnSx = socialIconBtn();

export default async function HeroImage({ sectionName }: Readonly<{ sectionName: string }>) {
    const t = await getTranslations();
    const locale = await getLocale();
    const heroSection = await getHeroImage(locale, sectionName);
    const mainContacts = await getMainContacts(SA_UNITS.CSA);

    return (
        <Stack
            sx={{
                bgcolor: colors.lightBlueBg,
                position: 'relative',
                mb: { xs: '32px', md: '48px' },
            }}
        >
            <Stack
                sx={{
                    px: { xs: '20px', md: '64px' },
                    py: { xs: '36px', md: '56px' },
                    gap: { xs: '32px', md: '48px' },
                    flexDirection: { xs: 'column', md: 'row' },
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {/* Left panel — title + contacts */}
                <Stack
                    sx={{
                        alignItems: { xs: 'center', md: 'flex-start' },
                        textAlign: { xs: 'center', md: 'left' },
                        gap: '28px',
                        flex: 1,
                        maxWidth: { xs: '100%', md: 520 },
                    }}
                >
                    {/* Title + description */}
                    <Stack sx={{ gap: '12px' }}>
                        <Typography
                            component="h1"
                            sx={{
                                color: colors.primaryDark,
                                fontFamily: 'PFDinTextPro-Medium',
                                fontSize: { xs: '28px', sm: '34px', md: '40px' },
                                lineHeight: 1.15,
                            }}
                        >
                            {heroSection.title}
                        </Typography>
                        {heroSection.description && (
                            <Typography
                                sx={{
                                    color: colors.mediumBlue,
                                    fontSize: { xs: 16, md: 20 },
                                    letterSpacing: '0.8px',
                                    lineHeight: 1.5,
                                }}
                            >
                                {heroSection.description}
                            </Typography>
                        )}
                    </Stack>

                    {/* "Let's Talk" + contact rows */}
                    <Stack sx={{ gap: '16px', width: '100%' }}>
                        <Typography
                            component="h2"
                            sx={{
                                fontFamily: 'PFDinTextPro-Medium',
                                fontSize: { xs: '18px', md: '22px' },
                                color: colors.primaryDark,
                                m: 0,
                                opacity: 0.85,
                            }}
                        >
                            {t('mainContacts.letsTalk')}
                        </Typography>

                        <Stack sx={{ gap: '12px' }}>
                            {/* Email */}
                            <Stack direction="row" sx={{ alignItems: 'center', gap: '12px' }}>
                                <Box sx={iconBoxSx}>
                                    <EmailOutlinedIcon sx={{ fontSize: 18, color: ACCENT }} />
                                </Box>
                                <Box component="a" href={`mailto:${mainContacts.email}`} sx={contactLinkSx}>
                                    {mainContacts.email}
                                </Box>
                            </Stack>

                            {/* Phone */}
                            <Stack direction="row" sx={{ alignItems: 'center', gap: '12px' }}>
                                <Box sx={iconBoxSx}>
                                    <PhoneOutlinedIcon sx={{ fontSize: 18, color: ACCENT }} />
                                </Box>
                                <Box component="a" href={`tel:${mainContacts.phoneNumber}`} sx={contactLinkSx}>
                                    {mainContacts.phoneNumber}
                                </Box>
                            </Stack>

                            {/* Address */}
                            <Stack direction="row" sx={{ alignItems: 'center', gap: '12px' }}>
                                <Box sx={iconBoxSx}>
                                    <PlaceOutlinedIcon sx={{ fontSize: 18, color: ACCENT }} />
                                </Box>
                                <Box
                                    component="a"
                                    href={`http://maps.google.com/?q=${mainContacts.address}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={contactLinkSx}
                                >
                                    {mainContacts.address}
                                </Box>
                            </Stack>

                            {/* Working hours */}
                            <Stack direction="row" sx={{ alignItems: 'flex-start', gap: '12px' }}>
                                <Box sx={iconBoxSx}>
                                    <AccessTimeIcon sx={{ fontSize: 18, color: ACCENT }} />
                                </Box>
                                <Stack sx={{ gap: '6px', fontSize: 15, color: colors.primaryDark }}>
                                    <Box sx={{ fontWeight: 600, fontSize: 14, opacity: 0.6, letterSpacing: '0.5px' }}>
                                        {t('mainContacts.workingHours')}
                                    </Box>
                                    <Stack direction="row" sx={{ gap: '8px', alignItems: 'center' }}>
                                        <Box sx={{ minWidth: 130 }}>{t('mainContacts.weekdays')}</Box>
                                        <Box sx={{ opacity: 0.7 }}>{t('mainContacts.hours')}</Box>
                                    </Stack>
                                    <Stack direction="row" sx={{ gap: '8px', alignItems: 'center' }}>
                                        <Box sx={{ minWidth: 130 }}>{t('mainContacts.friday')}</Box>
                                        <Box sx={{ opacity: 0.7 }}>{t('mainContacts.friday_hours')}</Box>
                                    </Stack>
                                </Stack>
                            </Stack>
                        </Stack>

                        {/* Social icons */}
                        <Stack direction="row" sx={{ gap: '10px', mt: '4px' }}>
                            <Tooltip title="Facebook">
                                <Box
                                    component="a"
                                    href={SOCIAL_LINKS.FACEBOOK}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={socialBtnSx}
                                >
                                    <Image src={FacebookIcon} alt="Facebook" width={20} height={20} />
                                </Box>
                            </Tooltip>
                            <Tooltip title="Instagram">
                                <Box
                                    component="a"
                                    href={SOCIAL_LINKS.INSTAGRAM}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={socialBtnSx}
                                >
                                    <Image src={InstagramIcon} alt="Instagram" width={20} height={20} />
                                </Box>
                            </Tooltip>
                            <Tooltip title="LinkedIn">
                                <Box
                                    component="a"
                                    href={SOCIAL_LINKS.LINKEDIN}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={socialBtnSx}
                                >
                                    <Image src={LinkedInIcon} alt="LinkedIn" width={20} height={20} />
                                </Box>
                            </Tooltip>
                        </Stack>
                    </Stack>
                </Stack>

                {/* Right panel — hero image */}
                <Box
                    sx={{
                        position: 'relative',
                        width: { xs: '100%', sm: '80vw', md: '48%' },
                        maxWidth: 640,
                        aspectRatio: '16 / 10',
                        borderRadius: '16px',
                        overflow: 'hidden',
                        boxShadow: `0 16px 48px rgba(0,0,0,0.12), 0 0 0 3px ${ACCENT}`,
                        flexShrink: 0,
                    }}
                >
                    <Image
                        src={heroSection.imgSrc}
                        alt={heroSection.title}
                        fill
                        sizes="(max-width: 1000px) 80vw, 48vw"
                        priority
                        placeholder="blur"
                        blurDataURL={HERO_BLUR_PLACEHOLDER}
                        style={{
                            objectFit: 'cover',
                            objectPosition: 'top',
                        }}
                    />
                </Box>
            </Stack>

            {/* Bottom divider */}
            <Box sx={bottomAccentBar()} />
        </Stack>
    );
}
