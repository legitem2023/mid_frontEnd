import { toast } from 'react-toastify';
export const Success = (message) => {
    toast.success(message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
}

export const Warning = (message) => {
    toast.warn(message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
}
export const Error = (message) => {
    toast.error(message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
}
export const createUser = async (inputValues,onUserAdded) => {
    try {
        const endpoint = process.env.NEXT_PUBLIC_SERVER_LINK;
      const response = await fetch(endpoint+ 'createUser',{
        method: 'POST', // Using POST method
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputValues), // Sending the updated user object as JSON
      });

      if (response.ok) {
        const data = await response.json();
        console.log('User Added successfully:', data);
        Success('User Added successfully');
        onUserAdded();
        // Optionally, handle the response (e.g., notify the user, update state)
      } else {
        Error(response.toString());
        console.error(response);
      }
    } catch (error) {
        Error(error.toString());
        // console.error('Error updating user:', error);
    }
  };

export const saveUser = async (inputValues) => {
    try {
      const endpoint = process.env.NEXT_PUBLIC_SERVER_LINK;
      const response = await fetch(endpoint+'userupdate', {
        method: 'POST', // Using POST method
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputValues), // Sending the updated user object as JSON
      });

      if (response.ok) {
        const data = await response.json();
        console.log('User updated successfully:', data);
        Success('User updated successfully');
        // Optionally, handle the response (e.g., notify the user, update state)
      } else {
        console.error('Failed to update user');
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  export const savePassword = async(inputValues) =>{
    try {
        const endpoint = process.env.NEXT_PUBLIC_SERVER_LINK;
        const response = await fetch(endpoint+'SavePassword', {
          method: 'POST', // Using POST method
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(inputValues), // Sending the updated user object as JSON
        });
  
        if (response.ok) {
          const data = await response.json();
          console.log('User Password successfully saved:', data);
          Success('User updated successfully');
          // Optionally, handle the response (e.g., notify the user, update state)
        } else {
          console.error('Failed to update user');
        }
      } catch (error) {
        console.error('Error Saving Password:', error);
      }
  }

  export const deleteUser = async (id,handleDataRefetch) =>{
    try {
        const data = {
            id:id
        }

        const endpoint = process.env.NEXT_PUBLIC_SERVER_LINK;
        const response = await fetch(endpoint+'deleteuser', {
          method: 'POST', // Using POST method
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data), // Sending the updated user object as JSON
        });
        if (response.ok) {
  
          console.log(response)
          const data = await response.json();
          console.log('User delete successfully:', data);
          Success('User delete successfully:');
          handleDataRefetch();
          // Optionally, handle the response (e.g., notify the user, update state)
        } else {
          console.error('Failed to delete user');
        }
      } catch (error) {
        console.error('Error updating user:', error);
      }
  }

export const handleImageUpload = async (id, file,onUserAdded) => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('id', id);
    const endpoint = process.env.NEXT_PUBLIC_SERVER_LINK;

    try {
      const response = await fetch(endpoint+'uploadImage', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        Success('Image uploaded successfully');
        onUserAdded();
        console.log('Image uploaded successfully', result);
      } else {
        console.log('Failed to upload image', result);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };
  

//******