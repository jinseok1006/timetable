import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  Typography,
} from '@mui/material';
import { useCartDispatch, useCartState } from './LectureContext';

import { cartColors } from './util.js';

export default function LectureCart() {
  const cart = useCartState();
  const cartDispatch = useCartDispatch();

  const onDelete = (id) => {
    cartDispatch({ type: 'DELETE', id });
  };

  return (
    <List dense>
      {cart.map((lecture, id) => (
        <CartItem key={id} lecture={lecture} id={id} onDelete={onDelete} />
      ))}
    </List>
  );
}

function CartItem({ lecture, id, onDelete }) {
  return (
    <ListItem>
      <ListItemButton
        onClick={() => onDelete(id)}
        sx={{ backgroundColor: cartColors[id] }}
      >
        <ListItemText
          primary={
            <>
              <Typography component="span" variant="subtitle1">
                {lecture.title}
              </Typography>{' '}
              <Typography
                component="span"
                variant="body2"
                sx={{ color: 'gray' }}
              >
                {lecture.division}분반
              </Typography>
            </>
          }
        />
      </ListItemButton>
    </ListItem>
  );
}
