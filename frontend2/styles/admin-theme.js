/**
 * admin-theme.js
 * ══════════════════════════════════════════════════════════════
 * Vector Finance Admin — MUI Theme + Style Tokens
 *
 * Usage:
 *   import { adminTheme, sx, G } from '@/styles/admin-theme'
 *   import { ThemeProvider } from '@mui/material/styles'
 *   <ThemeProvider theme={adminTheme}>...</ThemeProvider>
 *
 * All logic in ActionOverview, LoanActions, AdminHome, etc. is
 * preserved verbatim — only visual tokens change.
 * ══════════════════════════════════════════════════════════════
 */

import { createTheme, alpha } from '@mui/material/styles'

/* ─── Colour tokens (same as CSS custom props above) ─────────── */
export const G = {
    page: '#0A0F1E',
    green1: '#059669',
    green2: '#10B981',
    green3: '#34D399',
    gold: '#C9A84C',
    goldL: '#E8C87A',
    red: '#F87171',
    blue: '#60A5FA',
    amber: '#FBBF24',
    purple: '#A78BFA',
    // surfaces
    surface: 'rgba(255,255,255,0.05)',
    border: 'rgba(255,255,255,0.08)',
    borderMd: 'rgba(255,255,255,0.14)',
    muted: 'rgba(255,255,255,0.38)',
    dim: 'rgba(255,255,255,0.05)',
    // semantic
    greenGlow: 'rgba(16,185,129,0.18)',
    greenBorder: 'rgba(16,185,129,0.22)',
    redBg: 'rgba(248,113,113,0.10)',
    redBorder: 'rgba(248,113,113,0.28)',
    blueBg: 'rgba(96,165,250,0.10)',
    blueBorder: 'rgba(96,165,250,0.25)',
    amberBg: 'rgba(251,191,36,0.10)',
    amberBorder: 'rgba(251,191,36,0.25)',
    goldBorder: 'rgba(201,168,76,0.28)',
    goldGlow: 'rgba(201,168,76,0.18)',
}

/* ─── Light mode token override ─────────────────────────────── */
export const GL = {
    page: '#F0F4F1',
    surface: 'rgba(255,255,255,0.82)',
    border: 'rgba(0,0,0,0.08)',
    borderMd: 'rgba(0,0,0,0.13)',
    muted: 'rgba(0,0,0,0.40)',
    textPrimary: '#0D1F17',
    textSecondary: 'rgba(13,31,23,0.60)',
}

/* ─── Typography faces ──────────────────────────────────────── */
export const FONTS = {
    display: "'DM Serif Display', Georgia, serif",
    body: "'DM Sans', system-ui, -apple-system, sans-serif",
    mono: "'JetBrains Mono', 'Courier New', monospace",
}

/* ─── Status → colour map ───────────────────────────────────── */
export const statusColor = (s) => {
    const m = {
        'initiated': G.amber,
        'pending-collateral-addition': G.amber,
        'pending-collateral-inspection': G.amber,
        'collateral-inspection': G.purple,
        'request-approval': '#818CF8',
        'accepted': G.green3,
        'pending-approval': G.purple,
        'approved': G.green2,
        'disbursed': G.blue,
        'completed': '#9CA3AF',
        'rejected': G.red,
        'defaulted': '#DC2626',
    }
    return m[s] || '#9CA3AF'
}

