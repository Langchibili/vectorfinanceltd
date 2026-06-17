// 'use client'

// /**
//  * ThemeProvider.jsx
//  * Wraps the app in a MUI theme that responds to a dark/light toggle.
//  * Persists the preference to localStorage under 'vf_theme'.
//  *
//  * Exports:
//  *   default        — <VFThemeProvider> wrapper (goes in layout.js)
//  *   useThemeMode   — { isDark, toggleTheme } hook for any child component
//  */

// import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
// import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles'
// import CssBaseline from '@mui/material/CssBaseline'

// /* ─── colour tokens ──────────────────────────────────────────── */
// const G = {
//     green1: '#059669',
//     green2: '#10B981',
//     green3: '#34D399',
//     gold: '#C9A84C',
//     goldL: '#E8C87A',
//     red: '#F87171',
//     blue: '#60A5FA',
//     amber: '#FBBF24',
// }

// const FONTS = {
//     display: "'DM Serif Display', Georgia, serif",
//     body: "'DM Sans', system-ui, -apple-system, sans-serif",
//     mono: "'JetBrains Mono', 'Courier New', monospace",
// }

// /* ─── build MUI theme for a given mode ───────────────────────── */
// function buildTheme(mode) {
//     const dark = mode === 'dark'
//     return createTheme({
//         palette: {
//             mode,
//             primary: { main: G.green2, dark: G.green1, light: G.green3 },
//             secondary: { main: G.gold, light: G.goldL },
//             error: { main: G.red },
//             warning: { main: G.amber },
//             info: { main: G.blue },
//             success: { main: G.green2 },
//             background: {
//                 default: dark ? '#0A0F1E' : '#F0F4F1',
//                 paper: dark ? 'rgba(255,255,255,0.05)' : '#FFFFFF',
//             },
//             text: {
//                 primary: dark ? '#FFFFFF' : '#0D1F17',
//                 secondary: dark ? 'rgba(255,255,255,0.55)' : 'rgba(13,31,23,0.60)',
//                 disabled: dark ? 'rgba(255,255,255,0.28)' : 'rgba(13,31,23,0.35)',
//             },
//             divider: dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
//         },

//         typography: {
//             fontFamily: FONTS.body,
//             h1: { fontFamily: FONTS.display, fontWeight: 400 },
//             h2: { fontFamily: FONTS.display, fontWeight: 400 },
//             h3: { fontFamily: FONTS.display, fontWeight: 400 },
//             h4: { fontFamily: FONTS.body, fontWeight: 700, fontSize: '18px' },
//             h5: { fontFamily: FONTS.body, fontWeight: 700, fontSize: '15px' },
//             h6: { fontFamily: FONTS.body, fontWeight: 700, fontSize: '13px' },
//             body1: { fontFamily: FONTS.body, fontSize: '14px' },
//             body2: { fontFamily: FONTS.body, fontSize: '13px' },
//             caption: { fontFamily: FONTS.body, fontSize: '11px' },
//             subtitle2: { fontFamily: FONTS.body, fontSize: '11px', fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' },
//             button: { fontFamily: FONTS.body, fontWeight: 700, textTransform: 'none' },
//         },

//         shape: { borderRadius: 12 },

