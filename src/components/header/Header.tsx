import React, { useState } from "react";
import Icon from "../icon/Icon";

import styles from "./Header.module.scss";

const Header: React.FC = () => {
  return (
    <div className={styles.header}>
      <Icon src="icon48.png" alt="Club WPT" className={styles.headerIcon} />
      <h3 className={styles.headerTitle}>Club WPT</h3>
    </div>
  );
};

export default Header;