/* ─── Shared MUI sx helpers ─────────────────────────────────── */
export const sx = {
    // Paper / card
    paper: {
        background: G.surface,
        border: `1px solid ${G.border}`,
        borderRadius: '16px',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
    },
    paperGreen: {
        background: `linear-gradient(135deg, rgba(16,185,129,0.10), rgba(5,150,105,0.04))`,
        border: `1px solid ${G.greenBorder}`,
        borderRadius: '16px',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
    },
    paperGold: {
        background: `linear-gradient(135deg, rgba(201,168,76,0.10), rgba(201,168,76,0.03))`,
        border: `1px solid ${G.goldBorder}`,
        borderRadius: '16px',
    },

    // Buttons
    btnPrimary: {
        background: `linear-gradient(135deg, ${G.green1} 0%, ${G.green2} 55%, ${G.green1} 100%)`,
        backgroundSize: '200% auto',
        color: '#fff',
        fontFamily: FONTS.body,
        fontWeight: 700,
        borderRadius: '10px',
        textTransform: 'none',
        boxShadow: '0 4px 16px rgba(16,185,129,0.28)',
        '&:hover': {
            backgroundPosition: 'right center',
            boxShadow: '0 6px 22px rgba(16,185,129,0.38)',
        },
    },
    btnGold: {
        background: `linear-gradient(135deg, #B8922A 0%, ${G.gold} 55%, #B8922A 100%)`,
        backgroundSize: '200% auto',
        color: '#fff',
        fontFamily: FONTS.body,
        fontWeight: 700,
        borderRadius: '10px',
        textTransform: 'none',
        boxShadow: '0 4px 16px rgba(201,168,76,0.25)',
        '&:hover': {
            backgroundPosition: 'right center',
            boxShadow: '0 6px 22px rgba(201,168,76,0.35)',
        },
    },
    btnOutlineGreen: {
        color: G.green2,
        borderColor: G.greenBorder,
        borderRadius: '10px',
        fontFamily: FONTS.body,
        fontWeight: 600,
        textTransform: 'none',
        '&:hover': { background: G.greenGlow, borderColor: 'rgba(16,185,129,0.45)' },
    },
    btnOutlineRed: {
        color: G.red,
        borderColor: G.redBorder,
        borderRadius: '10px',
        fontFamily: FONTS.body,
        fontWeight: 600,
        textTransform: 'none',
        '&:hover': { background: G.redBg },
    },
    btnDangerSolid: {
        background: 'linear-gradient(135deg, #b91c1c 0%, #dc2626 100%)',
        color: '#fff',
        fontFamily: FONTS.body,
        fontWeight: 700,
        borderRadius: '10px',
        textTransform: 'none',
        boxShadow: '0 4px 14px rgba(220,38,38,0.30)',
        '&:hover': { boxShadow: '0 6px 20px rgba(220,38,38,0.40)' },
    },
    btnGhost: {
        background: G.surface,
        color: G.muted,
        border: `1px solid ${G.border}`,
        borderRadius: '10px',
        fontFamily: FONTS.body,
        fontWeight: 500,
        textTransform: 'none',
        '&:hover': { background: 'rgba(255,255,255,0.08)', color: '#fff' },
    },

    // Inputs
    inputBase: {
        background: 'rgba(255,255,255,0.06)',
        borderRadius: '10px',
        fontFamily: FONTS.body,
        '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.15)' },
        '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(16,185,129,0.35)' },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: G.green2, boxShadow: '0 0 0 3px rgba(16,185,129,0.18)' },
        '& input, & textarea': { color: '#fff', fontFamily: FONTS.body },
        '& .MuiInputLabel-root': { color: G.muted, fontFamily: FONTS.body },
    },
    inputLabel: {
        color: G.muted,
        fontFamily: FONTS.body,
        fontSize: '13.5px',
    },

    // Chips
    chip: {
        background: 'rgba(255,255,255,0.07)',
        color: 'rgba(255,255,255,0.75)',
        borderColor: G.border,
        borderRadius: '100px',
        fontFamily: FONTS.body,
        fontWeight: 600,
        fontSize: '11px',
    },
    chipActive: {
        background: 'rgba(16,185,129,0.16)',
        color: G.green3,
        borderColor: 'rgba(16,185,129,0.40)',
        borderRadius: '100px',
        fontFamily: FONTS.body,
        fontWeight: 600,
        fontSize: '11px',
    },

    // Dividers
    divider: { borderColor: G.border },
    dividerGreen: {
        background: `linear-gradient(90deg, transparent, ${G.greenBorder}, transparent)`,
        border: 'none',
        height: '1px',
    },

    // Alerts
    alertInfo: { borderRadius: '12px', background: G.blueBg, border: `1px solid ${G.blueBorder}`, color: G.blue, fontFamily: FONTS.body },
    alertSuccess: { borderRadius: '12px', background: 'rgba(16,185,129,0.09)', border: `1px solid ${G.greenBorder}`, color: G.green3, fontFamily: FONTS.body },
    alertWarning: { borderRadius: '12px', background: G.amberBg, border: `1px solid ${G.amberBorder}`, color: G.amber, fontFamily: FONTS.body },
    alertError: { borderRadius: '12px', background: G.redBg, border: `1px solid ${G.redBorder}`, color: G.red, fontFamily: FONTS.body },

    // Dialog
    dialog: {
        background: 'linear-gradient(180deg, #081A10 0%, #040D07 100%)',
        border: `1px solid ${G.greenBorder}`,
        borderRadius: '20px',
        boxShadow: '0 24px 80px rgba(0,0,0,0.65)',
    },
    dialogTitle: {
        fontFamily: FONTS.display,
        fontWeight: 400,
        color: '#fff',
        fontSize: '20px',
    },

    // Circular progress
    progress: { color: G.green2 },

    // Avatar
    avatar: {
        background: `linear-gradient(135deg, rgba(16,185,129,0.22), rgba(5,150,105,0.08))`,
        border: `1.5px solid ${G.greenBorder}`,
        borderRadius: '12px',
        color: G.green3,
        fontFamily: FONTS.display,
    },

    // Typography helpers
    label: {
        fontSize: '10px',
        fontWeight: 700,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: G.muted,
        fontFamily: FONTS.body,
    },
    mono: { fontFamily: FONTS.mono, fontWeight: 500 },
    display: { fontFamily: FONTS.display, fontWeight: 400 },
}