//         components: {
//             MuiPaper: {
//                 styleOverrides: {
//                     root: {
//                         backgroundImage: 'none',
//                         background: dark ? 'rgba(255,255,255,0.05)' : '#FFFFFF',
//                         border: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
//                         borderRadius: 16,
//                         backdropFilter: dark ? 'blur(16px)' : 'none',
//                         WebkitBackdropFilter: dark ? 'blur(16px)' : 'none',
//                     },
//                 },
//             },
//             MuiButton: {
//                 styleOverrides: {
//                     root: { fontFamily: FONTS.body, fontWeight: 700, borderRadius: 10, textTransform: 'none', transition: 'all 0.22s' },
//                     containedPrimary: {
//                         background: `linear-gradient(135deg, ${G.green1} 0%, ${G.green2} 55%, ${G.green1} 100%)`,
//                         backgroundSize: '200% auto',
//                         boxShadow: '0 4px 16px rgba(16,185,129,0.28)',
//                         '&:hover': { backgroundPosition: 'right center', boxShadow: '0 6px 22px rgba(16,185,129,0.38)' },
//                     },
//                     containedWarning: {
//                         background: `linear-gradient(135deg, #B8922A 0%, ${G.gold} 55%, #B8922A 100%)`,
//                         backgroundSize: '200% auto',
//                         color: '#fff',
//                         boxShadow: '0 4px 14px rgba(201,168,76,0.25)',
//                     },
//                     containedError: {
//                         background: 'linear-gradient(135deg, #b91c1c 0%, #dc2626 100%)',
//                         boxShadow: '0 4px 14px rgba(220,38,38,0.28)',
//                     },
//                     outlinedPrimary: {
//                         color: G.green2,
//                         borderColor: 'rgba(16,185,129,0.22)',
//                         '&:hover': { background: 'rgba(16,185,129,0.08)', borderColor: 'rgba(16,185,129,0.45)' },
//                     },
//                     outlinedError: {
//                         color: G.red,
//                         borderColor: 'rgba(248,113,113,0.28)',
//                         '&:hover': { background: 'rgba(248,113,113,0.08)' },
//                     },
//                 },
//             },
//             MuiOutlinedInput: {
//                 styleOverrides: {
//                     root: {
//                         background: dark ? 'rgba(255,255,255,0.06)' : '#FFFFFF',
//                         borderRadius: 10,
//                         '& fieldset': { borderColor: dark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.18)' },
//                         '&:hover fieldset': { borderColor: dark ? 'rgba(16,185,129,0.35)' : 'rgba(5,150,105,0.5)' },
//                         '&.Mui-focused fieldset': { borderColor: G.green2 },
//                     },
//                     input: { color: dark ? '#fff' : '#0D1F17', fontFamily: FONTS.body },
//                 },
//             },
//             MuiInputLabel: {
//                 styleOverrides: {
//                     root: { color: dark ? 'rgba(255,255,255,0.38)' : 'rgba(13,31,23,0.50)', fontFamily: FONTS.body },
//                     shrunk: { color: `${G.green2} !important` },
//                 },
//             },
//             MuiChip: {
//                 styleOverrides: {
//                     root: {
//                         fontFamily: FONTS.body,
//                         fontWeight: 600,
//                         borderRadius: 100,
//                         background: dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.05)',
//                         color: dark ? 'rgba(255,255,255,0.75)' : 'rgba(13,31,23,0.65)',
//                         '&.MuiChip-colorPrimary': { background: 'rgba(16,185,129,0.15)', color: G.green3 },
//                     },
//                 },
//             },
//             MuiAlert: {
//                 styleOverrides: {
//                     root: { borderRadius: 12, fontFamily: FONTS.body },
//                     standardSuccess: { background: 'rgba(16,185,129,0.09)', border: '1px solid rgba(16,185,129,0.22)', color: G.green3 },
//                     standardInfo: { background: 'rgba(96,165,250,0.10)', border: '1px solid rgba(96,165,250,0.25)', color: G.blue },
//                     standardWarning: { background: 'rgba(251,191,36,0.10)', border: '1px solid rgba(251,191,36,0.25)', color: G.amber },
//                     standardError: { background: 'rgba(248,113,113,0.10)', border: '1px solid rgba(248,113,113,0.28)', color: G.red },
//                     icon: { color: 'inherit !important' },
//                 },
//             },
//             MuiDialog: {
//                 styleOverrides: {
//                     paper: {
//                         background: dark ? 'linear-gradient(180deg,#081A10,#040D07)' : '#FFFFFF',
//                         border: `1px solid ${dark ? 'rgba(16,185,129,0.22)' : 'rgba(0,0,0,0.08)'}`,
//                         borderRadius: 20,
//                         boxShadow: dark ? '0 24px 80px rgba(0,0,0,0.65)' : '0 20px 60px rgba(0,0,0,0.12)',
//                     },
//                 },
//             },
//             MuiDivider: {
//                 styleOverrides: {
//                     root: { borderColor: dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)' },
//                 },
//             },
//             MuiCard: {
//                 styleOverrides: {
//                     root: {
//                         background: dark ? 'rgba(255,255,255,0.05)' : '#FFFFFF',
//                         border: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
//                         borderRadius: 16,
//                         backgroundImage: 'none',
//                     },
//                 },
//             },
//             MuiCircularProgress: {
//                 styleOverrides: { root: { color: G.green2 } },
//             },
//             MuiLinearProgress: {
//                 styleOverrides: {
//                     root: { background: dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)', borderRadius: 100, height: 5 },
//                     bar: { background: `linear-gradient(90deg, ${G.green1}, ${G.green3})`, borderRadius: 100 },
//                 },
//             },
//             MuiIconButton: {
//                 styleOverrides: {
//                     root: {
//                         color: dark ? 'rgba(255,255,255,0.55)' : 'rgba(13,31,23,0.55)',
//                         '&:hover': { background: 'rgba(16,185,129,0.10)', color: G.green2 },
//                     },
//                 },
//             },
//             MuiSelect: {
//                 styleOverrides: {
//                     select: { color: dark ? '#fff' : '#0D1F17', fontFamily: FONTS.body },
//                     icon: { color: G.green2 },
//                 },
//             },
//             MuiMenu: {
//                 styleOverrides: {
//                     paper: {
//                         background: dark ? '#081510' : '#FFFFFF',
//                         border: `1px solid ${dark ? 'rgba(16,185,129,0.22)' : 'rgba(0,0,0,0.08)'}`,
//                         borderRadius: 12,
//                     },
//                 },
//             },
//             MuiMenuItem: {
//                 styleOverrides: {
//                     root: {
//                         color: dark ? '#fff' : '#0D1F17',
//                         fontFamily: FONTS.body,
//                         '&:hover': { background: 'rgba(16,185,129,0.08)' },
//                         '&.Mui-selected': { background: 'rgba(16,185,129,0.12)' },
//                     },
//                 },
//             },
//             MuiTooltip: {
//                 styleOverrides: {
//                     tooltip: {
//                         background: dark ? '#081510' : '#0D1F17',
//                         border: `1px solid ${dark ? 'rgba(16,185,129,0.22)' : 'rgba(0,0,0,0.12)'}`,
//                         color: '#fff',
//                         borderRadius: 8,
//                         fontFamily: FONTS.body,
//                         fontSize: 12,
//                     },
//                 },
//             },
//             MuiAvatar: {
//                 styleOverrides: {
//                     root: {
//                         background: 'linear-gradient(135deg,rgba(16,185,129,0.22),rgba(5,150,105,0.08))',
//                         border: '1.5px solid rgba(16,185,129,0.22)',
//                         borderRadius: 12,
//                         color: G.green3,
//                         fontFamily: FONTS.display,
//                     },
//                 },
//             },
//             MuiPaginationItem: {
//                 styleOverrides: {
//                     root: {
//                         color: dark ? 'rgba(255,255,255,0.55)' : 'rgba(13,31,23,0.55)',
//                         fontFamily: FONTS.body,
//                         borderRadius: 8,
//                         '&.Mui-selected': { background: 'rgba(16,185,129,0.18)', color: G.green3 },
//                         '&:hover': { background: 'rgba(16,185,129,0.10)' },
//                     },
//                 },
//             },
//             MuiRadio: {
//                 styleOverrides: { root: { color: G.green2 } },
//             },
//             MuiFormControlLabel: {
//                 styleOverrides: {
//                     label: { fontFamily: FONTS.body, fontSize: '14px' },
//                 },
//             },
//             MuiSnackbarContent: {
//                 styleOverrides: {
//                     root: {
//                         background: dark ? '#0D1A10' : '#0D1F17',
//                         border: '1px solid rgba(16,185,129,0.22)',
//                         borderRadius: 12,
//                         fontFamily: FONTS.body,
//                         color: '#fff',
//                     },
//                 },
//             },
//         },
//     })
// }

