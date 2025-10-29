import * as motion from "motion/react-client";
import KTUSA from "@public/icons/logos/KTU_SA_Logo.svg";
import styles from "./Logo.module.css";
import OptimizedImage from "@/components/common/OptimizedImage";
import Link from "next/link";
import { Transition } from "@node_modules/motion/dist";

export default function Logo({ isOpen }: Readonly<{ isOpen: boolean }>) {
  const spring: Transition = {
    type: "spring",
    stiffness: 350,
    damping: 30,
  };

  return (
    <div className={styles.Container}>
      <motion.div layout transition={spring}>
        <Link href="/">
          <OptimizedImage src={KTUSA} alt="Logo" height={110} />
        </Link>
      </motion.div>
    </div>
  );
}
