import React, { useState } from 'react';
import styles from './ArchiveEmployee.module.css';

interface ArchiveEmployeeProps {
  employeeId: string;
  employeeName: string;
}

function ArchiveEmployee({ employeeId, employeeName }: ArchiveEmployeeProps) {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleArchive = async () => {
    try {
      // Here you would implement the actual archive logic
      // For example, making an API call to update the employee status
      console.log(`Archiving employee ${employeeId}`);
      
      // Close the confirmation dialog
      setShowConfirmation(false);
    } catch (error) {
      console.error('Error archiving employee:', error);
    }
  };

  return (
    <>
      <button
        onClick={() => setShowConfirmation(true)}
        className={styles.archiveButton}
        aria-label="Archive employee"
      >
        <img
          src="/archives.png"
          alt="Archive"
          className="w-5 h-5 cursor-pointer"
        />
      </button>

      {showConfirmation && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2 className={styles.title}>Are you sure you want to archive this employee?</h2>
            <p className={styles.employeeName}>{employeeName}</p>
            <div className={styles.buttonContainer}>
              <button
                className={`${styles.button} ${styles.cancelButton}`}
                onClick={() => setShowConfirmation(false)}
              >
                Cancel
              </button>
              <button
                className={`${styles.button} ${styles.archiveButton}`}
                onClick={handleArchive}
              >
                Archive
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ArchiveEmployee;
