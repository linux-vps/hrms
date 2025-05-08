import React from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Button } from '@/components/reactdash-ui';

export default function SweetAlert(props) {
  const handleButton = () => {
    const MySwal = withReactContent(Swal);
    const Content = props.data;

    MySwal.fire({
      didOpen: () => {
        // alert content
        return MySwal.fire(Content)
      },
    })
  };
  return (
    <>
      <Button onClick={handleButton} variant={props.btn_variant} >{props.title}</Button>
    </>
  );
}

