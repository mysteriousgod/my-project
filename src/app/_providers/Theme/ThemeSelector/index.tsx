'use client'

import React from 'react'

import { Chevron } from '../../../_components/Chevron'
import { useTheme } from '..'
import { getImplicitPreference } from '../shared'
import { Theme, themeLocalStorageKey } from './types'

import classes from './index.module.scss'

export const ThemeSelector: React.FC = () => {
  const selectRef = React.useRef<HTMLSelectElement>(null)
  const { setTheme } = useTheme()
  const [show, setShow] = React.useState(false)

  const onThemeChange = (themeToSet: Theme & 'auto') => {
    if (themeToSet === 'auto') {
      setTheme(null)
      if (selectRef.current) selectRef.current.value = 'auto'
    } else {
      setTheme(themeToSet)
    }
  }

  React.useEffect(() => {
    const preference = window.localStorage.getItem(themeLocalStorageKey)
    if (selectRef.current) {
      selectRef.current.value = preference ?? 'auto'
      setShow(true)
    }
  }, [])

  return (
    <div className={[classes.selectContainer, !show && classes.hidden].filter(Boolean).join(' ')}>
      <label htmlFor="theme">
        <select
          id="theme"
          onChange={e => onThemeChange(e.target.value as Theme & 'auto')}
          ref={selectRef}
          className={classes.select}
        >
          <option value="auto">Auto</option>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
        <div className={classes.selectIcon}>
          <Chevron className={classes.iconUp} />
          <Chevron className={classes.iconDown} />
        </div>
      </label>
    </div>
  )
}
// import React from 'react';

// import { Chevron } from '../../../_components/Chevron';
// import { useTheme } from '..';
// import { Theme, themeLocalStorageKey } from './types';

// import classes from './index.module.scss';

// export const ThemeSelector: React.FC = () => {
//   const { setTheme } = useTheme();
//   const [theme, setLocalTheme] = React.useState<Theme | 'auto'>('auto');

//   React.useEffect(() => {
//     const savedTheme = localStorage.getItem(themeLocalStorageKey) as Theme | 'auto' || 'auto';
//     setLocalTheme(savedTheme);
//     setTheme(savedTheme === 'auto' ? null : savedTheme);
//   }, [setTheme]);

//   const onThemeChange = (newTheme: Theme | 'auto') => {
//     setLocalTheme(newTheme);
//     setTheme(newTheme === 'auto' ? null : newTheme);
//     localStorage.setItem(themeLocalStorageKey, newTheme);
//   };

//   return (
//     <div className={[classes.selectContainer, classes.themeSwitch].join(' ')} style={{fontsize:2}}>
//       {['auto', 'light', 'dark'].map((option) => (
//         <button
//           key={option}
//           className={`${classes.switchButton} ${theme === option ? classes.switchButtonActive : ''}`}
//           onClick={() => onThemeChange(option as Theme)}
//         >
//           {option.charAt(0).toUpperCase() + option.slice(1)}
//         </button>
//       ))}
//       <div className={`${classes.switchSelector} ${classes[theme]}`}></div>
//     </div>
//   );
// };
