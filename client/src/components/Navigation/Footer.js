import React from 'react'
import ContactsIcon from '@mui/icons-material/Contacts';
import TimelapseIcon from '@mui/icons-material/Timelapse';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

import { useSelector } from 'react-redux';


export default function Footer() {
    const site = useSelector(state => state.site)
    return (
        <footer className='bck_b_dark'>
            <div className='container'>
                <div className='logo'>
                    ACASTLE
                </div>
                {site && site.vars ?
                    <div className='wrapper'>
                        <div className='left'>
                            <h2>Contact information</h2>
                            <div className='business_nfo'>
                                <div className='tag'>
                                    <ContactsIcon />
                                    <div className='nfo'>
                                        <div>Address</div>
                                        <div>{site.vars.address}</div>
                                    </div>
                                </div>
                                <div className='tag'>
                                    <PhoneIcon />
                                    <div className='nfo'>
                                        <div>Phone</div>
                                        <div>{site.vars.phone}</div>
                                    </div>
                                </div>
                                <div className='tag'>
                                    <TimelapseIcon />
                                    <div className='nfo'>
                                        <div>Working hours</div>
                                        <div>{site.vars.hours}</div>
                                    </div>
                                </div>
                                <div className='tag'>
                                    <EmailIcon />
                                    <div className='nfo'>
                                        <div>Email</div>
                                        <div>{site.vars.email}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='right'>
                            <h2>Be the first to know</h2>
                            <div>
                                <div>
                                    Dive into an exhilarating experience of online guitar shopping,
                                    featuring top-tier brands to personalized masterpieces, all at your fingertips.
                                    Explore an array of styles, embark on a musical journey like no other.
                                    Start your musical adventure now, stay updated with the latest guitar trends,
                                    \and be the first to enjoy exclusive deals!
                                </div>
                            </div>
                        </div>
                    </div> : null}
            </div>
        </footer>
    )
}
