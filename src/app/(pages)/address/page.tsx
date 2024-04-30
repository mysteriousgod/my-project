"use client"
import React, { useState, useEffect, ChangeEvent, FormEvent, Fragment } from 'react';
import { useRouter } from 'next/navigation'

import { Button } from '../../_components/button';
import { Input } from '../../_components/Input';
import { useAuth } from '../../../app/_providers/Auth';

import classes from './index.module.scss';
interface Address {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
}

const AddressForm: React.FC = () => {
    const [address, setAddress] = useState<Address>({
        street: '',
        city: '',
        state: '',
        postalCode: '',
        country: ''
    });
    const router = useRouter()
    const { user, setUser } = useAuth();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const Modal = ({ isOpen, onClose, children }) => {
        if (!isOpen) return null;

        return (
            <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', zIndex: 1000 }}>
                <div>{children}</div>
                <button onClick={onClose}>Close</button>
            </div>
        );
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setAddress(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        if (user) {
            const url = `http://localhost:3000/api/users/${user.id}?depth=0&fallback-locale=null`;

            const response = await fetch(url, {
                credentials: 'include',
                method: 'PATCH',
                body: JSON.stringify({ address: address }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setIsSubmitting(false);
            if (response.ok) {
                const json = await response.json();
                setUser(prev => ({ ...prev, address: json.doc }));
                setSuccess('Address updated successfully!');
                setError('');
                setAddress({
                    street: json.doc.street,
                    city: json.doc.city,
                    state: json.doc.state,
                    postalCode: json.doc.postalCode,
                    country: json.doc.country
                });
                router.push('./account')
            } else {
                const errorResponse = await response.json();
                setError(errorResponse.message || 'Failed to update address.');
                setSuccess('');
            }
        }
    };
    const closeModal = () => {
        setShowModal(false);
        setSuccess('');
    };

    const inpuStyle ={
        fontSize: '16px',      
        padding: '10px',
        width: '90%', 
    }
    const containerStyle = {
        display: 'flex',       // Use flexbox for centering
        flexDirection: 'column', // Stack children vertically
        alignItems: 'left',  // Center children horizontally
        width: '100%',         // Set the container width to 100% of its parent
        marginLeft: '20px',    // Automatically determine the left margin
        marginRight: 'auto', 
      };
    return (
        <>
            {user && (
                <Fragment>
                    {/* <h2>Your Current Address</h2>
                    <p>Street: {user.address.street}</p>
                    <p>City: {user.address.city}</p>
                    <p>State: {user.address.state}</p>
                    <p>Postal Code: {user.address.postalCode}</p>
                    <p>Country: {user.address.country}</p> */}
                    <form onSubmit={handleSubmit}>
                    <div style={containerStyle}>

                    <p >Street: </p>

                        <input
                        required
                            name="street"
                            style={inpuStyle}
                            value={address.street}
                            onChange={handleChange}
                            placeholder="Street"
                        />
                    <p >City:</p>
                        <input
                            name="city"
                            style={inpuStyle}
                            value={address.city}
                            onChange={handleChange}
                            placeholder="City"
                        />
                         <p>State:</p>

                        <input
                            name="state"
                            style={inpuStyle}
                            value={address.state}
                            onChange={handleChange}
                            placeholder="State"
                        />
                        <p >Postal Code:</p>

                        <input
                            name="postalCode"
                            style={inpuStyle}
                            value={address.postalCode}
                            onChange={handleChange}
                            placeholder="Postal Code"
                        />
                        <p >Country:</p>
                        <input
                            name="country"
                            style={inpuStyle}
                            value={address.country}
                            onChange={handleChange}
                            placeholder="Country"
                        />
                        <p></p>
                        <Button 
                        type="submit"
                        label='Update Address'
                        appearance="secondary"
                        className={classes.submit}
                        disabled={isSubmitting}
                        />
                        </div>
                    </form>
                    {error && <div style={{ color: 'red' }}>{error}</div>}
                    {success && <div style={{ color: 'green' }}>{success}</div>}
                    <Modal isOpen={showModal} onClose={closeModal}>
                        <p>{success}</p>
                    </Modal>
                </Fragment>
            )}
        </>
    );
}

export default AddressForm;