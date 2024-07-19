import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { DateRangePicker } from "@nextui-org/react";
import Select from "react-select";

export default function popupeditmodel({ data, action, onUpdateSuccess }) {
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


    const roomTypeOptions = [
        { value: 'Single Room AC', label: 'Single Room AC' },
        { value: 'Single Room Non AC', label: 'Single Room Non AC' },
        { value: 'Double Room AC', label: 'Double Room AC' },
        { value: 'Double Room Non AC', label: 'Double Room Non AC' },
        { value: 'Triple Room AC', label: 'Triple Room AC' },
        { value: 'Triple Room Non AC', label: 'Triple Room Non AC' },
    ];

    const handleRoomTypeChange = (selectedOption) => {
        setroomType(selectedOption ? selectedOption.value : '');
    };

    const handleUpdate = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');
        const data = {
            id: id,
            name,
            email,
            nic,
            contact,
            checking_date: checking_date,
            checkout_date: checkout_date,
            adult: adult,
            child: children,
            roomType
        }
        console.log("data const complete..!")
        console.log("updated data is :", data)
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
            onOpenChange(false);
            onUpdateSuccess();
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
                            <ModalHeader className="flex flex-col gap-1 text-black">Update Booking</ModalHeader>
                            <ModalBody>
                                <form className=" space-y-4" onSubmit={handleUpdate}>
                                    <div className=" grid grid-cols-2 gap-4">
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
                                            <h3 className=" text-black ml-1">Checking Date : {checking_date}</h3>
                                            <h3 className=" text-black ml-1">Checkout Date : {checkout_date}</h3>
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
                                            {/* <select onChange={handleRoomTypeChange} value={roomType} className="border-0 focus:border-0 bg-white text-black">
                                                <option value="">Select Room Type</option>
                                                <option value="Single Room">Single Room</option>
                                                <option value="Double Room">Double Room</option>
                                                <option value="Triple Room">Triple Room</option>
                                            </select> */}
                                             <Select
                                                options={roomTypeOptions}
                                                value={roomTypeOptions.find(option => option.value === roomType)}
                                                onChange={handleRoomTypeChange}
                                                placeholder="Select Room Type"
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
                                        <Button type="submit" className="mt-4 btn-primary bg-white text-black " disabled={loading} >
                                            {loading ? 'Updating...' : 'Update'}
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