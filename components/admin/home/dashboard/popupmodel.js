import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { DateRangePicker } from "@nextui-org/react";

export default function popupmodel({ action ,onUpdateSuccess}) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [name, setName] = useState(' ')
    const [email, setemail] = useState(' ')
    const [nic, setnic] = useState(' ')
    const [contact, setcontact] = useState(' ')
    const [stayDuration, setstayDuration] = useState([])
    const [adult, setadult] = useState(' ')
    const [children, setachildren] = useState(' ')
    const [roomType, setroomType] = useState(' ')

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(' ');
    const [success, setSuccess] = useState(' ');


    const handleRoomTypeChange = (event) => {
        const { value } = event.target;
        // console.log("Room type selected:", value);
        setroomType({ ...roomType, room: value });
        // setroomType(value);
    };

    // console.log(stayDuration)
    function formatDate(dateObj) {
        const year = dateObj.year;
        const month = dateObj.month.toString().padStart(2, '0');
        const day = dateObj.day.toString().padStart(2, '0');
        return `${year}/${month}/${day}`;
    }


    const handleSubmit = async(event) => {
        event.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');
        const data = {
            name,
            email,
            nic,
            contact,
            checking_date : formatDate(stayDuration.start).toString(),
            checkout_date : formatDate(stayDuration.end).toString() ,
            adult:adult,
            child :children,
            roomType : roomType.room
        }
        console.log("data const complete..!")
        try {
            const response = await fetch('/api/booking', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('API response error:', errorData);
                throw new Error('Error creating booking');
            }

            const result = await response.json();
            setSuccess('Booking created successfully!');
            setName(" ");
            setemail(" ");
            setnic(" ");
            setcontact(" ");
            setstayDuration(" ");
            setadult(" ");
            setachildren(" ");
            setroomType(" ");
            onUpdateSuccess();
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <>
            <Button onPress={onOpen} className="bg-black text-white font-bold -mt-1">Add New</Button>
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
                            <ModalHeader className="flex flex-col gap-1">Add New Booking</ModalHeader>
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
                                    <div>
                                        <DateRangePicker
                                            label="Stay duration"
                                            className="max-w-xs"
                                            name="stayduration"
                                            onChange={(e) => setstayDuration(e)}
                                        />
                                    </div>
                                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                        <Input
                                            type="text"
                                            className="border-0 focus:border-0"
                                            name="adult"
                                            placeholder="Enter number of adults"
                                            onChange={(e) => setadult(e.target.value)}
                                        />
                                    </div>
                                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                        <Input
                                            type="text"
                                            className="border-0 focus:border-0"
                                            name="children"
                                            placeholder="Enter number of children"
                                            onChange={(e) => setachildren(e.target.value)}
                                        />
                                    </div>
                                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                        <select onChange={handleRoomTypeChange} className="border-0 focus:border-0 bg-white text-black">
                                            <option value="">Select Room Type</option>
                                            <option value="Single Room">Single Room</option>
                                            <option value="Double Room">Double Room</option>
                                            <option value="Triple Room">Triple Room</option>
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