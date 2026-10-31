
import MenuSidebar from "./MenuSidebar";
import styles from "./layout.module.css";

type MenuLayoutProps = {
  children: React.ReactNode;
};

export default function MenuLayout({ children }: MenuLayoutProps) {
  return (
    <div className={styles.menuLayout}>
      <MenuSidebar />

      <div className={styles.menuLayoutContent}>{children}</div>
    </div>
  );
}
