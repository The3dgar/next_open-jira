import React, { useState, ChangeEvent, useMemo } from 'react';
import { GetServerSideProps } from 'next';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
  capitalize,
} from '@mui/material';

import SaveOutlined from '@mui/icons-material/SaveOutlined';
import DeleteOutline from '@mui/icons-material/DeleteOutline';

import { Layout } from '@/components/layouts';
import { Entry, EntryStatus } from '@/interfaces';
import { dbEntries } from '@/api/db';
import { useEntries } from '@/context/entries';

const validStatus: EntryStatus[] = ['finished', 'in progress', 'pending'];

interface Props {
  entry: Entry;
}

export const EntryPage = ({ entry }: Props) => {
  const { updateEntry } = useEntries();
  const [inputValue, setInputValue] = useState(entry.description);
  const [status, setStatus] = useState<EntryStatus>(entry.status);
  const [touched, setTouched] = useState(false);

  const onTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const onStatusChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.value as EntryStatus);
  };

  const onClick = async () => {
    if (!inputValue.trim().length) return;
    updateEntry(
      {
        ...entry,
        status,
        description: inputValue,
      },
      true
    );
  };

  const isInvalid = useMemo(
    () => !inputValue.length && touched,
    [inputValue, touched]
  );

  return (
    <Layout title={inputValue.substring(0, 10) + '...'}>
      <Grid container justifyContent={'center'} sx={{ marginTop: 2 }}>
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader
              title='Entrada:'
              subheader={`Creada hace ${entry.createdAt} minutos`}
            />

            <CardContent>
              <TextField
                sx={{ marginTop: 2, marginBottom: 1 }}
                fullWidth
                placeholder='Nueva entrada'
                autoFocus
                multiline
                label='Nueva entrada'
                value={inputValue}
                onChange={onTextChange}
                helperText={isInvalid && 'Ingrese un valor'}
                onBlur={() => setTouched(true)}
                error={isInvalid}
              />

              <FormControl>
                <FormLabel>Estado:</FormLabel>
                <RadioGroup row value={status} onChange={onStatusChange}>
                  {validStatus.map((s) => (
                    <FormControlLabel
                      label={capitalize(s)}
                      key={s}
                      value={s}
                      control={<Radio />}
                    />
                  ))}
                </RadioGroup>
              </FormControl>

              <CardActions>
                <Button
                  startIcon={<SaveOutlined />}
                  variant='contained'
                  onClick={onClick}
                  disabled={inputValue.length < 5}
                  fullWidth>
                  Guardar
                </Button>
              </CardActions>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <IconButton
        sx={{
          position: 'fixed',
          bottom: 30,
          right: 30,
          backgroundColor: 'error.dark',
        }}>
        <DeleteOutline />
      </IconButton>
    </Layout>
  );
};

export default EntryPage;

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.params as { id: string };

  const entry = await dbEntries.getEntryById(id);

  if (!entry) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      entry,
    },
  };
};
