import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {RxDotFilled} from 'react-icons/rx'
import { useDispatch, useSelector } from 'react-redux'
import { mailActions } from '../../store/MailSlicer'
const Inbox = () => {
    const navigate = useNavigate()
    useEffect(() => {
       getAllMails()
    }, [])
    
    const { allMails } = useSelector((state) => state.mail)
    const dispatch = useDispatch()
    const getAllMails = async () => {
         const userEmail = localStorage.getItem("userEmail") || 'jaimins365635@gmail.com';
       const res = await axios.get(
         `https://react-http-8f419-default-rtdb.firebaseio.com/inbox/${userEmail.split('@')[0]}.json`
         );
let s = []
        for (let key in res.data) {
          s.push({...res.data[key] , id : key})  
        }
        // setMails(s)
        dispatch(mailActions.setMail(s))
    };
    
    const handleRead = async (id) => {
         const userEmail =
           localStorage.getItem("userEmail") || "jaimins365635@gmail.com";
        
        const res = await axios.patch(`https://react-http-8f419-default-rtdb.firebaseio.com/inbox/${userEmail.split('@')[0]}/${id}.json`, {isReaded : true})
        console.log(res)
        getAllMails()
    }
    
    return (
      <>
        <button
          className=" btn btn-primary mt-2"
          onClick={() => navigate("/sendmail")}
        >
          COMPOESE
        </button>
        <div className="m-2 mx-5">
          {allMails?.map((e) => (
            <div
                  key={e.id}
                  style={{cursor : 'pointer'}}
              className=" rounded-3 shadow p-3 d-flex justify-content-between"
              onClick={() => {
                  handleRead(e.id);
                  navigate(`/inbox/${e.id}`)
              }}
              >
                  {
                      !e.isReaded&&<RxDotFilled className='mt-1 text-primary' style={{fontSize : '20px'}} />
                  }
              <div>
                <b className={e.isReaded?'fw-normal' : 'fw-bold'}>{e.senderMail}</b>
              </div>
              <div>
                <b  className={e.isReaded?'fw-normal m-2' : 'fw-bold m-2'}>{e.subject}</b>
                <span className=' fw-light'>{e.mail}</span>
              </div>
            </div>
          ))}
        </div>
      </>
    );
}

export default Inbox