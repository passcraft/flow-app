import tileBackground from 'public/images/ui/button_background_tileable.png';
import { ReactNode } from 'react';
import styles from './NavPanel.module.css';

interface Props {
  children: ReactNode;
}

const NavPanel = ({ children }: Props) => {
  return (
    <nav className={styles.navPanel}>
      <div className={styles.navButtonWrapper}>{children}</div>
    </nav>
  );
};

export default NavPanel;
