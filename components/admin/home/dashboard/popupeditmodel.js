import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { DateRangePicker } from "@nextui-org/react";


export default function popupeditmodel({ data, action,onUpdateSuccess }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [name, setName] = useState(data.name)
    const [email, setemail] = useState(data.email)
    const [nic, setnic] = useState(data.nic)
    const [contact, setcontact] = useState(data.contact)
    const [checking_date, setchecking_date] = useState(data.checking_date)
    const [checkout_date, setcheckout_date] = useState(data.checkout_date)
    // const [stayDuration, setstayDuration] = useState([data.checking_date,data.checkout_date]);
    const [adult, setadult] = useState(data.adult)
    const [children, setachildren] = useState(data.child)
    const [roomType, setroomType] = useState(data.room_type)
    const [id, setid] = useState(data.id)

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');


    const handleRoomTypeChange = (event) => {
        const { value } = event.target;
        setroomType({ ...roomType, room: value });
    };

    // console.log("data is : ", data);
    // console.log("data id is : ", data.id);



    // function parseDateRange(startDateString, endDateString) {
    //     const parseDate = (dateString) => {
    //         const [year, month, day] = dateString.split('/');
    //         return {
    //             calendar: {
    //                 identifier: "gregory"
    //             },
    //             era: "AD",
    //             year: parseInt(year, 10),
    //             month: parseInt(month, 10),
    //             day: parseInt(day, 10)
    //         };
    //     };

    //     return {
    //         start: parseDate(startDateString),
    //         end: parseDate(endDateString)
    //     };
    // }


    const handleUpdate = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');
        const data = {
            id:id,
            name,
            email,
            nic,
            contact,
            checking_date: checking_date,
            checkout_date: checkout_date,
            adult: adult,
            child: children,
            roomType: roomType.room
        }
        console.log("data const complete..!")
        console.log("updated data is :" ,data)
        try {
            const response = await fetch(`/api/booking/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('API response error:', errorData);
                throw new Error('Error Updating booking');
            }

            const result = await response.json();
            setSuccess('Booking Update successfully!');
            setName(" ");
            setemail(" ");
            setnic(" ");
            setcontact(" ");
            // setstayDuration(" ");
            setadult(" ");
            setachildren(" ");
            setroomType(" ");
            onUpdateSuccess();
            onOpenChange(false);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };
 
    

    // console.log(data);

    return (
        <>
            <Button onPress={onOpen} className="bg-black text-white font-bold -mt-1">Update Booking</Button>
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
                            <ModalHeader className="flex flex-col gap-1">Update Booking</ModalHeader>
                            <ModalBody>
                                <form className=" space-y-4" onSubmit={handleUpdate}>
                                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                        <Input
                                            type="text"
                                            className="border-0 focus:border-0 ring-offset-0"
                                            name="name"
                                            value={name}
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
                                            value={email}
                                            onChange={(e) => setemail(e.target.value)}
                                        />
                                    </div>
                                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                        <Input
                                            type="text"
                                            className="border-0 focus:border-0"
                                            name="nic"
                                            value={nic}
                                            placeholder="Enter NIC"
                                            onChange={(e) => setnic(e.target.value)}
                                        />
                                    </div>
                                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                        <Input
                                            type="text"
                                            className="border-0 focus:border-0"
                                            name="contact"
                                            value={contact}
                                            placeholder="Enter contact number"
                                            onChange={(e) => setcontact(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        {/* <DateRangePicker
                                            label="Stay duration"
                                            className="max-w-xs"
                                            name="stayduration"
                                            value={stayDuration}
                                            onChange={(e) => setstayDuration(e)}
                                        /> */}
                                        <h3>Checking Date : {checking_date}</h3>
                                        <h3>Checkout Date : {checkout_date}</h3>
                                    </div>
                                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                        <Input
                                            type="text"
                                            className="border-0 focus:border-0"
                                            name="adult"
                                            value={adult}
                                            placeholder="Enter number of adults"
                                            onChange={(e) => setadult(e.target.value)}
                                        />
                                    </div>
                                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                        <Input
                                            type="text"
                                            className="border-0 focus:border-0"
                                            name="children"
                                            value={children}
                                            placeholder="Enter number of children"
                                            onChange={(e) => setachildren(e.target.value)}
                                        />
                                    </div>
                                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                        <Input
                                            type="text"
                                            className="border-0 focus:border-0 none"
                                            name="id"
                                            value={id}
                                            // placeholder="Enter number of children"
                                            // onChange={(e) => setachildren(e.target.value)}
                                        />
                                    </div>
                                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                        <select onChange={handleRoomTypeChange} value={roomType} className="border-0 focus:border-0 bg-white text-black">
                                            <option value="">Select Room Type</option>
                                            <option value="Single Room">Single Room</option>
                                            <option value="Double Room">Double Room</option>
                                            <option value="Triple Room">Triple Room</option>
                                        </select>
                                    </div>
                                    
                                    <Button type="submit" className="mt-4" disabled={loading} >
                                        {loading ? 'Updating...' : 'Update'}
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