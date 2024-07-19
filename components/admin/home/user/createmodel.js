import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { DateRangePicker } from "@nextui-org/react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import Select from 'react-select';

export default function popupmodel({ action, pagefresh }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [name, setName] = useState(' ')
    const [email, setemail] = useState(' ')
    const [nic, setnic] = useState(' ')
    const [contact, setcontact] = useState(' ')
    const [isadmin, setisadmin] = useState(' ')
    const [username, setusername] = useState(' ')
    const [password, setpassword] = useState(' ')
    const [showPassword, setShowPassword] = useState(false)


    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(' ');
    const [success, setSuccess] = useState(' ');


    // const handleUserTypeChange = (event) => {
    //     const { value } = event.target;
    //     setisadmin(value);
    // };
    const userTypeOptions = [
        { value: 'user', label: 'User' },
        { value: 'admin', label: 'Admin' }
    ];

    const handleUserTypeChange = (selectedOption) => {
        setisadmin(selectedOption ? selectedOption.value : '');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');
        const passwords = password.toString();
        const data = {
            name,
            email,
            nic,
            contact,
            isadmin,
            username,
            password: passwords
        }
        console.log("data is : ", data)
        try {
            const response = await fetch('/api/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('API response error:', errorData);
                throw new Error('Error creating user');
            }

            const result = await response.json();
            setSuccess('user created successfully!');
            setName(" ");
            setemail(" ");
            setnic(" ");
            setcontact(" ");
            setisadmin(" ");
            pagefresh();
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };


    return (
        <>
            <Button onPress={onOpen} className="bg-black text-white font-bold -mt-1">Add New User</Button>
            <Modal
                backdrop="opaque"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                radius="lg"
                size="3xl"
                placement="top"
                classNames={{
                    body: "py-6",
                    backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
                    base: "border-[#292f46] bg-[#f0af3e] dark:bg-[#19172c] text-[#a8b0d3]",
                    header: "border-b-[1px] border-[#292f46]",
                    footer: "border-t-[1px] border-[#292f46]",
                    closeButton: "hover:bg-white/5 active:bg-white/10",
                }}
                style={{ display: action ? 'flex' : 'none' }}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-black">Add New User</ModalHeader>
                            <ModalBody>
                                <form onSubmit={handleSubmit} className=" space-y-4">
                                    <div className=" grid grid-cols-2 gap-4">

                                        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                            <Input
                                                type="text"
                                                className="border-0 focus:border-0 ring-offset-0"
                                                name="name"
                                                placeholder="Enter name"
                                                required
                                                onChange={(e) => setName(e.target.value)}
                                            />
                                        </div>
                                        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                            <Input
                                                type="email"
                                                className="border-0 focus:border-0"
                                                name="email"
                                                required
                                                placeholder="Enter email"
                                                onChange={(e) => setemail(e.target.value)}
                                            />
                                        </div>
                                        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                            <Input
                                                type="text"
                                                className="border-0 focus:border-0"
                                                name="nic"
                                                required
                                                placeholder="Enter NIC"
                                                onChange={(e) => setnic(e.target.value)}
                                            />
                                        </div>
                                        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                            <Input
                                                type="text"
                                                className="border-0 focus:border-0"
                                                name="contact"
                                                required
                                                placeholder="Enter contact number"
                                                onChange={(e) => setcontact(e.target.value)}
                                            />
                                        </div>
                                        <div className="flex flex-row w-full flex-wrap md:flex-nowrap gap-4">
                                            <label className=" text-black">Username</label>
                                            <Input
                                                type="text"
                                                className="border-0 focus:border-0"
                                                name="username"
                                                required
                                                // value={name}
                                                placeholder="username "
                                                onChange={(e) => setusername(e.target.value)}
                                            />
                                        </div>
                                        <div className="flex flex-row w-full flex-wrap md:flex-nowrap gap-4">
                                            <label className=" text-black">Password</label>
                                            <div className=" w-full flex flex-row gap-4">

                                                <Input
                                                    type={showPassword ? "text" : "password"}
                                                    className="border-0 focus:border-0 w-[95%]"
                                                    name="password"
                                                    required
                                                    id="password"
                                                    placeholder=" "
                                                    onChange={(e) => setpassword(e.target.value)}
                                                />

                                                <button
                                                    type="button"
                                                    aria-label={
                                                        showPassword ? "Password Visible" : "Password Invisible."
                                                    }
                                                    className="text-black w-[2%]"
                                                    onClick={() => {
                                                        setShowPassword((prev) => !prev);
                                                    }}
                                                >
                                                    {showPassword ? (
                                                        <FaEye />
                                                    ) : (
                                                        <FaEyeSlash />
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                            <Select
                                                options={userTypeOptions}
                                                onChange={handleUserTypeChange}
                                                placeholder="Select User Type"
                                                styles={{
                                                    control: (provided) => ({
                                                        ...provided,
                                                        border: '0',
                                                        boxShadow: 'none',
                                                        backgroundColor: 'white',
                                                        color: 'black',
                                                        width: '100%',
                                                        borderRadius: '0.375rem',
                                                        padding: '0.5rem',
                                                    }),
                                                    option: (provided, state) => ({
                                                        ...provided,
                                                        // backgroundColor: state.isSelected ? '#e2e2e2' : 'white',
                                                        // color: state.isSelected ? 'black' : 'black',
                                                        backgroundColor: state.isSelected ? 'green' : 'white',
                                                        color: state.isSelected ? 'white' : 'black',
                                                        padding: '0.5rem',
                                                    }),
                                                    singleValue: (provided) => ({
                                                        ...provided,
                                                        color: 'black',
                                                    }),
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className=" flex flex-row w-full justify-end gap-4 mt-10">
                                        <Button type="submit" className="mt-4" disabled={loading}>
                                            {loading ? 'Submitting...' : 'Submit'}
                                        </Button>
                                        <Button className="mt-[15px] btn-primary bg-white text-black " onPress={onClose}>
                                            Close
                                        </Button>

                                    </div>
                                </form>
                                {error && <p style={{ color: 'red' }}>{error}</p>}
                                {success && <p style={{ color: 'green' }}>{success}</p>}
                            </ModalBody>
                            <ModalFooter>

                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}