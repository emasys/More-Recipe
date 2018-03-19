import { toast } from 'react-toastify';
import { css } from 'glamor';

let toastId = null;
export const notify = () => {
  toastId = toast('Uploading...', { autoClose: false });
  return toastId;
};
// toast message
export const update = () =>
  toast.update(toastId, {
    render: 'Upload complete!',
    type: toast.TYPE.SUCCESS,
    autoClose: 3000,
    className: css({
      transform: 'rotateY(360deg)',
      transition: 'transform 0.6s'
    })
  });

export const failedUpdate = () =>
  toast.update(toastId, {
    render: 'error, try again',
    type: toast.TYPE.ERROR,
    autoClose: 3000,
    className: css({
      transform: 'rotateY(360deg)',
      transition: 'transform 0.6s'
    })
  });

export const sessionExpired = () => {
  if (!toast.isActive(toastId)) {
    toastId = toast.error('Sorry, session expired', { autoClose: 3000 });
  }
};
