import Swal from 'sweetalert2'


export const successAlert = (text) => {
    Swal.fire({  
        title: text,  
        //text: 'You clicked the button.',
        icon: 'success',
        width:"400px",
        confirmButtonColor: '#ec8a8a',
        confirmButtonText: '확인',
  
  
        // background: "#6d4dfb"
        // customClass: {
        //   container: '...',
        //   popup: '...',
        //   header: '...',
        //   title: '...',
        //   closeButton: '...',
        //   icon: '...',
        //   image: '...',
        //   content: '...',
        //   htmlContainer: '...',
        //   input: '...',
        //   inputLabel: '...',
        //   validationMessage: '...',
        //   actions: '...',
        //   confirmButton: 'background:"#6d4dfb"',
        //   denyButton: '...',
        //   cancelButton: '...',
        //   loader: '...',
        //   footer: '....'
        // }
      }); 
  }
  
  export const errorAlert = (text) => {
    Swal.fire({  
        title: text,  
        //text: 'Ask us on dirask',
        icon: 'error',
        width:"400px",
        confirmButtonColor: '#ec8a8a',
        confirmButtonText: '확인',
  
      }); 
  }