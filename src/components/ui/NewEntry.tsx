import { useState, ChangeEvent, useContext } from 'react';
import { Button, Box, TextField } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { EntriesContext } from '@/context/entries';
import { UIContext } from '@/context/ui';

export const NewEntry = () => {
  const [inputValue, setInputValue] = useState('');
  const [isTouched, setIsTouched] = useState(false);

  const { addEntry } = useContext(EntriesContext);
  const { setAddingEntry, isAddingEntry } = useContext(UIContext);

  const onCancel = () => setAddingEntry(false);
  const onNewEntry = () => {
    console.log("first")
    setAddingEntry(true);
  }

  const onTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const onSave = () => {
    if (inputValue.length === 0) return;
    addEntry(inputValue);
    setInputValue('');
    setAddingEntry(false);
    setIsTouched(false);
  };

  return (
    <Box sx={{ marginBottom: 2, paddingX: 2 }}>
      {isAddingEntry ? (
        <>
          <TextField
            fullWidth
            sx={{ marginTop: 2, marginBottom: 1 }}
            placeholder='Nueva entrada'
            autoFocus
            multiline
            label='Nueva entrada'
            helperText={
              inputValue.length <= 0 && isTouched && 'Ingrese un valor'
            }
            error={inputValue.length <= 0 && isTouched}
            value={inputValue}
            onChange={onTextChange}
            onBlur={() => setIsTouched(true)}
          />
          <Box display={'flex'} justifyContent={'space-between'}>
            <Button variant='text' onClick={onCancel}>
              Cancelar
            </Button>
            <Button
              variant='outlined'
              color='secondary'
              endIcon={<SaveIcon />}
              onClick={onSave}>
              Guardar
            </Button>
          </Box>
        </>
      ) : (
        <Button
          startIcon={<AddCircleOutlineIcon />}
          fullWidth
          onClick={onNewEntry}
          variant='outlined'>
          Agregar Tarea
        </Button>
      )}
    </Box>
  );
};