/* ─── Full MUI theme ────────────────────────────────────────── */
export const adminTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: { main: G.green2, dark: G.green1, light: G.green3 },
        secondary: { main: G.gold, light: G.goldL },
        error: { main: G.red },
        warning: { main: G.amber },
        info: { main: G.blue },
        success: { main: G.green2 },
        background: {
            default: G.page,
            paper: 'rgba(255,255,255,0.05)',
        },
        text: {
            primary: '#FFFFFF',
            secondary: G.muted,
            disabled: 'rgba(255,255,255,0.25)',
        },
        divider: G.border,
    },

    typography: {
        fontFamily: FONTS.body,
        h1: { fontFamily: FONTS.display, fontWeight: 400, color: '#fff' },
        h2: { fontFamily: FONTS.display, fontWeight: 400, color: '#fff' },
        h3: { fontFamily: FONTS.display, fontWeight: 400, color: '#fff' },
        h4: { fontFamily: FONTS.body, fontWeight: 700, color: '#fff', fontSize: '18px' },
        h5: { fontFamily: FONTS.body, fontWeight: 700, color: '#fff', fontSize: '15px' },
        h6: { fontFamily: FONTS.body, fontWeight: 700, color: '#fff', fontSize: '13px' },
        body1: { fontFamily: FONTS.body, fontSize: '14px', color: '#fff' },
        body2: { fontFamily: FONTS.body, fontSize: '13px', color: G.muted },
        caption: { fontFamily: FONTS.body, fontSize: '11px', color: G.muted },
        subtitle2: { fontFamily: FONTS.body, fontSize: '11px', fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: G.muted },
        button: { fontFamily: FONTS.body, fontWeight: 700, textTransform: 'none' },
    },

    shape: { borderRadius: 12 },

    components: {
        /* ── Paper ── */
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                    background: 'rgba(255,255,255,0.05)',
                    border: `1px solid rgba(255,255,255,0.08)`,
                    borderRadius: '16px',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                },
            },
        },

        /* ── Button ── */
        MuiButton: {
            styleOverrides: {
                root: {
                    fontFamily: FONTS.body,
                    fontWeight: 700,
                    borderRadius: '10px',
                    textTransform: 'none',
                    transition: 'all 0.22s',
                    letterSpacing: '0.01em',
                },
                containedPrimary: {
                    background: `linear-gradient(135deg, ${G.green1} 0%, ${G.green2} 55%, ${G.green1} 100%)`,
                    backgroundSize: '200% auto',
                    boxShadow: '0 4px 16px rgba(16,185,129,0.28)',
                    '&:hover': {
                        backgroundPosition: 'right center',
                        boxShadow: '0 6px 22px rgba(16,185,129,0.38)',
                    },
                },
                containedSuccess: {
                    background: `linear-gradient(135deg, ${G.green1} 0%, ${G.green2} 55%, ${G.green1} 100%)`,
                    backgroundSize: '200% auto',
                    boxShadow: '0 4px 16px rgba(16,185,129,0.28)',
                },
                containedWarning: {
                    background: `linear-gradient(135deg, #B8922A 0%, ${G.gold} 55%, #B8922A 100%)`,
                    backgroundSize: '200% auto',
                    color: '#fff',
                    boxShadow: '0 4px 14px rgba(201,168,76,0.25)',
                },
                containedError: {
                    background: 'linear-gradient(135deg, #b91c1c 0%, #dc2626 100%)',
                    boxShadow: '0 4px 14px rgba(220,38,38,0.28)',
                },
                outlinedPrimary: {
                    color: G.green2,
                    borderColor: G.greenBorder,
                    '&:hover': { background: G.greenGlow, borderColor: 'rgba(16,185,129,0.45)' },
                },
                outlinedError: {
                    color: G.red,
                    borderColor: G.redBorder,
                    '&:hover': { background: G.redBg },
                },
                outlinedWarning: {
                    color: G.amber,
                    borderColor: G.amberBorder,
                    '&:hover': { background: G.amberBg },
                },
                outlinedSecondary: {
                    color: G.goldL,
                    borderColor: G.goldBorder,
                    '&:hover': { background: G.goldGlow },
                },
                outlined: {
                    '&:disabled': { opacity: 0.38 },
                },
            },
        },

        /* ── TextField / OutlinedInput ── */
        MuiTextField: { defaultProps: { variant: 'outlined' } },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    background: 'rgba(255,255,255,0.06)',
                    borderRadius: '10px',
                    fontFamily: FONTS.body,
                    '& fieldset': { borderColor: 'rgba(255,255,255,0.15)' },
                    '&:hover fieldset': { borderColor: 'rgba(16,185,129,0.35)' },
                    '&.Mui-focused fieldset': { borderColor: G.green2 },
                },
                input: { color: '#fff', fontFamily: FONTS.body },
                multiline: { color: '#fff', fontFamily: FONTS.body },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: { color: G.muted, fontFamily: FONTS.body, fontSize: '13.5px' },
                shrunk: { color: `${G.green3} !important` },
            },
        },
        MuiInputAdornment: {
            styleOverrides: {
                root: { color: G.muted },
            },
        },

        /* ── Select ── */
        MuiSelect: {
            styleOverrides: {
                select: { color: '#fff', fontFamily: FONTS.body },
                icon: { color: G.green2 },
            },
        },
        MuiMenu: {
            styleOverrides: {
                paper: {
                    background: '#081510',
                    border: `1px solid ${G.greenBorder}`,
                    borderRadius: '12px',
                },
            },
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    color: '#fff',
                    fontFamily: FONTS.body,
                    fontSize: '13.5px',
                    '&:hover': { background: G.greenGlow },
                    '&.Mui-selected': { background: 'rgba(16,185,129,0.12)' },
                },
            },
        },

        /* ── Chip ── */
        MuiChip: {
            styleOverrides: {
                root: {
                    fontFamily: FONTS.body,
                    fontWeight: 600,
                    fontSize: '11px',
                    borderRadius: '100px',
                    background: 'rgba(255,255,255,0.07)',
                    color: 'rgba(255,255,255,0.75)',
                    border: `1px solid rgba(255,255,255,0.10)`,
                    '&.MuiChip-colorPrimary': {
                        background: 'rgba(16,185,129,0.16)',
                        color: G.green3,
                        border: `1px solid rgba(16,185,129,0.35)`,
                    },
                    '&.MuiChip-colorWarning': {
                        background: 'rgba(251,191,36,0.14)',
                        color: G.amber,
                        border: `1px solid rgba(251,191,36,0.30)`,
                    },
                    '&.MuiChip-colorError': {
                        background: 'rgba(248,113,113,0.14)',
                        color: G.red,
                        border: `1px solid rgba(248,113,113,0.30)`,
                    },
                },
                clickable: {
                    '&:hover': {
                        background: G.greenGlow,
                        borderColor: G.greenBorder,
                        color: G.green3,
                    },
                },
            },
        },

        /* ── Alert ── */
        MuiAlert: {
            styleOverrides: {
                root: {
                    borderRadius: '12px',
                    fontFamily: FONTS.body,
                    fontSize: '13.5px',
                    alignItems: 'flex-start',
                },
                standardInfo: { background: G.blueBg, border: `1px solid ${G.blueBorder}`, color: G.blue },
                standardSuccess: { background: 'rgba(16,185,129,0.09)', border: `1px solid ${G.greenBorder}`, color: G.green3 },
                standardWarning: { background: G.amberBg, border: `1px solid ${G.amberBorder}`, color: G.amber },
                standardError: { background: G.redBg, border: `1px solid ${G.redBorder}`, color: G.red },
                filledInfo: { background: G.blueBg, color: G.blue },
                filledSuccess: { background: 'rgba(16,185,129,0.12)', color: G.green3 },
                filledWarning: { background: G.amberBg, color: G.amber },
                filledError: { background: G.redBg, color: G.red },
                icon: { color: 'inherit !important' },
            },
        },

        /* ── Dialog ── */
        MuiDialog: {
            styleOverrides: {
                paper: {
                    background: 'linear-gradient(180deg, #081A10 0%, #040D07 100%)',
                    border: `1px solid ${G.greenBorder}`,
                    borderRadius: '20px',
                    boxShadow: '0 24px 80px rgba(0,0,0,0.65)',
                },
            },
        },
        MuiDialogTitle: {
            styleOverrides: {
                root: {
                    fontFamily: FONTS.display,
                    fontWeight: 400,
                    color: '#fff',
                    fontSize: '20px',
                },
            },
        },
        MuiDialogContent: {
            styleOverrides: {
                root: { color: 'rgba(255,255,255,0.72)', fontFamily: FONTS.body },
            },
        },
        MuiDialogActions: {
            styleOverrides: {
                root: { padding: '12px 24px 20px' },
            },
        },
        MuiBackdrop: {
            styleOverrides: {
                root: {
                    background: 'rgba(3,10,6,0.72)',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                },
            },
        },

        /* ── Divider ── */
        MuiDivider: {
            styleOverrides: {
                root: { borderColor: 'rgba(255,255,255,0.08)' },
            },
        },

        /* ── Avatar ── */
        MuiAvatar: {
            styleOverrides: {
                root: {
                    background: `linear-gradient(135deg, rgba(16,185,129,0.22), rgba(5,150,105,0.08))`,
                    border: `1.5px solid ${G.greenBorder}`,
                    borderRadius: '12px',
                    color: G.green3,
                    fontFamily: FONTS.display,
                },
            },
        },

        /* ── Card ── */
        MuiCard: {
            styleOverrides: {
                root: {
                    background: 'rgba(255,255,255,0.05)',
                    border: `1px solid rgba(255,255,255,0.08)`,
                    borderRadius: '16px',
                    backgroundImage: 'none',
                },
            },
        },

        /* ── Pagination ── */
        MuiPaginationItem: {
            styleOverrides: {
                root: {
                    color: 'rgba(255,255,255,0.55)',
                    fontFamily: FONTS.body,
                    borderRadius: '8px',
                    '&.Mui-selected': {
                        background: 'rgba(16,185,129,0.18)',
                        color: G.green3,
                    },
                    '&:hover': { background: G.greenGlow },
                },
            },
        },

        /* ── LinearProgress ── */
        MuiLinearProgress: {
            styleOverrides: {
                root: {
                    background: 'rgba(255,255,255,0.07)',
                    borderRadius: '100px',
                    height: '5px',
                },
                bar: {
                    background: `linear-gradient(90deg, ${G.green1}, ${G.green3})`,
                    borderRadius: '100px',
                },
            },
        },

        /* ── CircularProgress ── */
        MuiCircularProgress: {
            styleOverrides: {
                root: { color: G.green2 },
            },
        },

        /* ── Snackbar / Snack alert ── */
        MuiSnackbarContent: {
            styleOverrides: {
                root: {
                    background: '#0D1A10',
                    border: `1px solid ${G.greenBorder}`,
                    borderRadius: '12px',
                    fontFamily: FONTS.body,
                    color: '#fff',
                },
            },
        },

        /* ── Radio ── */
        MuiRadio: {
            styleOverrides: {
                root: { color: G.green2 },
            },
        },
        MuiFormControlLabel: {
            styleOverrides: {
                label: { color: 'rgba(255,255,255,0.75)', fontFamily: FONTS.body, fontSize: '14px' },
            },
        },
        MuiFormLabel: {
            styleOverrides: {
                root: { color: G.muted, fontFamily: FONTS.body, fontSize: '12px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' },
            },
        },

        /* ── Tooltip ── */
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    background: '#081510',
                    border: `1px solid ${G.greenBorder}`,
                    color: '#fff',
                    borderRadius: '8px',
                    fontFamily: FONTS.body,
                    fontSize: '12px',
                },
                arrow: { color: '#081510' },
            },
        },

        /* ── IconButton ── */
        MuiIconButton: {
            styleOverrides: {
                root: {
                    color: 'rgba(255,255,255,0.55)',
                    transition: 'all 0.18s',
                    '&:hover': {
                        background: G.greenGlow,
                        color: G.green2,
                    },
                },
            },
        },

        /* ── Slider ── */
        MuiSlider: {
            styleOverrides: {
                root: { color: G.green2 },
                track: { background: `linear-gradient(90deg, ${G.green1}, ${G.green3})` },
                thumb: {
                    background: G.green2,
                    boxShadow: `0 0 0 4px ${G.greenGlow}`,
                },
            },
        },

        /* ── TextField FilledInput variant (used in search bars) ── */
        MuiFilledInput: {
            styleOverrides: {
                root: {
                    background: 'rgba(255,255,255,0.06)',
                    borderRadius: '10px',
                    fontFamily: FONTS.body,
                    '&:before, &:after': { display: 'none' },
                    '&:hover': { background: 'rgba(255,255,255,0.09)' },
                    '&.Mui-focused': { background: 'rgba(255,255,255,0.09)' },
                },
                input: { color: '#fff', fontFamily: FONTS.body, padding: '10px 14px' },
            },
        },
    },
})

