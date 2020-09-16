import React from 'react'

import styles from './style.module.scss'

const Button = ({ onChange, children, ...props }) => {
  return (
    <button className={styles.button} onChange={onChange} {...props}>
      {children}
    </button>
  )
}

export default Button
