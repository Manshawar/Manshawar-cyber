/*
 * @Author: Manshawar 825750768@qq.com
 * @Date: 2025-02-20 11:21:06
 * @LastEditors: Manshawar 825750768@qq.com
 * @LastEditTime: 2025-02-20 12:20:04
 * @FilePath: \Manshawar-cyber\apps\rspress\src\page\css\chart\threeDChart.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import myStyle from "./threeDChart.module.css";
const styles = myStyle;

export default () => {
  return (
    <div className={styles["cube-warp"]}>
      <div className={styles["bg-cube"]}>
        <div className={styles.yAxis}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className={styles.xAxis}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className={`${styles["bg-face"]} ${styles["bg-front"]}`}></div>
        <div className={`${styles["bg-face"]} ${styles["bg-back"]}`}></div>
        <div className={`${styles["bg-face"]} ${styles["bg-left"]}`}></div>
        <div className={`${styles["bg-face2"]} ${styles["bg-bottom"]}`}></div>
      </div>
      <div className={styles.c1}>
        <div className={styles.cube}>
          <div className={`${styles.face} ${styles.front}`}></div>
          <div className={`${styles.face} ${styles.back}`}></div>
          <div className={`${styles.face} ${styles.left}`}></div>
          <div className={`${styles.face} ${styles.right}`}></div>
          <div className={`${styles.face2} ${styles.top}`}></div>
        </div>
      </div>
      <div className={styles.c2}>
        <div className={styles.cube}>
          <div className={`${styles.face} ${styles.front}`}></div>
          <div className={`${styles.face} ${styles.back}`}></div>
          <div className={`${styles.face} ${styles.left}`}></div>
          <div className={`${styles.face} ${styles.right}`}></div>
          <div className={`${styles.face2} ${styles.top}`}></div>
        </div>
      </div>
      <div className={styles.c3}>
        <div className={styles.cube}>
          <div className={`${styles.face} ${styles.front}`}></div>
          <div className={`${styles.face} ${styles.back}`}></div>
          <div className={`${styles.face} ${styles.left}`}></div>
          <div className={`${styles.face} ${styles.right}`}></div>
          <div className={`${styles.face2} ${styles.top}`}></div>
        </div>
      </div>
      <div className={styles.c4}>
        <div className={styles.cube}>
          <div className={`${styles.face} ${styles.front}`}></div>
          <div className={`${styles.face} ${styles.back}`}></div>
          <div className={`${styles.face} ${styles.left}`}></div>
          <div className={`${styles.face} ${styles.right}`}></div>
          <div className={`${styles.face2} ${styles.top}`}></div>
        </div>
      </div>
    </div>
  );
};
