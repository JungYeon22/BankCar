import React, { useRef, useState } from 'react';
import './css/Footer.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
const DriverFooter = () => {

    const navigate =useNavigate();
    const [ocrData,setOcrData]=useState(null);
    const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})

  const imgChange = (e) =>{
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("img",file);

    axios.post("https://dongwoossltest.shop/api/driver/upload",formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then(res=>{
        setOcrData(res.data);
        navigate("/car/driverCheck",{state:res.data})

      }).catch(err=>{
        // alert("운전면허증 등록 실패. 종류 또는 유형이 올바르지 않습니다.");
        Toast.fire({
          icon: 'error',
          title: '운전면허증 등록 실패. 종류 또는 유형이 올바르지 않습니다.'
      })
        navigate("/profile")
      })


  }
    return (
        <div className="Footer">
        <input type="file" accept="image/*" capture="camera" ref={fileInputRef} onChange={imgChange} hidden />
        <button className="capture-button"   onClick={handleButtonClick} >운전면허증 촬영하기</button>
      </div>
    );
};

export default DriverFooter;