/* ─── Light mode theme (toggle via ThemeProvider) ───────────── */
export const adminThemeLight = createTheme({
    ...adminTheme,
    palette: {
        mode: 'light',
        primary: { main: G.green1, dark: '#047857', light: G.green2 },
        secondary: { main: G.gold, light: G.goldL },
        error: { main: '#DC2626' },
        warning: { main: '#D97706' },
        info: { main: '#2563EB' },
        success: { main: G.green1 },
        background: { default: GL.page, paper: '#FFFFFF' },
        text: { primary: GL.textPrimary, secondary: GL.textSecondary, disabled: 'rgba(13,31,23,0.35)' },
        divider: GL.border,
    },
    components: {
        ...adminTheme.components,
        MuiPaper: {
            styleOverrides: {
                root: {
                    background: '#FFFFFF',
                    border: `1px solid rgba(0,0,0,0.08)`,
                    borderRadius: '16px',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
                },
            },
        },
        MuiDialog: {
            styleOverrides: {
                paper: {
                    background: '#FFFFFF',
                    border: `1px solid rgba(0,0,0,0.08)`,
                    borderRadius: '20px',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.12)',
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    background: '#FFFFFF',
                    borderRadius: '10px',
                    '& fieldset': { borderColor: 'rgba(0,0,0,0.18)' },
                    '&:hover fieldset': { borderColor: 'rgba(5,150,105,0.5)' },
                    '&.Mui-focused fieldset': { borderColor: G.green1 },
                },
                input: { color: GL.textPrimary },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: { color: GL.textSecondary },
                shrunk: { color: `${G.green1} !important` },
            },
        },
        MuiMenu: {
            styleOverrides: {
                paper: { background: '#FFFFFF', border: `1px solid rgba(0,0,0,0.08)`, borderRadius: '12px' },
            },
        },
        MuiMenuItem: {
            styleOverrides: {
                root: { color: GL.textPrimary, '&:hover': { background: 'rgba(5,150,105,0.06)' } },
            },
        },
        MuiCard: {
            styleOverrides: { root: { background: '#FFFFFF', border: `1px solid rgba(0,0,0,0.08)` } },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    background: 'rgba(0,0,0,0.05)',
                    color: GL.textSecondary,
                    border: `1px solid rgba(0,0,0,0.10)`,
                    '&.MuiChip-colorPrimary': { background: 'rgba(5,150,105,0.10)', color: G.green1 },
                },
            },
        },
        MuiBackdrop: {
            styleOverrides: { root: { background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(6px)' } },
        },
    },
})

