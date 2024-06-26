import React from 'react';
import { FaCar, FaStar } from "react-icons/fa";
import { IoCalendarNumber } from "react-icons/io5";
import styles from './CSS/BookingDetails.module.css';
import UseReview from "./UseReview";

const Details = ({ detailsDTO, currentImageIndex}) => {
    // 기본값 설정
    const usagePeriod = `${detailsDTO.startDate || 'N/A'} ~ ${detailsDTO.endDate || 'N/A'}`;
    const images = Array.isArray(detailsDTO.images) ? detailsDTO.images : [];
    const carModel = detailsDTO.carModel || 'N/A';

    // averRating이 유효한 숫자인지 확인하고 변환
    let averRating = 'N/A';
    if (detailsDTO.averRating != null && !isNaN(detailsDTO.averRating)) {
        averRating = detailsDTO.averageRating;
    }

    /*변경한 부분*/
    const { setCurrentImageIndex } = UseReview({ detailsDTO });

    let image = 'https://kr.object.ncloudstorage.com/bitcamp-6th-bucket-102/cars/';

    return (
        <div className={styles.container}>
            <div className={styles.imageSlider}>
                {images.length > 0 ? (
                    <img
                        src={image+images[currentImageIndex]}
                        alt={images[currentImageIndex] || 'Image'}
                        style={{ opacity: 1, maxWidth: '500px', borderRadius: "15px" }}
                    />
                ) : (
                    <p>이미지를 불러오는 중 오류가 발생했습니다.</p>
                )}
            </div>
            <div className={styles.imageSlider}>
                {/*{images.map((item, index) => (*/}
                {/*    <img key={index} src={image+item} alt={item || 'Thumbnail'}*/}
                {/*         className={styles.thumbnail}*/}
                {/*         style={{ width: '100px', opacity: currentImageIndex === index ? 1 : 0.5 }} />*/}
                {/*))}*/}

                {/*변경된 부분 */}
                {images.map((item, index) => (
                    <img key={index} src={image+item} alt={item || 'Thumbnail'}
                         className={styles.thumbnail}
                         style={{
                             width: '80px',
                             opacity: currentImageIndex === index ? 1 : 0.5,
                             filter: currentImageIndex === index ? 'none' : 'grayscale(50%)' // 회색 처리
                         }}
                         onClick={() => setCurrentImageIndex(index)}
                    />

                ))}
            </div>
            <div className={styles.details}>
                <p><FaCar className={styles.FaCar} /> 차종: {carModel}</p>
                <p><FaStar className={styles.FaStar} /> 평점: {detailsDTO.rating}</p>
                <p><IoCalendarNumber className={styles.IoCalendarNumber} /> 이용기간: {usagePeriod}</p>
            </div>
        </div>
    );
};

export default Details;
