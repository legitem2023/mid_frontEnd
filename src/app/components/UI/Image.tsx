import Image from 'next/image'
import React,{ChangeEvent, FC} from 'react'


type Props_Image = {
    name:string,
    img:string,
}

const Images:FC<Props_Image> = ({name,img}) => {
  return (
    <div>
        <Image src={img} height={100} width={100} alt='' className="w-100 h-100 object-cover custom_image_size"></Image>
    </div>
  )
}

export default Images