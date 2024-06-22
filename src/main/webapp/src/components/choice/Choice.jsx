import React, { useState } from 'react';
import '../../CSS/ChoiceCSS.css';
import "../profile/ProfilePage.css";
import 'react-datepicker/dist/react-datepicker.css';
import Review from '../review/Review';
import { useLocation, useNavigate} from "react-router-dom";
import Carousel from './Carousel';
import axios from 'axios';
import OwnerDescription from './OwnerDescription';
import ChoiceFooter from './ChoiceFooter';
import Map from './Map';
import ChoiceData from './ChoiceData';
import {useSelector} from "react-redux";
import UserReview from "../review/UserReview";

const Choice = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const carid = searchParams.get('carid');
    const startDate = searchParams.get('startdate');
    const endDate = searchParams.get('enddate');
    const startTime = searchParams.get('starttime');
    const endTime = searchParams.get('endtime');

    const userId = useSelector((state) => state.Login.id);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const navigate = useNavigate();
    const onReserve = async () => {
        setLoading(true);
        setError(null);
        try {
            //const url = `/payment?userid=${userId}&carid=${carid}&startdate=${startDate}&enddate=${endDate}&starttime=${startTime}&endtime=${endTime}&price=${choicedata.footer.price}`;
            const url = `/payment?userid=${userId}&carid=${carid}&startdate=2024-06-25&enddate=2024-06-27&starttime=12:00&endtime=18:00&price=100000`;
            navigate(url);
        } catch (error) {
            console.error(error);
            setError('결제 실패..');
        } finally {
            setLoading(false);
        }
    }

    const [choicedata, setChoicedata] = useState({
        car: {
            content:"",
            image: {},
        },
        owner: {
            image: "",
            // userid:"",
            name: "",
            email: ""
        },
        map: {
            address: "",
            coordinates: {
                lat: 0,
                lng: 0
            }
        },
        review: {
            review_id:"",
            rating: 0,
            title: "",
            comment: "",
            id: "",
            name: ""
        },
        footer: {
            price: 0,
            startTime: startTime,
            endTime: endTime,
            startDate:startDate,
            endDate:endDate,
            loading: loading,
            error: error
        }
    });

    return (
        <div>
            <ChoiceData setChoicedata={setChoicedata} />
            <div className="description">
                <Carousel {...choicedata.car} />
            </div>
            <div className='car-description'>
                <h3 style={{ textAlign: "-webkit-left" }}>{choicedata.car.content}</h3>
            </div>
            <OwnerDescription owner={choicedata.owner} />
            <div className="border-line"></div>
            <UserReview {...choicedata.review} reviews={choicedata.review}/>
            <Map {...choicedata.map} />
            <ChoiceFooter {...choicedata.footer} onReserve={onReserve} />
        </div>
    );
};

export default Choice;
