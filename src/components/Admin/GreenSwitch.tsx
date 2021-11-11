import * as React from 'react';
import { alpha, styled } from '@mui/material/styles';
import { green, red } from '@mui/material/colors';
import Switch from '@mui/material/Switch';

export const GreenSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: green[600],
    '&:hover': {
      backgroundColor: alpha(green[600], theme.palette.action.hoverOpacity),
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: green[500],
  },
}));