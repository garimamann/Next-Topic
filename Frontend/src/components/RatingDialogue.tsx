import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import { FormControlLabel, Radio, RadioGroup } from '@material-ui/core';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">Rate the course</DialogTitle>
        <DialogContent>
            
          
        </DialogContent>
        <DialogActions>
        <RadioGroup role="group" >
                  <FormControlLabel
                    value={1}                    
                    control={<Radio />}
                    label="1"
                  />
                  <FormControlLabel
                    value={2}                    
                    control={<Radio />}
                    label="2"
                  />
                  <FormControlLabel
                    value={3}                    
                    control={<Radio />}
                    label="3"
                  />
                  <FormControlLabel
                    value={4}                    
                    control={<Radio />}
                    label="4"
                  />
                  <FormControlLabel
                    value={5}                    
                    control={<Radio />}
                    label="5"
                  />
                </RadioGroup>
         
        </DialogActions>
      </Dialog>
    </div>
  );
}
