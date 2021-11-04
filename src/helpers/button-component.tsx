import theme from '../styles/ThemeStyles'

type variant = 'solid' | 'outline' | 'ghost' | 'link'

export function getButtonColors(variant: variant) {
  switch (variant) {
    case 'solid':
      return [
        theme.dark.text1,
        theme.dark.primary,
        theme.dark.primaryHover,
        theme.dark.primaryActive
      ]
    case 'outline':
      return [
        theme.dark.primary,
        theme.dark.primary,
        theme.dark.primaryHover,
        theme.dark.primaryActive
      ]
  }
}