/* ─── Convenience: sx prop builder for status pills ─────────── */
export function pillSx(status) {
    const c = statusColor(status)
    return {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        padding: '2px 10px',
        borderRadius: '100px',
        fontSize: '9.5px',
        fontWeight: 700,
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
        whiteSpace: 'nowrap',
        background: `${c}18`,
        color: c,
        '&::before': {
            content: '""',
            display: 'block',
            width: '5px',
            height: '5px',
            borderRadius: '50%',
            background: c,
            flexShrink: 0,
        },
    }
}

/* ─── Apply to wrapper (class shorthand) ─────────────────────── */
export const VF_CLASS = 'vf-admin' // add to root wrapper div

/* ─── Animated page wrapper component (optional) ─────────────── */
export const PAGE_SX = {
    minHeight: '100vh',
    background: G.page,
    backgroundImage: `
    radial-gradient(ellipse 80% 45% at 50% -5%, rgba(16,185,129,0.12) 0%, transparent 65%),
    radial-gradient(ellipse 55% 35% at 90% 90%, rgba(5,150,105,0.07) 0%, transparent 55%)
  `,
    backgroundAttachment: 'fixed',
    pt: '72px',
    pb: '100px',
    position: 'relative',
    overflowX: 'hidden',
    fontFamily: FONTS.body,
}