// /* ─── context ────────────────────────────────────────────────── */
// const ThemeModeCtx = createContext({ isDark: true, toggleTheme: () => { } })

// export function useThemeMode() {
//     return useContext(ThemeModeCtx)
// }

// /* ─── provider ───────────────────────────────────────────────── */
// export default function VFThemeProvider({ children }) {
//     const [mode, setMode] = useState('dark')

//     // Rehydrate from localStorage once on mount
//     useEffect(() => {
//         try {
//             const saved = localStorage.getItem('vf_theme')
//             if (saved === 'light' || saved === 'dark') setMode(saved)
//         } catch { }
//     }, [])

//     // Sync data-theme attribute on <html> for CSS custom property consumers
//     useEffect(() => {
//         document.documentElement.setAttribute('data-theme', mode)
//         try { localStorage.setItem('vf_theme', mode) } catch { }
//     }, [mode])

//     const toggleTheme = () => setMode(m => (m === 'dark' ? 'light' : 'dark'))

//     const theme = useMemo(() => buildTheme(mode), [mode])

//     const ctx = useMemo(() => ({ isDark: mode === 'dark', toggleTheme }), [mode])

//     return (
//         <ThemeModeCtx.Provider value={ctx}>
//             <MuiThemeProvider theme={theme}>
//                 <CssBaseline />
//                 {children}
//             </MuiThemeProvider>
//         </ThemeModeCtx.Provider>
//     )
// }
'use client'

