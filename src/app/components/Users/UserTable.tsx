import React, { FC, useState } from 'react';
import Link from 'next/link';
import Images from '../UI/Image';
import { Icon } from '@iconify/react/dist/iconify.js';
import UserUploadImage from './UserUploadImage';

type User = {
  id: number;
  Image: string | null;
  name: string;
  email: string;
};

type Props_userTable = {
  filteredUsers: User[];
  handlerDelete: (id: number) => void;
  onUserAdded:()=>void;
};

const UserTable: FC<Props_userTable> = ({ filteredUsers, handlerDelete,onUserAdded }) => {

    const [useID,setID] = useState(0);
    const [useScale,setScale] = useState(0);
    const PickUser = (param:number) =>{
        setScale(1);
        setID(param);
    }

    const data =(user:any) =>{
        return encodeURIComponent(JSON.stringify({id:user.id, name: user.name, email: user.email }));
    } 

  return (
    <div className='col-span-2 w-full box-border p-2'>
        <UserUploadImage id={useID} scale={useScale} onUserAdded={onUserAdded} />
    {filteredUsers.length === 0 ? (
      <p>No users found</p>
    ) : (
        <div>
            
            <div className="flex hover border-b border-blue-100 w-[100%]">
                <div className='flex-1 bg-blue-300 p-2 flex items-center justify-left'>Image</div>
                <div className='flex-1 bg-blue-300 p-2 flex items-center justify-center'>Name</div>
                <div className='flex-1 bg-blue-300 p-2 flex items-center justify-center'>Email</div>
                <div className='flex-1 bg-blue-300 p-2 flex items-center justify-center'>Action</div>
            </div>
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            className="flex hover border-b border-blue-100 w-[100%]"
          >
            <div className="flex-1 align-center justify-center">
              <Images
                img={
                  !user.Image || user.Image === ''
                    ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png'
                    : process.env.NEXT_PUBLIC_IMAGE + user.Image
                }
                name={user.name}
              />
            </div>
            <div className="flex-1 flex items-center justify-center">
              {user.name}
            </div>
            <div className="flex-1 flex items-center justify-left overflow-hidden text-ellipsis whitespace-nowrap">
              {user.email}
            </div>
            <div className="flex-1 grid grid-cols-2 items-center justify-center">
                <div className='flex items-center justify-center'>
                <Link href={`/${user.id}?data=${data(user)}`}>
                    <Icon icon="tabler:edit" style={{ color: '#1b470a',cursor: 'pointer',fontSize:"25px" }} />
                </Link>
                </div>
                <div className='flex items-center justify-center'>
                    <Icon
                    icon="material-symbols:delete"
                    onClick={() => handlerDelete(user.id)}
                    style={{ color: 'red', cursor: 'pointer',fontSize:"25px" }}/>
                </div>
                <div className='flex items-center justify-center'>
                    <Icon
                    icon="ic:baseline-upload"
                    onClick={() => PickUser(user.id)}
                    style={{ color: '#707070', cursor: 'pointer',fontSize:"25px" }}/>
                </div>
                <div className='flex items-center justify-center'>
                <Link href={`/ChangePassword/${user.id}`}>
                    <Icon icon="material-symbols:password"  
                          style={{ color: '#000000', cursor: 'pointer',fontSize:"25px" }}/>
                </Link>
                </div>

            </div>            
          </div>
        ))}
      </div>
    )}
  </div>
    
  );
};

export default UserTable;
