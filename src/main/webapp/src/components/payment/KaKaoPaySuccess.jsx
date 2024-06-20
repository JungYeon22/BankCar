import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './css/payment.module.css';

const KaKaoPaySuccess = () => {
    const location=useLocation();
    const params=new URLSearchParams(location.search);
    const [pg_token,setPg_token]=useState('');
    const [payDetail,setPayDetail]=useState({});


    useEffect(()=>{
        setPg_token(params.get('pg_token'));
        
    },[params])

    
    useEffect(()=>{
        
        if(pg_token){
            // alert(pg_token);
        axios.get("https://dongwoossltest.shop/api/payment/success",{
            params:{
                pgToken:pg_token
            }
        }).then(res=>
            {
                setPayDetail(res.data);
                console.log(res.data);
            }
        ).catch(err=>console.log(err))
    }
    },[pg_token])


    return (
        <div className="App">
      <div className="confirmation-container">
        <div className="icon">
          <img src={`${process.env.PUBLIC_URL}/image/paySuccess.png`} alt="Success Icon" />
        </div>
        <h1>결제가 완료되었습니다!</h1>
        <p>주문이 성공적으로 완료되었습니다. .</p>
        
        <div className="order-details">
          <div className="detail-item">
            <span className="detail-title">예약 차량:</span>
            <span className="detail-content">{payDetail.item_name}</span>
          </div>
          <div className="detail-item">
            <span className="detail-title">결제 금액:</span>
            <span className="detail-content">{payDetail.total_amount}</span>
          </div>
          <div className="detail-item">
            <span className="detail-title">결제 방법:</span>
            <span className="detail-content">카카오 페이</span>
          </div>
          <div className="detail-item">
            <span className="detail-title">대여 주소:</span>
            <span className="detail-content"></span>
          </div>
          <div className="detail-item">
            <span className="detail-title">대여 시작일:</span>
            <span className="detail-content"></span>
          </div>
          <div className="detail-item">
            <span className="detail-title">대여 반납일:</span>
            <span className="detail-content"></span>
          </div>
        </div>

        <button className="home-button" onClick={() => window.location.href = '/'}>
          홈
        </button>
      </div>
    </div>
    );
};

export default KaKaoPaySuccess;