/**
 * ThemeProvider.jsx
 * Wraps the app in a MUI theme that responds to a dark/light toggle.
 * Persists the preference to localStorage under 'vf_theme'.
 *
 * Default mode: 'light' (was 'dark'). Falls back to whatever the
 * person last picked, via localStorage rehydration below.
 *
 * Exports:
 *   default        — <VFThemeProvider> wrapper (goes in layout.js)
 *   useThemeMode   — { isDark, toggleTheme } hook for any child component
 */

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

/* ─── colour tokens ──────────────────────────────────────────── */
const G = {
    green1: '#059669',
    green2: '#10B981',
    green3: '#34D399',
    gold: '#C9A84C',
    goldL: '#E8C87A',
    red: '#F87171',
    blue: '#60A5FA',
    amber: '#FBBF24',
}

const FONTS = {
    display: "'DM Serif Display', Georgia, serif",
    body: "'DM Sans', system-ui, -apple-system, sans-serif",
    mono: "'JetBrains Mono', 'Courier New', monospace",
}

/* ─── build MUI theme for a given mode ───────────────────────── */
function buildTheme(mode) {
    const dark = mode === 'dark'
    return createTheme({
        palette: {
            mode,
            primary: { main: G.green2, dark: G.green1, light: G.green3 },
            secondary: { main: G.gold, light: G.goldL },
            error: { main: G.red },
            warning: { main: G.amber },
            info: { main: G.blue },
            success: { main: G.green2 },
            background: {
                default: dark ? '#0A0F1E' : '#F0F4F1',
                paper: dark ? 'rgba(255,255,255,0.05)' : '#FFFFFF',
            },
            text: {
                primary: dark ? '#FFFFFF' : '#0D1F17',
                secondary: dark ? 'rgba(255,255,255,0.55)' : 'rgba(13,31,23,0.60)',
                disabled: dark ? 'rgba(255,255,255,0.28)' : 'rgba(13,31,23,0.35)',
            },
            divider: dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
        },

        typography: {
            fontFamily: FONTS.body,
            h1: { fontFamily: FONTS.display, fontWeight: 400 },
            h2: { fontFamily: FONTS.display, fontWeight: 400 },
            h3: { fontFamily: FONTS.display, fontWeight: 400 },
            h4: { fontFamily: FONTS.body, fontWeight: 700, fontSize: '18px' },
            h5: { fontFamily: FONTS.body, fontWeight: 700, fontSize: '15px' },
            h6: { fontFamily: FONTS.body, fontWeight: 700, fontSize: '13px' },
            body1: { fontFamily: FONTS.body, fontSize: '14px' },
            body2: { fontFamily: FONTS.body, fontSize: '13px' },
            caption: { fontFamily: FONTS.body, fontSize: '11px' },
            subtitle2: { fontFamily: FONTS.body, fontSize: '11px', fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' },
            button: { fontFamily: FONTS.body, fontWeight: 700, textTransform: 'none' },
        },

        shape: { borderRadius: 12 },

        components: {
            MuiPaper: {
                styleOverrides: {
                    root: {
                        backgroundImage: 'none',
                        background: dark ? 'rgba(255,255,255,0.05)' : '#FFFFFF',
                        border: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
                        borderRadius: 16,
                        backdropFilter: dark ? 'blur(16px)' : 'none',
                        WebkitBackdropFilter: dark ? 'blur(16px)' : 'none',
                    },
                },
            },
            MuiButton: {
                styleOverrides: {
                    root: { fontFamily: FONTS.body, fontWeight: 700, borderRadius: 10, textTransform: 'none', transition: 'all 0.22s' },
                    containedPrimary: {
                        background: `linear-gradient(135deg, ${G.green1} 0%, ${G.green2} 55%, ${G.green1} 100%)`,
                        backgroundSize: '200% auto',
                        boxShadow: '0 4px 16px rgba(16,185,129,0.28)',
                        '&:hover': { backgroundPosition: 'right center', boxShadow: '0 6px 22px rgba(16,185,129,0.38)' },
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
                        borderColor: 'rgba(16,185,129,0.22)',
                        '&:hover': { background: 'rgba(16,185,129,0.08)', borderColor: 'rgba(16,185,129,0.45)' },
                    },
                    outlinedError: {
                        color: G.red,
                        borderColor: 'rgba(248,113,113,0.28)',
                        '&:hover': { background: 'rgba(248,113,113,0.08)' },
                    },
                },
            },
            MuiOutlinedInput: {
                styleOverrides: {
                    root: {
                        background: dark ? 'rgba(255,255,255,0.06)' : '#FFFFFF',
                        borderRadius: 10,
                        '& fieldset': { borderColor: dark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.18)' },
                        '&:hover fieldset': { borderColor: dark ? 'rgba(16,185,129,0.35)' : 'rgba(5,150,105,0.5)' },
                        '&.Mui-focused fieldset': { borderColor: G.green2 },
                    },
                    input: { color: dark ? '#fff' : '#0D1F17', fontFamily: FONTS.body },
                },
            },
            MuiInputLabel: {
                styleOverrides: {
                    root: { color: dark ? 'rgba(255,255,255,0.38)' : 'rgba(13,31,23,0.50)', fontFamily: FONTS.body },
                    shrunk: { color: `${G.green2} !important` },
                },
            },
            MuiChip: {
                styleOverrides: {
                    root: {
                        fontFamily: FONTS.body,
                        fontWeight: 600,
                        borderRadius: 100,
                        background: dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.05)',
                        color: dark ? 'rgba(255,255,255,0.75)' : 'rgba(13,31,23,0.65)',
                        '&.MuiChip-colorPrimary': { background: 'rgba(16,185,129,0.15)', color: G.green3 },
                    },
                },
            },
            MuiAlert: {
                styleOverrides: {
                    root: { borderRadius: 12, fontFamily: FONTS.body },
                    standardSuccess: { background: 'rgba(16,185,129,0.09)', border: '1px solid rgba(16,185,129,0.22)', color: G.green3 },
                    standardInfo: { background: 'rgba(96,165,250,0.10)', border: '1px solid rgba(96,165,250,0.25)', color: G.blue },
                    standardWarning: { background: 'rgba(251,191,36,0.10)', border: '1px solid rgba(251,191,36,0.25)', color: G.amber },
                    standardError: { background: 'rgba(248,113,113,0.10)', border: '1px solid rgba(248,113,113,0.28)', color: G.red },
                    icon: { color: 'inherit !important' },
                },
            },
            MuiDialog: {
                styleOverrides: {
                    paper: {
                        background: dark ? 'linear-gradient(180deg,#081A10,#040D07)' : '#FFFFFF',
                        border: `1px solid ${dark ? 'rgba(16,185,129,0.22)' : 'rgba(0,0,0,0.08)'}`,
                        borderRadius: 20,
                        boxShadow: dark ? '0 24px 80px rgba(0,0,0,0.65)' : '0 20px 60px rgba(0,0,0,0.12)',
                    },
                },
            },
            MuiDivider: {
                styleOverrides: {
                    root: { borderColor: dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)' },
                },
            },
            MuiCard: {
                styleOverrides: {
                    root: {
                        background: dark ? 'rgba(255,255,255,0.05)' : '#FFFFFF',
                        border: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
                        borderRadius: 16,
                        backgroundImage: 'none',
                    },
                },
            },
            MuiCircularProgress: {
                styleOverrides: { root: { color: G.green2 } },
            },
            MuiLinearProgress: {
                styleOverrides: {
                    root: { background: dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)', borderRadius: 100, height: 5 },
                    bar: { background: `linear-gradient(90deg, ${G.green1}, ${G.green3})`, borderRadius: 100 },
                },
            },
            MuiIconButton: {
                styleOverrides: {
                    root: {
                        color: dark ? 'rgba(255,255,255,0.55)' : 'rgba(13,31,23,0.55)',
                        '&:hover': { background: 'rgba(16,185,129,0.10)', color: G.green2 },
                    },
                },
            },
            MuiSelect: {
                styleOverrides: {
                    select: { color: dark ? '#fff' : '#0D1F17', fontFamily: FONTS.body },
                    icon: { color: G.green2 },
                },
            },
            MuiMenu: {
                styleOverrides: {
                    paper: {
                        background: dark ? '#081510' : '#FFFFFF',
                        border: `1px solid ${dark ? 'rgba(16,185,129,0.22)' : 'rgba(0,0,0,0.08)'}`,
                        borderRadius: 12,
                    },
                },
            },
            MuiMenuItem: {
                styleOverrides: {
                    root: {
                        color: dark ? '#fff' : '#0D1F17',
                        fontFamily: FONTS.body,
                        '&:hover': { background: 'rgba(16,185,129,0.08)' },
                        '&.Mui-selected': { background: 'rgba(16,185,129,0.12)' },
                    },
                },
            },
            MuiTooltip: {
                styleOverrides: {
                    tooltip: {
                        background: dark ? '#081510' : '#0D1F17',
                        border: `1px solid ${dark ? 'rgba(16,185,129,0.22)' : 'rgba(0,0,0,0.12)'}`,
                        color: '#fff',
                        borderRadius: 8,
                        fontFamily: FONTS.body,
                        fontSize: 12,
                    },
                },
            },
            MuiAvatar: {
                styleOverrides: {
                    root: {
                        background: 'linear-gradient(135deg,rgba(16,185,129,0.22),rgba(5,150,105,0.08))',
                        border: '1.5px solid rgba(16,185,129,0.22)',
                        borderRadius: 12,
                        color: G.green3,
                        fontFamily: FONTS.display,
                    },
                },
            },
            MuiPaginationItem: {
                styleOverrides: {
                    root: {
                        color: dark ? 'rgba(255,255,255,0.55)' : 'rgba(13,31,23,0.55)',
                        fontFamily: FONTS.body,
                        borderRadius: 8,
                        '&.Mui-selected': { background: 'rgba(16,185,129,0.18)', color: G.green3 },
                        '&:hover': { background: 'rgba(16,185,129,0.10)' },
                    },
                },
            },
            MuiRadio: {
                styleOverrides: { root: { color: G.green2 } },
            },
            MuiFormControlLabel: {
                styleOverrides: {
                    label: { fontFamily: FONTS.body, fontSize: '14px' },
                },
            },
            MuiSnackbarContent: {
                styleOverrides: {
                    root: {
                        background: dark ? '#0D1A10' : '#0D1F17',
                        border: '1px solid rgba(16,185,129,0.22)',
                        borderRadius: 12,
                        fontFamily: FONTS.body,
                        color: '#fff',
                    },
                },
            },
        },
    })
}

