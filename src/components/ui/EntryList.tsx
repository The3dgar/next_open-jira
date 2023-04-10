import { useContext, useMemo, DragEvent } from 'react';
import { Paper, List } from '@mui/material';
import UIstyles from './UI.module.scss';
import { EntryCard } from './EntryCard';
import { EntryStatus } from '@/interfaces';
import { EntriesContext } from '@/context/entries';
import { UIContext } from '@/context/ui';

import styles from './EntryList.module.scss';

interface Props {
  status: EntryStatus;
}

export const EntryList = ({ status }: Props) => {
  const { entries, updateEntry } = useContext(EntriesContext);
  const { isDragging, endDragging } = useContext(UIContext);

  const entriesByStatus = useMemo(
    () => entries.filter((e) => e.status === status),
    [entries, status]
  );

  const allowDrop = (event: DragEvent<HTMLElement>) => {
    event.preventDefault();
  };

  const onDropEntry = (event: DragEvent<HTMLDivElement>) => {
    const id = event.dataTransfer.getData('text');
    const entry = entries.find((e) => e._id === id);
    if (!entry) return;
    entry.status = status;
    updateEntry(entry);
    endDragging();
  };

  return (
    <div
      className={isDragging ? styles.dragging : ''}
      onDrop={onDropEntry}
      onDragOver={allowDrop}>
      <Paper
        className={UIstyles.container}
        sx={{
          height: 'calc(100vh - 180px)',
          overflowY: 'auto',
          backgroundColor: 'transparent',
          padding: '1px 3px',
        }}>
        {/* cambiara dependiendo si estoy haciendo drap */}
        <List sx={{ opacity: isDragging ? 0.2 : 1, transition: 'all 0.3s' }}>
          {entriesByStatus.map((e) => (
            <EntryCard key={e._id} entry={e} />
          ))}
        </List>
      </Paper>
    </div>
  );
};
