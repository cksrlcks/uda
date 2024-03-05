'use client';
import React, { useState } from 'react';
import DragUploadZone from '@/components/Upload';
import styles from './style.module.css';
import Button from '@/components/Button';
import { FileData } from '../../type/file';

export default function WritePage() {
  const [files, setFiles] = useState<FileData[]>([]);

  const handleSubmit = () => {
    console.log(files);
  };

  return (
    <>
      <div className={styles.frame}>
        <div className={styles.frameLeft}>
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>시안이미지 업로드</h3>
            <DragUploadZone files={files} setFiles={setFiles} />
          </section>
        </div>
        <div className={styles.frameRight}>
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>사이트제목</h3>
            <div className={styles.input}>
              <input type="text" />
            </div>
          </section>
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>프로젝트명(url에 쓰게될 영문 프로젝트명)</h3>
            <div className={styles.input}>
              <input type="text" />
            </div>
          </section>
          <div className={styles.control}>
            <Button onClick={handleSubmit}>PUBLISH</Button>
          </div>
        </div>
      </div>
    </>
  );
}
