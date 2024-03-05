import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import styles from './style.module.css';
import SortableList, { SortableItem } from 'react-easy-sort';
import { arrayMoveImmutable } from 'array-move';
import { FileData } from '@/type/file';
import { RiCloseFill } from 'react-icons/ri';

const ImageThumb = ({ file }: { file: FileData }) => {
  const [src, setSrc] = useState('');
  useEffect(() => {
    setSrc(URL.createObjectURL(file));

    return () => {
      src && URL.revokeObjectURL(src);
    };
  }, [file]);
  return <img src={src} />;
};

export default function DragUploadZone({
  files,
  setFiles,
}: {
  files: FileData[];
  setFiles: React.Dispatch<React.SetStateAction<FileData[]>>;
}) {
  const { getRootProps, getInputProps, open } = useDropzone({
    noDragEventsBubbling: true,
    noClick: true,
    onDrop: (acceptedFiles, fileRejections, event) => {
      if (event?.target && (event.target as HTMLElement).closest('.list')) {
        return;
      }
      setFiles((prev) => [
        ...prev,
        ...acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        ),
      ]);
    },
    accept: {
      'image/jpeg': [],
      'image/png': [],
    },
  });
  const onSortEnd = (oldIndex: number, newIndex: number) => {
    console.log(files);
    setFiles((array) => arrayMoveImmutable(array, oldIndex, newIndex));
  };
  const handleRemove = (index: number) => {
    setFiles((prev) => prev.filter((item, idx) => idx !== index));
  };
  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);
  return (
    <>
      <div {...getRootProps()} className={styles.box}>
        <input {...getInputProps()} />
        {!files.length ? (
          <div className={styles.ment}>
            이미지를 드래그해서 or
            <button onClick={open} className={styles.btn}>
              업로드
            </button>
          </div>
        ) : (
          <>
            <div
              className="list"
              onDrag={(e) => e.stopPropagation()}
              onDragStart={(e) => e.stopPropagation()}
            >
              <SortableList onSortEnd={onSortEnd} className={styles.list}>
                {files.map((item, index) => (
                  <SortableItem key={index}>
                    <div className={styles.item} data-index={index}>
                      <div className={styles.control}>
                        <span className={styles.badge}>{index + 1}</span>
                        <button className={styles.delete} onClick={() => handleRemove(index)}>
                          <RiCloseFill />
                        </button>
                      </div>
                      <div className={styles.noEvent}>
                        <div className={styles.thumbnail}>
                          <ImageThumb file={item} />
                        </div>
                        <div className={styles.info}>
                          <div className={styles.name}>{item.name}</div>
                          <div className={styles.size}>
                            {(item.size / 1024 / 1024).toFixed(2)}MB
                          </div>
                        </div>
                      </div>
                    </div>
                  </SortableItem>
                ))}
              </SortableList>
            </div>
            <div className={`${styles.ment} ${styles.more}`}>
              이미지를 드래그앤 드롭으로 더 추가 또는
              <button onClick={open} className={styles.btn}>
                추가 업로드
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