/* ─── context ────────────────────────────────────────────────── */
const ThemeModeCtx = createContext({ isDark: false, toggleTheme: () => { } })

export function useThemeMode() {
    return useContext(ThemeModeCtx)
}

/* ─── provider ───────────────────────────────────────────────── */
export default function VFThemeProvider({ children }) {
    // Default theme is LIGHT. localStorage (below) overrides this once
    // we know what the person picked last time.
    const [mode, setMode] = useState('light')

    // Rehydrate from localStorage once on mount
    useEffect(() => {
        try {
            const saved = localStorage.getItem('vf_theme')
            if (saved === 'light' || saved === 'dark') setMode(saved)
        } catch { }
    }, [])

    // Sync data-theme attribute on <html> for CSS custom property consumers
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', mode)
        try { localStorage.setItem('vf_theme', mode) } catch { }
    }, [mode])

    const toggleTheme = () => setMode(m => (m === 'dark' ? 'light' : 'dark'))

    const theme = useMemo(() => buildTheme(mode), [mode])

    const ctx = useMemo(() => ({ isDark: mode === 'dark', toggleTheme }), [mode])

    return (
        <ThemeModeCtx.Provider value={ctx}>
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </MuiThemeProvider>
        </ThemeModeCtx.Provider>
    )
}