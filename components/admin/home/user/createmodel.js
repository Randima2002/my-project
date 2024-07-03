import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { DateRangePicker } from "@nextui-org/react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

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


    const handleUserTypeChange = (event) => {
        const { value } = event.target;
        setisadmin(value);
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
            password:passwords
        }
        console.log("data is : ",data)
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
                    base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
                    header: "border-b-[1px] border-[#292f46]",
                    footer: "border-t-[1px] border-[#292f46]",
                    closeButton: "hover:bg-white/5 active:bg-white/10",
                }}
                style={{ display: action ? 'flex' : 'none' }}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Add New User</ModalHeader>
                            <ModalBody>
                                <form onSubmit={handleSubmit} className=" space-y-4">
                                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                        <Input
                                            type="text"
                                            className="border-0 focus:border-0 ring-offset-0"
                                            name="name"
                                            placeholder="Enter name"
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>
                                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                        <Input
                                            type="email"
                                            className="border-0 focus:border-0"
                                            name="email"
                                            placeholder="Enter email"
                                            onChange={(e) => setemail(e.target.value)}
                                        />
                                    </div>
                                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                        <Input
                                            type="text"
                                            className="border-0 focus:border-0"
                                            name="nic"
                                            placeholder="Enter NIC"
                                            onChange={(e) => setnic(e.target.value)}
                                        />
                                    </div>
                                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                        <Input
                                            type="text"
                                            className="border-0 focus:border-0"
                                            name="contact"
                                            placeholder="Enter contact number"
                                            onChange={(e) => setcontact(e.target.value)}
                                        />
                                    </div>
                                    <div className="flex flex-row w-full flex-wrap md:flex-nowrap gap-4">
                                        <label>Username</label>
                                        <Input
                                            type="text"
                                            className="border-0 focus:border-0"
                                            name="username"
                                            // value={name}
                                            placeholder="username "
                                            onChange={(e) => setusername(e.target.value)}
                                        />
                                    </div>
                                    <div className="flex flex-row w-full flex-wrap md:flex-nowrap gap-4">
                                        <label>Password</label>
                                        <div className=" w-full flex flex-row gap-4">

                                        <Input
                                            type={showPassword ? "text" : "password"}
                                            className="border-0 focus:border-0 w-[95%]"
                                            name="password"
                                            id="password"
                                            placeholder=" "
                                            onChange={(e) => setpassword(e.target.value)}
                                        />
                                    
                                        <button
                                            type="button"
                                            aria-label={
                                                showPassword ? "Password Visible" : "Password Invisible."
                                            }
                                            className="text-white w-[2%]"
                                            onClick={() => {
                                                setShowPassword((prev) => !prev);
                                            }}
                                            >
                                            {showPassword ? (
                                               <FaEye/>
                                            ) : (
                                                <FaEyeSlash />
                                            )}
                                        </button>
                                        </div>
                                    </div>
                                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                        <select onChange={handleUserTypeChange} className="border-0 focus:border-0 bg-white text-black">
                                            <option value="user">Select User Type</option>
                                            <option value="user">User</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                    </div>
                                    <Button type="submit" className="mt-4" disabled={loading}>
                                        {loading ? 'Submitting...' : 'Submit'}
                                    </Button>
                                </form>
                                {error && <p style={{ color: 'red' }}>{error}</p>}
                                {success && <p style={{ color: 'green' }}>{success}</p>}
                            </ModalBody>
                            <ModalFooter>
                                <Button color="foreground" variant="light" onPress={onClose}>
                                    Close
                                </Button>

                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}