import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { DateRangePicker } from "@nextui-org/react";
import { MdLibraryAdd } from "react-icons/md";


export default function popupmodel({ action, onUpdateSuccess }) {
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


    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');
        const data = {
            name,
            email,
            nic,
            contact,
            checking_date: formatDate(stayDuration.start).toString(),
            checkout_date: formatDate(stayDuration.end).toString(),
            adult: adult,
            child: children,
            roomType: roomType.room
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
            <Button onPress={onOpen} className="bg-black text-white font-bold px-3 py-2 -mt-2">New Booking</Button>
            <Modal
                backdrop="opaque"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                radius="lg"
                size="3xl"
                placement="top"
                classNames={{
                    body: "py-4",
                    backdrop: "bg-[#fafafc]/50 backdrop-opacity-40",
                    base: "border-[#fafafc] bg-[#f0af3e] dark:bg-[#FFFFFF] text-[#19172c]",
                    header: "border-b-[1px] border-[#000]",
                    footer: "border-t-[1px] border-[#000]",
                    closeButton: "hover:bg-white/5 active:bg-white/10",
                }}
                style={{ display: action ? 'flex' : 'none' }}
            >
                <ModalContent>
                    {(onClose) => (
                        <>

                            <div className=" flex flex-row gap-1 pl-8">
                                <div className="text-3xl my-auto">
                                    <MdLibraryAdd />
                                </div>
                                <ModalHeader className="flex flex-col gap-1 px-4 text-black">Add New Booking
                                </ModalHeader>

                            </div>

                            <ModalBody className="text-white">
                                <form onSubmit={handleSubmit} className="text-white p-6 pb-0 ">
                                    <div className=" grid grid-cols-2 gap-4">
                                        <div className="flex w-full flex-wrap laptop:flex-nowrap gap-4">
                                            <Input
                                                type="text"
                                                className="border-0 focus:border-0 mb-3 laptop:mb-0 w-full bg-white text-black rounded-xl gap-"
                                                name="name"
                                                placeholder="Enter name"
                                                onChange={(e) => setName(e.target.value)}
                                            />
                                        </div>

                                        <div className="flex w-full flex-wrap laptop:flex-nowrap gap-4">
                                            <Input
                                                type="email"
                                                className="border-0 focus:border-0 mb-3 laptop:mb-0 w-full bg-white text-black rounded-xl gap-4"
                                                name="email"
                                                placeholder="Enter email"
                                                onChange={(e) => setemail(e.target.value)}
                                            />
                                        </div>
                                        <div className="flex w-full flex-wrap laptop:flex-nowrap gap-4">
                                            <Input
                                                type="text"
                                                className="border-0 focus:border-0 mb-4 laptop:mb-0 w-full bg-white text-black rounded-xl"
                                                name="nic"
                                                placeholder="Enter NIC"
                                                onChange={(e) => setnic(e.target.value)}
                                            />

                                        </div>
                                        <div className="flex w-full flex-wrap laptop:flex-nowrap gap-4">
                                            <Input
                                                type="text"
                                                className="border-0 focus:border-0 mb-4 laptop:mb-0 w-full bg-white text-black rounded-xl"
                                                name="contact"
                                                placeholder="Enter contact number"
                                                onChange={(e) => setcontact(e.target.value)}
                                            />
                                        </div>
                                        <div className="flex w-full flex-wrap laptop:flex-nowrap gap-4">
                                            <Input
                                                type="text"
                                                className="border-0 focus:border-0 mb-4 laptop:mb-0 w-full bg-white text-black rounded-xl"
                                                name="adult"
                                                placeholder="Enter number of adults"
                                                onChange={(e) => setadult(e.target.value)}
                                            />
                                        </div>
                                        <div className="flex w-full flex-wrap laptop:flex-nowrap gap-4">
                                            <Input
                                                type="text"
                                                className="border-0 focus:border-0 mb-4 laptop:mb-0 w-full bg-white text-black rounded-xl"
                                                name="children"
                                                placeholder="Enter number of children"
                                                onChange={(e) => setachildren(e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <DateRangePicker
                                                label="Set Stay duration"
                                                className="max-w-full mb-4 laptop:mb-0 w-full"
                                                name="stayduration"
                                                onChange={(e) => setstayDuration(e)}
                                            />
                                        </div>
                                        <div className="flex w-full flex-wrap laptop:flex-nowrap gap-4">
                                            <select
                                                onChange={handleRoomTypeChange}
                                                className="border-0 focus:border-0 w-full bg-white text-black mb-4 laptop:mb-0 rounded-xl px-4 py-2"
                                            >
                                                <option value="">Select Room Type</option>
                                                <option value="Single Room AC">Single Room AC</option>
                                                <option value="Single Room Non AC">Single Room Non AC</option>
                                                <option value="Double Room AC">Double Room AC</option>
                                                <option value="Double Room Non AC">Double Room Non AC</option>
                                                <option value="Triple Room AC">Triple Room AC</option>
                                                <option value="Triple Room Non AC">Triple Room Non AC</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="flex flex-row w-full justify-end gap-4 mt-10">
                                        <Button type="submit" className=" btn-primary bg-white text-black " disabled={loading}>
                                            {loading ? 'Submitting...' : 'Submit'}
                                        </Button>
                                        <Button className="btn-primary bg-white text-black " onPress={onClose}>
                                            Close
                                        </Button>

                                    </div>
                                </form>
                                {error && <p style={{ color: 'red' }}>{error}</p>}
                                {success && <p style={{ color: 'green' }}>{success}</p>}
                            </ModalBody>
                            <ModalFooter>
                                {/* <Button color="foreground" variant="light" onPress={onClose}>
                                    Close
                                </Button> */}

                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}