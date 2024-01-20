import { Audio } from 'react-loader-spinner';
import { Backdrop } from 'components/Backdrop/Backdrop.styled';

export const Loader = () => {
  return (
    <Backdrop>
      <Audio
        height="80"
        width="80"
        radius="9"
        color="#3f51b5"
        ariaLabel="three-dots-loading"
      />
    </Backdrop>
  );
};
